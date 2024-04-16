const User = require('../Models/User');

const ErrorHandler = require('../utils/errorHandeler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '203266.main@sasi.edu.in',
        pass: '8185MP88'
    }
});


exports.newUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        const user = await User.create(req.body);
        sendToken(user, 200, res);
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {Username,Password} = req.body;
    if(!Username || !Password)
    {
        return next(new ErrorHandler('Please provide{Username} and password',400));
    }
    const user = await User.findOne({userName:Username}).select('+Password').catch(err=>console.log(err));
    
    if(!user)
    {
        res.status(404).json({
            success: false,
            message: 'User not found'
        });
        next();
    }
    const isMatch = await user.comparePassword(Password);
    if(!isMatch)
    {
        res.status(404).json({
            success: false,
            message: 'Invalid Password'
        });
        next();
    }
    sendToken(user,200,res);
})

exports.getUserProfile = catchAsyncErrors(async(req,res,next)=>{
    
    try{
    let user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        user
    })}catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
        })
    }
})

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{

    try{
        let user = await User.findById(req.params.id).select('+Password');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        const isMatch = await user.comparePassword(req.body.OldPassword)
        if(!isMatch)
        {
            res.status(404).json({
                success: false,
                message: 'Incorrect Password'
            });
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                Password : req.body.Password,
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
            user
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
});

exports.updateProfile= catchAsyncErrors(async(req,res,next)=>{
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                FirstName : req.body.FirstName,
                LastName : req.body.LastName,
                EmailId : req.body.EmailId,
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
            user
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Successfully logged out'
    })
})

exports.reserveBooktoUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $addToSet: {
                ReservedBooks: req.body.book._id
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
            books
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.notifyUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                Message : req.body.message
            }            
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        let mailOptions = {
            from: '"Library IIT KGP" <203266.main@sasi.edu.in>',
            to: 'prabhashgolla2004@gmail.com',
            subject: 'You Have A New Notifiaction from the Library IIT KGP',
            html: `<body style="color: black;">
            <p>Dear ${user.FirstName},</p>
            <p>${req.body.message ? req.body.message.replace(/\n/g, '<br/>') : ''}</p>
            <p style="color: grey;">Thank You</p>
            <p style="color: grey;">Library IIT KGP</p>
        </body>`

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred: ' + error.message);
                return;
            }
            console.log('Email sent: ' + info.response);
        });
        res.status(200).json({
            success : true,
            books
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.AvailablenotifyUser = catchAsyncErrors(async(req,res,next)=>{
    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                AvailableBooks : req.body.message
            }            
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        let mailOptions = {
            from: '"Library IIT KGP" <203266.main@sasi.edu.in>',
            to: 'prabhashgolla2004@gmail.com',
            subject: 'You Have A New Notifiaction from the Library IIT KGP',
            html:  `<body style="color: black;">
            <p>Dear ${user.FirstName},</p>
            <p>${req.body.message ? req.body.message.replace(/\n/g, '<br/>') : ''}</p>
            </body>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred: ' + error.message);
                return;
            }
            console.log('Email sent: ' + info.response);
        });
        res.status(200).json({
            success : true,
            books
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.BookTaken = catchAsyncErrors(async(req, res, next)=>{
    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $addToSet: {
               BooksTaken : req.body.data,
            },
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        user = await User.findByIdAndUpdate(req.params.id,{
            $pull:{
                ReservedBooks: req.body.data._id,
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.RemoveReserve = catchAsyncErrors(async(req, res, next)=>{
    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $pull:{
                ReservedBooks: req.body._id,
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.DeleteBookTaken = catchAsyncErrors(async(req, res, next)=>{
    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        user = await User.findByIdAndUpdate(req.params.id,{
            $pull: {
               BooksTaken : req.body.data,
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.allUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user)
    {
        res.status(401).json({error : 'User not found'});
        next();
        // return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUser= catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.EmailId = req.body.EmailId;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Successfully updated profile'
    })
})

exports.deleteUser= catchAsyncErrors(async(req,res,next)=>{
    console.log(req.params.id)
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user)
    if(!user)
    {
        res.status(404).json({
            success: false,
            message: 'User not found'
        });
        next();
        // return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    })
})