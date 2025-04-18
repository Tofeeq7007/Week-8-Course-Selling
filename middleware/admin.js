const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const JWT_Admin_SECRET = process.env.JWT_Admin_SECRET;


function Admin_middleware_file(req,res,next){
    
    const token = req.headers.token;
    if(!token)  res.status(401).json({message : "Invalid token"})
    
    try{
        const decoded_data = jwt.verify(token,JWT_Admin_SECRET);
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
    Admin_middleware_file:Admin_middleware_file
}    