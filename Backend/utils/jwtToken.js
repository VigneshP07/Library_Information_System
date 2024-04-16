const sendToken = (user,statusCode,res)=>
{
    const token = user.getJwtToken();
    const expiresInMilliseconds = process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + expiresInMilliseconds);

    // Ensure expirationDate is a valid Date object
    if (isNaN(expirationDate.getDate())) {
        console.error('Invalid expiration date');
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    const options = {
        expires: expirationDate,
        httpOnly: true,
    };

    res.cookie('token', token, options).status(statusCode).json({
        success: true,
        token,
        user
    });
    
}

module.exports =sendToken;