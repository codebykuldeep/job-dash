export function logger(req,res,next){
    const date = new Date().toLocaleTimeString('en-US',{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
    });
    console.log(req.method +" "+req.url + "  "+ date);
    next();
}