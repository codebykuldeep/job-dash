import { verifyToken } from "../auth/auth.js";
import { findUser } from "../lib/users.js";
import { UserResponse } from "../utils/response.js";

export async function auth(req,res,next){
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.json(
        new UserResponse(
          401,
          {
            message:
              "No Auth Credential/token is present.Please provide Authorization header",
          },
          false
        )
      );
    }

    const JWT_TOKEN = authorization.split(" ")[1];
    let user;
    try {
        const data = verifyToken(JWT_TOKEN);
        const {email} = data;
    
        user = await findUser(email);
        if(!user){
          return res.json(new UserResponse(401,{message:'User not authenticated'},false));
        }
    
       
    } catch {
        return res.json(new UserResponse(500,{message:'User not authenticated and Internal Server Error'},false))
    }
    req.user = user;
    next();
}


export function adminAuth(req,res,next){
  if(!req.user){
    return res.json(new UserResponse(401,{message:'User not authenticated.Only Admin allowed'},false));
  }
  if(!req.user.role || req.user.role !== 'admin'){
    return res.json(new UserResponse(401,{message:'User not authenticated.Only Admin allowed'},false));
  }
  next();
}