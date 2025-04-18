const { Router }  = require("express");
const { z } = require('zod');
const bcrypt = require('bcrypt');
const adminRouter = Router();
const { AdminModel } = require("../Database/db")
const jwt = require('jsonwebtoken');
const JWT_Admin_SECRET = "random154tmchamp"
const {Admin_middleware_file} = require('../middleware/admin');
const { CourseModel } = require('../Database/db');
adminRouter.post('/signup', async function(req,res){
    
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

        await AdminModel.create({
            email:email,
            password:hashPassword,
            firstName:firstName,
            lastName:lastName
        });

    }
    catch(e){
        return res.json({
            message : "Admin already exist"
        })
    }



    res.json({
        message : "Admin signup Boom"
    })
})

adminRouter.post('/signin', async function(req,res){
    const {email , password} = req.body;
    const found = await AdminModel.findOne({
        email:email
    })
    if(found){ // User DB mai Hai
        const passwordMatch = await bcrypt.compare(password , found.password);

        if(passwordMatch){
            const token = jwt.sign({
                id : found._id.toString()
            },JWT_Admin_SECRET);

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



// adminRouter.use(adminMiddleware) 
adminRouter.post('/course',Admin_middleware_file , async function(req,res){ //
    
    const adminId = req.userId;
    const  { title , description, imageUrl, Price} = req.body;
    const course = await CourseModel.create({
        title:title,
        description:description,
        Price:Price,
        imageUrl:imageUrl,
        creatorId:adminId
    })
    res.json({
        message : "Course Created",
        creatorId:course._id
    })
})

adminRouter.put('/course', function(req,res){ // /
    res.json({
        message : "signin endpoint"
    })
})
adminRouter.get('/course/bulk', function(req,res){ // /bulk
    res.json({
        message : "signin endpoint"
    })
})  

module.exports = {
    adminRouter : adminRouter
}