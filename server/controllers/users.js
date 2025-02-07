// import { generateToken } from "../auth/auth.js";
// import { ADMIN } from "../constant.js";
// import { registerEmployer } from "../lib/employers.js";
// import { findUser, registerUser } from "../lib/users.js";
// import { ApiResponse, UserResponse } from "../utils/response.js";

import { getApplicationsWithPostByUserID } from "../lib/applications.js";
import { getUserAnalytics, getUserById, setUserStatus, updatePhoto, updateResume, updateUser } from "../lib/users.js";
import { uploadFileToCloudinary } from "../services/cloudinary.js";
import { sendOTPMail } from "../services/mailServices.js";
import { getOTP, setOTP } from "../services/otpSession.js";
import { ApiResponse } from "../utils/response.js";


// export async function handleRegistration(req,res) {
//     const body = req.body;
//     const {role} = body;
//     console.log(body);
    
//     try {
//         if(role === 'user'){
//             const result = await registerUser(body);
//             return res.status(200).json(new ApiResponse(200,result,true)) 
//         }
//         else if(role === 'employer'){
//             const result = await registerEmployer(body);
//             return res.status(200).json(new ApiResponse(401,result,true))
//         }
//         else{
//             return res.json(new ApiResponse(401,{message:'Unknown role registration failed'},false))
//         }
//     } catch (error) {
//         return res.json(new ApiResponse(500,error,false))
//     }
// }


// export async function handleLogin(req,res) {
//     const body = req.body;
//     const {email,password} = body;

//     if(!email && !password){
//         return res.json(new ApiResponse(401,{message:'Required Field are missing'},false));
//     }

//     try {
//         if(email.toLowerCase() === ADMIN.email && password === ADMIN.password){
//             const user = ADMIN;
//             delete user.password;
//             const token = generateToken(user);
//             return res.json(new UserResponse(200,user,true,token));
//         }
    
//         const user = await findUser(email);
//         if(!user){
//             return res.json(new UserResponse(404,user,false));
//         }
//         //Compare password 
//         //USING Bcrypt
//         const token = generateToken(user);
//         return res.json(new UserResponse(200,user,true,token));
       
//     } catch (error) {
//         return res.json(new UserResponse(500,error,false))
//     }
// }



export async function handleGetUser(req, res) {
  const { id } = req.params;
  try {
    const data = await getUserById(id);
    return res.json(new ApiResponse(200, data, true));
  } catch (error) {
    return res.json(new ApiResponse(500, error, false));
  }
}


export async function handleUserDataUpdate(req,res) {
  try {
    const {user_id} = req.user;
    
    
    const body = req.body;
    const data = await updateUser(body,user_id);
    return res.json(new ApiResponse(200, data, true));
  } catch (error) {
    return res.json(new ApiResponse(500, {message:'failed to update',error}, false));
  }
}

export async function handleResumeUpdate(req,res) {
  if(!req.file){
    return res.json(new ApiResponse(500, {message:'failed to upload resume'}, false));
  }

  try {
    const {user_id} = req.user;
    const filePath = req.file.path;
    const uploadLink = await uploadFileToCloudinary(filePath);
    await updateResume(uploadLink,user_id);
    return res.json(new ApiResponse(200,{message:'resume update'}, true));
  } catch (error) {
    return res.json(new ApiResponse(500, {message:'failed to upload resume',error}, false));
  }
  
}

export async function handlePhotoUpdate(req,res) {
  if(!req.file){
    return res.json(new ApiResponse(500, {message:'failed to upload resume'}, false));
  }

  try {
    const {user_id} = req.user;
    const filePath = req.file.path;
    const uploadLink = await uploadFileToCloudinary(filePath);
    await updatePhoto(uploadLink,user_id);
    return res.json(new ApiResponse(200,{message:'photo updated'}, true));
  } catch (error) {
    return res.json(new ApiResponse(500, {message:'failed to upload photo',error}, false));
  }
  
}


export async function handleGetUserApplications(req,res) {
  try {
    const {user_id} = req.user;
    const data = await getApplicationsWithPostByUserID(user_id);
    return res.json(new ApiResponse(200, data, true));
  } catch (error) {
    return res.json(new ApiResponse(500, {message:'failed to get data',error}, false));
  }
}


export async function handleUserDetailAnalysis(req,res) {
  try {
    const {user_id} = req.user;
    const data = await getUserAnalytics(user_id);
    return res.json(new ApiResponse(200, data, true));
  } catch (error) {
    return res.json(new ApiResponse(500, {message:'failed to get data',error}, false));
  }
}


export async function handleSendOTP(req,res){
  try {
    console.log('here');
    
    const {email} = req.user;
    const otp = Math.floor(1000 + Math.random() * 9000);
    setOTP(email,otp);
    const result = await sendOTPMail(email,otp);
    if(!result) throw new Error();

    return res.json(new ApiResponse(200, {message:'OTP SEND successfully'}, true));
  } catch (error) {
    return res.json(new ApiResponse(500, {message:'OTP SEND failed',error}, false));
  }
}

export async function handleVerifyOTP(req,res) {
  try {
    const {email} = req.user;
    const {otp} = req.query;
    const generatedOTP = getOTP(email);
    if(generatedOTP === null){
      return res.json(new ApiResponse(200, {message:'OTP Expired'}, true));
    }
    if(Number(otp) === Number(generatedOTP)){
      await setUserStatus(email,true);
      return res.json(new ApiResponse(200, {message:'OTP Verified successfully'}, true));
    }
    else{
      return res.json(new ApiResponse(200, {message:'OTP incorrect'}, false));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(200, {message:'Error while verifying OTP',error}, false));
  }
}