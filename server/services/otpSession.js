const OTP_SESSION = new Map();


export function setOTP(email,otp){
    const OTP_DATA ={
        time:new Date().getTime(),
        otp:otp
    }
    OTP_SESSION.set(email,OTP_DATA);
}

export function getOTP(email){

    const OTP_DATA = OTP_SESSION.get(email);
    console.log(OTP_DATA);
    
    const time = OTP_DATA.time;
    const otp = OTP_DATA.otp;
    const currentTime = new Date().getTime();
    if(currentTime - time >= 1000*60*5){
        return null;
    }
    return otp;
}

