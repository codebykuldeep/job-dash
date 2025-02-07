import { getAdmin } from "./admins.js";
import { getEmployerByEmail } from "./employers.js";
import { getUserByEmail } from "./users.js";



export async function checkForExistingEmail(email) {
    const data = await Promise.allSettled([getUserByEmail(email),getEmployerByEmail(email),getAdmin(email)]);
    console.log(data);
    
    if(data[0].value || data[1].value || data[2].value){
        return true;
    }
    return false;
}