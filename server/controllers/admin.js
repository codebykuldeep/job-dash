import {ApiResponse} from '../utils/response.js'
import {ADMIN} from '../constant.js'
import { getDetailReportForAdmin } from '../lib/admins.js';


export async function handleAdminUpdatePassword(req,res) {
    const {old_password,password} = req.body;
    if(!old_password && !password){
        return res.status(400).json(new ApiResponse(400,{message:'password Fields are missing'},false));
    }
    if(ADMIN.password === old_password){
        ADMIN.password === password;
        return res.status(200).json(new ApiResponse(200,{message:'successful'},true));
    }
    return res.status(200).json(new ApiResponse(200,{message:'successful'},false));
}


export async function handleAdminDashboardDetail(req,res){
    try {
        const data = await getDetailReportForAdmin();
        return res.json(new ApiResponse(200,data,true));
    } catch (error) {
        return res.json(new ApiResponse(500,{message:'failed to get report',error},false));
    }
}