import { getListForEmployer, getListForUser } from "../lib/messages.js";
import { ApiResponse } from "../utils/response.js";


export async function getChatListForUser(req,res) {
    try {
        const {user_id} = req.user;
        const data = await getListForUser(user_id);
        return res.json(new ApiResponse(200,data,true));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,{message:'failed to fetch',error},false));
    }
}


export async function getChatListForEmployer(req,res) {
    try {
        const {emp_id} = req.user;
        const data = await getListForEmployer(emp_id);
        return res.json(new ApiResponse(200,data,true));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,{message:'failed to fetch',error},false));
    }
}