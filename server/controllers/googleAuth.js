import { OAuth2Client } from 'google-auth-library';
import { UserResponse } from '../utils/response.js';
import { googleAuthLogin } from '../lib/common.js';
import { generateToken } from '../auth/auth.js';

const client = new OAuth2Client();


export async function handleGoogleAuth(req,res) {
    const { credential, client_id } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
          });
          
          const payload = ticket.getPayload();
          const user = await googleAuthLogin(payload);
          user.role = 'user';
          delete user.password;
          const token = generateToken(user);
          
          return res.status(200).json(new UserResponse(200,user,true,token))
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(new UserResponse(500,error,false,''))
    }
}