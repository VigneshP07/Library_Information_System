const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandeler");
const catchAsyncErrors = require("./catchAsyncErrors");


exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const{token} = req.cookies;
    if(!token){     
        new ErrorHandler('Login First',401).catch(err =>console.error(err));
        return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

exports.authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.Type)){
            return next(new ErrorHandler('You are not authorized to access this route',403));
        }
        next();
    }
}