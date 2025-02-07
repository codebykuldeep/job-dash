import { generateToken, verifyToken } from "../auth/auth.js";
import { getAdmin } from "../lib/admins.js";
import { checkForExistingEmail } from "../lib/common.js";
import { getEmployer, getEmployerByEmail, registerEmployer } from "../lib/employers.js";
import { findUser, getUserByEmail, getUserById, registerUser, updatePassword } from "../lib/users.js";
import { ApiResponse, UserResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';

export async function handleRegistration(req,res) {
    const body = req.body;
    const {email,role} = body;
    
    
    try {
        const emailCheck = await checkForExistingEmail(email);
        if(emailCheck){
            return res.json(new ApiResponse(401,{message:'Email already exists'},false))
        }
        const hashedPassword = await bcrypt.hash(body.password,3); 
        body.password = hashedPassword;
        if(role === 'user'){
            const result = await registerUser(body);
            return res.status(200).json(new ApiResponse(200,result,true)) 
        }
        else if(role === 'employer'){
            const result = await registerEmployer(body);
            return res.status(200).json(new ApiResponse(200,result,true))
        }
        else{
            return res.json(new ApiResponse(401,{message:'Unknown role registration failed'},false))
        }
    } catch (error) {
        
        return res.json(new ApiResponse(500,error,false))
    }
}


export async function handleLogin(req,res) {
    const body = req.body;
    const {email,password} = body;

    if(!email && !password){
        return res.json(new ApiResponse(401,{message:'Required Field are missing'},false));
    }

    try {
    
        const user = await findUser(email);
        
        if(!user){
            return res.json(new UserResponse(404,{message:'User do not exists'},false));
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if(passwordCheck){
            delete user.password;
            const token = generateToken(user);
            return res.json(new UserResponse(200,user,true,token));
        }

       
        return res.json(new UserResponse(401,{message:'Credentials are incorrect'},false));
       
    } catch (error) {
        return res.json(new UserResponse(500,error,false))
    }
}



export async function handleUserVerification(req,res) {
    const authorization = req.headers['authorization'];
    if(!authorization){
        return res.json(new UserResponse(401,{message:'No Auth Credential/token is present.Please provide Authorization header'},false))
    }

    const JWT_TOKEN = authorization.split(' ')[1]

    try {
        const data = verifyToken(JWT_TOKEN);
        const {email,role} = data;
        
        
        let user;
        if(role === "admin"){
            user = await getAdmin(email);
            user.role = 'admin';
            delete user.password;
        }
    
        if(role === 'employer'){
            const {emp_id} = data;
            user = await getEmployer(emp_id);
            //user = await getEmployerByEmail(email);
            user.role = 'employer';
            delete user.password;
        }

        if(role === 'user'){
            const {user_id} = data;
            user = await getUserById(user_id);
            //user = await getUserByEmail(email);
            user.role = 'user';
            delete user.password;
        }

        const token = generateToken(user);
        //await wait(5000);
        return res.json(new UserResponse(200,user,true,token));
       
    } catch (error) {
        console.log(error);
        
        return res.json(new UserResponse(500,error,false))
    }
}

export async function handleResetPassword(req,res) {
    try {
        const {role,email}  = req.user;
        let {old_password,password} = req.body;
        password = await bcrypt.hash(password,3);
        const result = await findUser(email);
        const db_password = result.password;
        
        const passwordCheck = await bcrypt.compare(old_password, db_password);
        
        
        if(passwordCheck){
            await updatePassword(role,email,password);
            return res.json(new ApiResponse(200,{message:'Password Update successful'},true));
        }
        
        return res.json(new ApiResponse(400,{message:'Password mismatch occurred'},false))
    } catch (error) {
        return res.json(new ApiResponse(500,{message:'Update successful',error},false))
    }
}