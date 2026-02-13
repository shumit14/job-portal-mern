const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect =  async(req,res,next)=>{
    
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        res.status(401).json({message : "Not Authorized"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id).select("_id email role");
        next()
    } catch (error) {
        res.status(401).json({message : "Token Failed"})
    }
}


// ADMIN PROTECTED ROUTE
exports.adminOnly = (req,res,next)=>{
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({message : "Admin access Only"})
    }
    next()
}

exports.userOnly = (req, res, next) => {

  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({ message: "Not Allowed" });
  }

  next();
};
