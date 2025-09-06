const { config } = require('dotenv');
const mongoose = require('mongoose')

const uri = 'mongodb+srv://prabhashgolla2004:o0fJDaaVNlJKhJ1S@softwarelab.bkgkbzw.mongodb.net/?retryWrites=true&w=majority&appName=SoftwareLab';

const connectDatabase = () =>{
    mongoose.connect(uri,{
        // useNewUrlParser : true,
        // useUnifiedTopology:true,
        // useCreateIndex:true
    }).then(con =>{
        console.log(`MongoDB Data base connected with Host: ${con.connection.host}`)
    }).catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectDatabase