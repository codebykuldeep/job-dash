import { ParamsType, ReqBody } from "../types/formTypes";
import { getToken } from "./utilsFunctions";

export async function fetchFromServer(url:string,params?:ParamsType){
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    return data;
}

export async function sendToServer(url:string,body?:ReqBody){
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: getToken(),
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  });
  const data = await response.json();
  return data;
}