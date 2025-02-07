import { getAllEmployers, getEmployer, getReportForEmployer, setEmployerEmailStatus, updateEmployer, updateEmployerStatus } from "../lib/employers.js";
import { searchJobseekersByEmp } from "../lib/users.js";
import { sendOTPMail } from "../services/mailServices.js";
import { getOTP, setOTP } from "../services/otpSession.js";
import { ApiResponse } from "../utils/response.js";



export async function handleGetAllEmployers(req,res) {
    const {type} = req.query;
    
    try {
        const data = await getAllEmployers(type);
        return res.status(200).json(new ApiResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,error,false));
    }
}


export async function handleGetEmployer(req,res) {
    const {id} = req.params;
    try {
        const data = await getEmployer(id);
        return res.status(200).json(new ApiResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,error,false));
    }
}



export async function handleEmployerStatusUpdate(req,res){
    const {emp_id,status} = req.body;
    
    
    if(!emp_id || status === undefined){
        return res.status(400).json(new ApiResponse(400,{message:'Missing body for request (emp_id ,status).'},false))
    }

    try {
        await updateEmployerStatus(emp_id,status);
        return res.status(200).json(new ApiResponse(200,{message:'Successful update status'},true));

    } catch (error) {
        return res.status(500).json(new ApiResponse(500,error,false));
    }
}

export async function handleEmployerUpdate(req,res) {
    try {
        const {emp_id} = req.user;
        const body = req.body;
        const data = await updateEmployer(body,emp_id);
        return res.json(new ApiResponse(200, data, true));
      } catch (error) {
        return res.json(new ApiResponse(500, {message:'failed to update',error}, false));
      }
}


export async function handleReportForEmployerDashboard(req,res) {
    try {
        const {emp_id} = req.user;
        const data = await getReportForEmployer(emp_id);
        return res.json(new ApiResponse(200, data, true))
    } catch (error) {
        return res.json(new ApiResponse(500, {message:'failed to update',error}, false));
    }
}


export async function handleJobSeekerSearch(req,res) {
    const {experience,skill} = req.query;
    
    
    try {
        const data = await searchJobseekersByEmp(experience,skill);
        return res.json(new ApiResponse(200, data, true))
    } catch (error) {
        return res.json(new ApiResponse(500, {message:'failed to search job seekers',error}, false));
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
        return res.json(new ApiResponse(200, {message:'OTP Expired'}, false));
    }
    if(Number(otp) === Number(generatedOTP)){
      await setEmployerEmailStatus(email,true);
      return res.json(new ApiResponse(200, {message:'OTP Verified successfully'}, true));
    }
    else{
      return res.json(new ApiResponse(200, {message:'Incorrect OTP'}, false));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(200, {message:'Error while verifying OTP',error}, false));
  }
}