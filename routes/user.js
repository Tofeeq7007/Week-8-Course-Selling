const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router;
const { z } = require('zod');
const  bcrypt = require('bcrypt');
const JWT_SECRET = "AFJDBDVDVMBCD";
const { UserModel } = require('../Database/db');
// or
// const { Router } = require('express');
const userRouter = Router(); 


userRouter.post('/signup', async function(req,res){
    
    const givenSchema = z.object({
        email : z.string().email({message : "Invalid email"}),
        password:z.string()
        .trim()
        .min(8,{message : "Password must be 8 charater long"})
        .max(64,{message: "password must be less than 64 character"})
        .regex(/[A-Z]/ , {message : "password must contain atleast one lowercase letter"})
        .regex(/[a-z]/ , {message : "password must contain atleast one uppercase"})
        .regex(/[0-9]/ , {message : "password must contain atleast one number"})
        .regex(/[!@#$%^&*()]/ , {message : "password must contain atleast one special charater"}),
        firstName:z.string()
                    .trim()
                    .min(1 ,  {message: "firstName cannot be empty"} )
                    .max(20 , {message: "firstName <=20 character"} )
                    .regex(/^[A-Za-z\s]+$/ , {message: "Only letters/spaces allowed"}),
                            
        lastName:z.string().trim()
                    .max(20 , {message: "firstName <=20 character"} )
                    .regex(/^[A-Za-z\s]+$/ , {message: "Only letters/spaces allowed"})
    })
    
    const parseDatawithSuccess = givenSchema.safeParse(req.body);
    if(!parseDatawithSuccess.success){ 
        const errorMessage = parseDatawithSuccess.error.issues.map((item)=>{
            return {
                field : item.path[0],
                message:item.message
            }
        })
        return res.json({
            error: errorMessage
        })


    }

    const {email , password, firstName, lastName} = req.body;
    
    try{
        const hashPassword = await bcrypt.hash(password , 6);

        await UserModel.create({
            email:email,
            password:hashPassword,
            firstName:firstName,
            lastName:lastName
        });

    }
    catch(e){
        return res.json({
            message : "User already exist"
        })
    }



    res.json({
        message : "You signup Boom"
    })
})


// function middleware_file(req,res,next){
//     const token = req.header.token;
//     if(!token)  res.status(401).json({message : "Invalid token"})
    
//     try{
//         const decoded_data = jwt.verify(token,JWT_SECRET);
//         if(decoded_data){
//             next();
//         }
//     }
//     catch(error){
//         res.status(401).json({
//             message : "given token is wrong"
//         })
//     }
// }
// userRouter.use(middleware_file)


userRouter.post('/signin', async function(req,res){
    const {email , password} = req.body;
    const found = await UserModel.findOne({
        email:email
    })
    if(found){ // User DB mai Hai
        const passwordMatch = await bcrypt.compare(password , found.password);

        if(passwordMatch){
            const token = jwt.sign({
                id : found._id.toString()
            },JWT_SECRET);

            res.json({
                token : token
            })
        }
        else{
            return res.status(401).json({
                message : "Invalid  Password"
            })            
        }

    }
    else{
        return res.status(401).json({
            message : "Incorrect Credential"
        })
    }

})
userRouter.get('/purchases', function(req,res){
    res.json({
        message : "signin endpoint"
    })
})
module.exports = userRouter