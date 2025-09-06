const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({
    title:{
        type:String,
        required :[true,"Please enter the Title of Book"],
        trim:true,
        // maxLength:[,"Max length is 50"]
    },
    author:{
        type:String,
        required :[true,"Please enter the author's name"],
        trim:true,
        // maxLength:[50,"Max length is 50"]
    },
    tcopies:{
        type:Number,
        required :[true,"Please enter the Total copies in library"],
        trim:true,
        maxLength:[5,"Max length is 5"],
        default:1
    },
    acopies:{
        type:Number,
        required :[true,"Please enter the Available copies in library"],
        trim:true,
        // maxLength:[5,"Max length is 5"],
        default:1
    },
    ISBN:{
        type:String,
        // required :[true,"Please enter the ISBN NUMBER"],
        trim:true,
        maxLength:[20,"Max length is 10"]
    },
    img:{
        type:String,
    },
    genre:{
        type:String,
        // required:[true,"Please select category for this book"],
        // enum :{
        //     values:[
        //         "Horrer",
        //         "Thriller"
        //     ],
        //     message :"Plese select catogery for Book"
        // }
    },
    pages:{
        type:Number,
        required :[true,"Please enter the number of pages"],
        trim:true,
        maxLength:[5,"Max length is 5"],
        default:1
    },
    desc:{
        type:String,
        // required :[true,"Please enter the description"],
        trim:true,
        // maxLength:[500,"Max length is 500"]
    },
    takenById:{
        type:[],
        default:null,
    },
    reservedById:{
        type:[],
        default:null,
    },
    LastAllotedDate:{
        type:Date,
        default:Date.now(),
    },
    Shelf:{
        type:String,
    }
})

module.exports = mongoose.model('Books',BooksSchema);
