const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const taskRouter = require('./routes/task');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;


// RUN DOTENV
dotenv.config();

// BODY PARSER
app.use(express.json());

//SERVE STATIC FILES
app.use(express.static(process.env.PUBLIC_DIR));

//API ROUTE
app.use('/api/v1', taskRouter);


// ERROR HANDLING
app.use(async (err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        status: false,
        error: message
    })
})


// RUN STATIC FILES
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})


// DATABASE CONNECTION
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('database is connected successfully');
}




// CREATE SERVER
app.listen(port, (err) => {
    if(!err){
        console.log(`server is running on port: ${port}`)
    }else{
        console.log(err)
    }
})