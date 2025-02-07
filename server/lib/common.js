import db from "../db/db.js";
import { getAdmin } from "./admins.js";
import { getEmployerByEmail } from "./employers.js";
import { getUserByEmail } from "./users.js";



export async function checkForExistingEmail(email) {
    const data = await Promise.allSettled([getUserByEmail(email),getEmployerByEmail(email),getAdmin(email)]);
    console.log(data);
    
    if(data[0].value || data[1].value || data[2].value){
        return true;
    }
    return false;
}



export async function googleAuthLogin(payload){
    const {email,name,picture,email_verified} = payload;
    const checkUser = await db.query('SELECT * FROM users WHERE email = $1 ;',[email]);
    if(checkUser.rows.length>0){
        const user = checkUser.rows[0];
        if(Boolean(user.status) === false){
           const result = await db.query(`UPDATE users SET status = 'true' WHERE email = $1  RETURNING *;`,[email]);
           return  result.rows[0];
        }
        return checkUser.rows[0];
    }
    const insertUser = await db.query('INSERT INTO users(name,email,image,status) VALUES($1, $2, $3 ,$4 );',[name,email,picture,email_verified]);
    return insertUser.rows[0];
}