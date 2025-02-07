import { redirect } from "react-router-dom";
import { getTokenString } from "./utilsFunctions";

export function authPageLoader(){
    if(getTokenString()){
        return redirect('/');
    }
    return null;
}