import constant from "../../helper/constant"
import { Response } from "../../types/requestResponseTypes";
import { getToken } from "../utilsFunctions";

export async function updateEmployerStatus(emp_id:string,status:boolean) {
    const link = constant.SERVER + '/employers/status';
    try {
        const response = await fetch(link,{
            method:'POST',
            headers:{
                'Authorization':getToken(),
                'Content-Type':'application/json'
            },
            body:JSON.stringify({emp_id,status})
        })
        const data:Response = await response.json();
        return Boolean(data.success)
    } catch (error) {
        return false;
    }
}