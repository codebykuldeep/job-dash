
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


export function chatDateFormat(chatDate:string):string{
    const date = new Date(chatDate).toLocaleDateString('en-US',{
        year:'2-digit',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:"2-digit"     
    });
    return date;
}