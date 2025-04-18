const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const JWT_USER_SECRET = process.env.User_Secret;


function middleware_file(req,res,next){
    const token = req.headers.token;
    if(!token)  res.status(401).json({message : "Invalid token"})
    
    try{
        const decoded_data = jwt.verify(token,JWT_USER_SECRET);
        if(decoded_data){
            req.userId = decoded_data.id;
            next();
        }
    }  
    catch(error){ 
        res.status(401).json({
            message : "given token is wrong"
        })
    }
}
module.exports = {
    middleware_file
}    