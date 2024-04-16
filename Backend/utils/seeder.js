const Book =require('../Models/Books');
const dotenv = require('dotenv');
const connectDatabase = require('../config/DataBase')

const books = require('../Data/Books.json');
const {connect } = require('mongoose');

dotenv.config({path:'backend/config/config.env'})

connectDatabase();

const seedBooks = async() =>{
    try{
        await Book.deleteMany();
        console.log('Books are deleted');

        await Book.insertMany(books);
        console.log('Books are added');

        process.exit();
    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedBooks()