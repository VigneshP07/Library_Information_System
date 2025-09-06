const app = require('./app')

const connectDatabase = require('./config/DataBase')

const dotenv = require('dotenv');

process.on('uncaughtException',err=>{
    console.log("Error: " + err.message);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})

dotenv.config({path: 'Backend/config/config.env'})


//connecting Database
connectDatabase();

const server = app.listen(process.env.Port,()=>
{
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode .`)
})

process.on('unhandledRejection',err =>
{
    console.log("Error: " + err.message);
    console.log("Shutting down the server due to unhadeled Promise Rejection");
    server.close(()=>
    {
        process.exit(1);
    });
});
