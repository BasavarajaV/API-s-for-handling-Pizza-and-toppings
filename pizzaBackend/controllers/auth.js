exports.isSignedIn= (req, res, next) =>{
    //Asuuming user is sigened in
    next();
}

exports.isAuthenticated=(req, res, next)=>{
    let checker= true; // Assuming that user is authenticated
    if(!checker){
        return res.status(403).json({
            error:"Access denied, You are not authenticated"
        })
    }
    next();
}

exports.isAdmin=(req , res , next)=>{
    const role=1 // assuming admin is authenticated
    if(role === 0){
        return res.status(403).json({
            error: "You are not ADMIN, Access Denied"
        })
    }
    next();
}