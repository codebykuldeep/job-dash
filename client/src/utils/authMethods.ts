import constant from "../helper/constant";
import { ReqBody } from "../types/formTypes";
import { getToken } from "./utilsFunctions";

export async function UserRegistration(body:ReqBody){
    try {
         const response  = await fetch(constant.SERVER+'/register',{
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json',
            }
         })
         const data = await response.json();
         
         return data
    } catch (error) {
        return {success:false,data:error}
    }
}


export async function UserLogin(body:ReqBody) {
    try {
        const response  = await fetch(constant.SERVER+'/login',{
            method:'POST',
            body:JSON.stringify(body),
           headers:{
               'Content-Type':'application/json',
           }
        })
        const data = await response.json();
        
        return data
   } catch (error) {
       return {success:false,data:error}
   }
}


export async function UserVerify() {
    try {
        const response  = await fetch(constant.SERVER+'/verify',{
            method:'GET',
           headers:{
               'Authorization':getToken(),
           }
        })
        const data = await response.json();
        
        return data
   } catch (error) {
       return {success:false,data:error}
   }
}