import constant from "../../helper/constant";
import { ParamsType, ReqBody } from "../../types/formTypes";
import { fetchFromServer, sendToServer } from "../httpMethods";
import { getToken } from "../utilsFunctions";

type methodType = 'GET' | 'POST' | "PUT" | "DELETE" ;

export async function userServerConnect(method:methodType,url:string,params?:ParamsType,body?:ReqBody){
    let reqURL = constant.SERVER + '/' + url;
    switch(method){
        case "GET":{
            try {
                if(params){
                    reqURL += paramsToString(params);
                }
                const data = await fetchFromServer(reqURL);
                return data;
            } catch (error) {
                return {success:false};
            }
        }
        case 'POST':{
            try {
                const data = await sendToServer(reqURL,body);
                return data;
            } catch (error) {
                return {success:false};
            }
        }
        default:{
            return {success:false};
        }
    }
}


export async function uploadFile(url:string,body?:FormData){
    const reqURL = constant.SERVER + '/' + url;
  try {
    const response = await fetch(reqURL, {
        method: "POST",
        headers: {
          Authorization: getToken(),
        },
        body:body
      });
      const data = await response.json();
      return data;
  } catch (error) {
    return {success:false}
  }
}


export function paramsToString(params:ParamsType){
    let str = ''
    if (params) {
      const paramsArray = Object.entries(params!);
      str += "?";
      if (paramsArray.length > 0) {
        for (let [key, val] of paramsArray) {
          str += `${key}=${val}&`;
        }
      }
    }
    return str;
}
