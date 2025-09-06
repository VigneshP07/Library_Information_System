const ErrorHandler = require('../utils/errorHandeler');

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
    res.status(err.statusCode).json({
        sucess : false,
        error : err,
        errMessage: err.message,
        stack : err.stack
    })}
     
    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.message = err.message;

        if(err.name ==='CastError')
        {
            const message = `Resource not found,Invalid : ${err.path}`;
            error = new ErrorHandler(message,400);
        }

        if(err.name ==='ValidationError')
        {
            const message = Object.values(err.errors).map(value =>value.message);
            error = new ErrorHandler(message,400);
        }

        if(err.code ===11000)
        {
            const message = `Duplicate ${Object.keys(err.keyValues)}  entered`
            error = new ErrorHandler(message,400);
        }

        if(err.name ==='JsonWebTokenError')
        {
            const message = 'JSON Web Token is invalid.Try Again!!!';
            error = new ErrorHandler(message,400);
        }

        if(err.name ==='TokenExpiredError')
        {
            const message = 'JSON Web Token is expired.Try Again!!!';
            error = new ErrorHandler(message,400);
        }

        res.status(error.statusCode).json({
            sucess:false,
            message : error.message || 'Internal server Error'
        });
    }

};