import constant from "../../helper/constant";
import { ReqBody } from "../../types/formTypes";
import { Response } from "../../types/requestResponseTypes";
import { getToken } from "../utilsFunctions";


//method for both add and update
export async function postsMethod(action:string,body:ReqBody) {
    const link = constant.SERVER + '/posts/' + action;
    try {
        const response = await fetch(link,{
            method:'POST',
            headers:{
                'Authorization':getToken(),
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        const data:Response = await response.json();
        return Boolean(data.success)
    } catch (error) {
        return false;
    }
}

export async function deletePostMethod(id:string) {
    const link = constant.SERVER + '/posts/'+id;
    try {
        const response = await fetch(link,{
            method:'DELETE',
            headers:{
                'Authorization':getToken(),
            },
        })
        const data:Response = await response.json();
        return Boolean(data.success)
    } catch (error) {
        return false;
    }
}