import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import constant from '../../../helper/constant';
import { userServerConnect } from '../../../utils/http-methods/userMethods';
import { ReqBody } from '../../../types/formTypes';
import { redirectToDashboard, setToken } from '../../../utils/utilsFunctions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { userActions } from '../../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import SnackBar from './SnackBar';
const GoogleAuthMethod = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [snackState, setSnackState] = useState({
      open: false,
      status: false,
      message: "",
    });
    
    const clientId = String(constant.CLIENT_ID);

    const handleClose = () => setSnackState(prev=>({...prev,open:false}));

    async function handleGoogleLogin(credentialResponse: CredentialResponse) {
      const result = await userServerConnect(
        "POST",
        "google-auth",
        undefined,
        credentialResponse as ReqBody
      );
      if (Boolean(result.success)) {
        const { data, token } = result;
        setToken(token);
        dispatch(userActions.setUser(data));
        navigate(redirectToDashboard(data));
      }
      else{
        setSnackState({open:true,status:false,message:'Google Login Failed'});
      }
    }
 
  return (
   <>
   <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
       onSuccess={credentialResponse => {
        setSnackState({open:true,status:true,message:'Login Successful! Please Wait..'})
         handleGoogleLogin(credentialResponse);
       }}
       onError={() => {
         console.log('Login Failed');
       }}
     />
   </GoogleOAuthProvider>
   <SnackBar state={snackState} handleClose={handleClose}/>
   </>
   );
 };

export default GoogleAuthMethod