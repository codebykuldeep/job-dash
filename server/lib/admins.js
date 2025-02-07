import db from "../db/db.js";


export async function getAdmin(email){
    const result = await db.query('SELECT * FROM admins WHERE LOWER(email) = $1 ;',[email.toLowerCase()]);
    return result.rows[0];
}


export async function getDetailReportForAdmin(){
    const result = await db.query(`SELECT (SELECT COUNT(*) FROM users) AS users , (SELECT COUNT(*) FROM employers) AS employers,
    (SELECT COUNT(*) FROM postings) AS posts,(SELECT COUNT(*) FROM applications) AS applications , 
    (SELECT COUNT(*) FROM applications WHERE status = 'true') AS accepted ,
    (SELECT COUNT(*) FROM applications WHERE status = 'false') AS rejected
    ;`);
    
    return result.rows[0];
}