import db from "../db/db.js";
import { getUserById } from "./users.js";


export async function getApplicantsForPost(post_id) {
    const res = await db.query('SELECT * FROM applications WHERE post_id = $1 ORDER BY created_at DESC;',[post_id]);
    return res.rows;
}


export async function applyApplication(user_id,post_id) {
    let userData = await getUserById(user_id);
    delete userData.password;
    userData = JSON.stringify(userData);
    const res = await db.query('INSERT INTO applications (user_id,post_id,user_data) VALUES($1 , $2 , $3 );',[user_id,post_id,userData])
    return res;
}


export async function getApplicationsWithPostByUserID(user_id){
    const res = await db.query('SELECT * , applications.created_at AS applied_date , applications.status AS app_status  FROM applications INNER JOIN postings ON applications.post_id = postings.post_id AND applications.user_id = $1 ORDER BY applications.created_at DESC;',[user_id]);
    if(res.rows.length > 0){
        res.rows.forEach((row)=>{
            row.user_data = JSON.parse(row.user_data);
        })
    }
    return res.rows;
}


export async function updateApplicationStatus(status,id) {
    const res = await db.query('UPDATE applications SET status = $1 WHERE app_id = $2 ;',[status,id])
    return res;
}