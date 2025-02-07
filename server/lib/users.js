import db from "../db/db.js";
import { getAdmin } from "./admins.js";
import { getEmployerByEmail } from "./employers.js";
 

export async function registerUser(body) {
    const {name,email,password,phone} = body;
    
    const result = await db.query(`INSERT INTO users(name,email,password,phone) VALUES( $1 , $2 , $3 ,$4 ) RETURNING * ;`,[name,email,password,phone])
    return result.rows;
}

export async function getUserById(id) {
    const res = await db.query(`SELECT * FROM users WHERE user_id = $1 ;`,[id]);
    
    return res.rows[0];
}

export async function getUserByEmail(email) {
    const res = await db.query(`SELECT * FROM users WHERE LOWER(email) = $1 ;`,[email.toLowerCase()]);
    
    return res.rows[0];
}


export async function findUser(email) {
    const admin = await getAdmin(email);
    if(admin){
        return {...admin,role:'admin'};
    }

    const employer = await getEmployerByEmail(email);
    
    if(employer){
        return {...employer,role:'employer'}
    }


    const user =await getUserByEmail(email);
    if(user){
        return {...user,role:'user'}
    }

    return undefined;

}


export async function updatePassword(role,email,password){
    
    if(role === 'admin'){
        const res = await db.query(`UPDATE admins SET password = $1  WHERE email = $2 ;`,[password,email])
        return res;
    }
    else if(role === 'employer'){
        const res = await db.query(`UPDATE employers SET password = $1  WHERE email = $2 ;`,[password,email])
        return res;
    }
    else{
        const res = await db.query(`UPDATE users SET password = $1  WHERE email = $2 ;`,[password,email])
        return res;
    }
}


export async function updateUser(body,id) {
    const {name ,email,education,summary,skill,experience} = body;

    await db.query(`UPDATE users SET status = 'false' WHERE user_id = $1 AND LOWER(email) != LOWER( $2 ) ;`,[id,email])
    const res = await db.query('UPDATE users SET name = $1 ,email = $2 ,education = $3, summary =$4 , skill = $5 ,experience = $6  WHERE user_id = $7 ;',[name,email,education,summary,skill,experience,id])
    
    return res.rows;
}

export async function updateResume(link , user_id){
    const res = await db.query('UPDATE users SET resume = $1  WHERE user_id = $2 ;',[link,user_id])
    return res.rows;
}

export async function updatePhoto(link , user_id){
    const res = await db.query('UPDATE users SET image = $1  WHERE user_id = $2 ;',[link,user_id])
    return res.rows;
}


export async function getUserAnalytics(id){
    const joinQuery = `SELECT * , applications.status AS app_status FROM applications INNER JOIN postings ON applications.post_id = postings.post_id`;

    const {rows:appStatusData} = await db.query(`SELECT COUNT(*) , app_status FROM ( ${joinQuery} ) as p where p.user_id = $1 GROUP BY app_status ;`,[id]);
    const {rows:companyData} = await db.query(`SELECT COUNT(*) , company_name FROM ( ${joinQuery} ) as p where p.user_id = $1 GROUP BY company_name ;`,[id]);

    return {appStatusData,companyData};

}



export async function searchJobseekersByEmp(experience,skill){
    const skillList = skill.split(',');
    let matchingStr = '';
    skillList.forEach((value,ind)=>{
        matchingStr+=`LOWER(skill) LIKE '%${value.toLowerCase()}%'`
        if(ind !== skillList.length - 1){
            matchingStr+=' OR '
        }
    })
    
    const res = await db.query(`SELECT * FROM users WHERE experience >= $1 AND ( ${matchingStr} );`,[experience])
    return res.rows;
}



export async function setUserStatus(email,status){
    const res = await db.query('UPDATE users SET status = $1 where email = $2 ;',[status,email]);
    return res.rows;
}