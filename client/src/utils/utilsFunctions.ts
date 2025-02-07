
import { IUser } from "../types/dataTypes";

export function getToken():string{
    const token = localStorage.getItem('token');
    return `Bearer ${token}`
}

export function setToken(token:string){
    localStorage.setItem('token',token);
}

export function removeToken(){
    localStorage.removeItem('token');
}
export function getTokenString(){
    const token = localStorage.getItem('token');
    return token;
}


export function redirectToDashboard(user:IUser){
    if(user.role === 'admin'){
        return ('/admin')
    }
    else if(user.role === 'employer'){
        return ('/employer')
    }
    else{
        return ('/user');
    }
}