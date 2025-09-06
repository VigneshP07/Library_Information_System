const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt= require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required :[true,"Error in the system please try again."],
        trim:true,
        unique:true,
    },
    FirstName:{
        type:String,
        required :[true,"Please enter your first name"],
        trim:true,
        maxLength:[30,"Max length is 50"],
    },
    LastName:{
        type:String,
        required :[true,"Please enter your last name"],
        trim:true,
        maxLength:[30,"Max length is 50"],
    },
    EmailId:{
        type:String,
        required :[true,"Please enter your email id"],
        trim:true,
        validate:[validator.isEmail,"Please enter a valid email"],
        unique:true,
    },
    Password:{
        type:String,
        required :[true,"Please enter your password"],
        select :false,
        trim:true,
        minlength:[8,"Min length is 8"],
        // maxLength:[12,"Max length is 12"]
    },
    Type:{
        type:String,
        required :[true,"Please select your Courses type"],
        enum :{
            values:[
                "Admin",
                "UnderGraduate",
                "PostGraduate",
                "ResearchScolar",
                "FacultyMember",
            ],
            message :"Plese select your Courses type"
        }
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    BooksTaken:{
        type:Array,
        default:[]
    },
    ReservedBooks:{
        type:Array,
        default:[]
    },
    Message:{
        type:String,
        default:""
    },
    AvailableBooks:{
        type:String,
        default:""
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

// userSchema.pre('save',async function(next){
//     if(!this.isModified('Password')){
//         next();
//     }

//     this.Password = await bcrypt.hash(this.Password,10);
//     next();
// });

userSchema.methods.comparePassword = async function(Password) {

    console.log(Password)
    console.log(this.Password)
    return await Password===this.Password;
}

userSchema.methods.getJwtToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_TIME
    });
}

// userSchema.methods.getResetPasswordToken = async function()
// {
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     this.resetPasswordExpire = Date.now() + 3600000;
//     return resetToken   
// }



module.exports = mongoose.model('User',userSchema);