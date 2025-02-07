import db from "../db/db.js";


export async function getAllEmployers(type) {
    if(type === 'pending'){
        const res = await db.query(`SELECT * FROM employers WHERE status IS NULL ;`);
        return res.rows;
    }
    const res = await db.query(`SELECT * FROM employers ;`);
    return res.rows;
}

export async function getEmployer(id) {
    const res = await db.query(`SELECT * FROM employers WHERE emp_id = $1 ;`,[id]);
    return res.rows[0];
}

export async function getEmployerByEmail(email) {
    const res = await db.query(`SELECT * FROM employers WHERE LOWER(email) = $1 ;`,[email.toLowerCase()]);
    return res.rows[0];
}

export async function registerEmployer(body){
    
    
    const {name,email,password,phone} = body;
    const result = await db.query(`INSERT INTO employers (name , email , password , phone ) VALUES( $1 , $2 , $3 , $4 ) RETURNING * ;`,[name,email,password,phone])
    return result.rows;
}

export async function updateEmployerStatus(emp_id,status) {
    const result = await db.query(`UPDATE employers SET status = $1 WHERE emp_id = $2 ;`,[status,emp_id])
    return result.rows;
}


export async function updateEmployer(body,id) {
    const {name ,email,summary,company_name,phone} = body;
  
    await db.query(`UPDATE employers SET verified = 'false' WHERE emp_id = $1 AND LOWER(email) != LOWER( $2 ) ;`,[id,email])
    const res = await db.query('UPDATE employers SET name = $1 , email = $2 ,company_name = $3, phone =$4 , summary = $5 WHERE emp_id = $6 ;',[name,email,company_name,phone,summary,id]);
    await db.query('UPDATE postings SET company_name = $1  WHERE emp_id = $2 ;',[company_name,id]);
    return res.rows;
}


export async function getReportForEmployer(emp_id){
    const res = await db.query(`
        SELECT 
        (SELECT COUNT(*) FROM postings WHERE emp_id = $1) AS job_posted ,
        (SELECT COUNT(*) FROM postings WHERE emp_id = $2 AND date::date >= CURRENT_DATE ) AS job_active,
        (SELECT COUNT(*) FROM postings WHERE emp_id = $3 AND date::date < CURRENT_DATE ) AS job_expired,
        (SELECT COUNT(*) FROM applications INNER JOIN postings ON applications.post_id = postings.post_id AND postings.emp_id = $4 ) AS app_recieved ,
        (SELECT COUNT(*) FROM applications INNER JOIN postings ON applications.post_id = postings.post_id AND postings.emp_id = $5 AND applications.status = 'true' ) AS app_accepted,
        (SELECT COUNT(*) FROM applications INNER JOIN postings ON applications.post_id = postings.post_id AND postings.emp_id = $6 AND applications.status IS NULL ) AS app_pending ,
        (SELECT COUNT(*) FROM applications INNER JOIN postings ON applications.post_id = postings.post_id AND postings.emp_id = $7 AND applications.status = 'false') AS app_rejected 
        ;
        `,[emp_id,emp_id,emp_id,emp_id,emp_id,emp_id,emp_id]);
    return res.rows[0];
}

export async function setEmployerEmailStatus(email,status){
    const res = await db.query('UPDATE employers SET verified = $1 where email = $2 ;',[status,email]);
    return res.rows;
}