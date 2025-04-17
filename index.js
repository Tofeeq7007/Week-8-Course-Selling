const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());


const  { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const userRouter = require('./routes/user');

app.use('/api/v1/user' , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use('/api/v1/course', courseRouter);

async function main() {
    await mongoose.connect(process.env.Database_link);
    // Agar DataBase se connection hi fail hua tho kya jarurat hai Backend ko run karne ki
    app.listen(3000, ()=>{
        console.log("Server runing");
    }) 

}
main();