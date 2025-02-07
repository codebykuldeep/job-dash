import jwt from 'jsonwebtoken';
import constant from '../constant.js';


function generateToken(payload,expiry='24h'){
    const token = jwt.sign({...payload,iat:new Date().getTime()},constant.JWT_SECRET,{
        expiresIn:expiry,
    })
    return token;
}

function verifyToken(token){
    const payload = jwt.verify(token,constant.JWT_SECRET)
    return payload;
}


export {generateToken,verifyToken};