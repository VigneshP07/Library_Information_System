const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middleware/error');
// const errorHandler = require('./utils/errorHandeler'); 
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const Books = require('./Router/Books');
const User = require('./Router/User');

app.use('/api/v1',User);
app.use('/api/v1',Books);

app.use(errorMiddleware);
// app.use(errorHandler);

module.exports = app;