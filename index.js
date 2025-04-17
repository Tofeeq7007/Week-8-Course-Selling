const express = require('express');

const app = express();
const  { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const userRouter = require('./routes/user');

app.use('/user' , userRouter);

app.use('/course', courseRouter);


app.listen(3000, ()=>{
    console.log("Server runing");
}) 