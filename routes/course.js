// const express = require('express');
// const course = express.Router;
const {Router} = require('express');
const { CourseModel,PurchaseModel } = require('../Database/db.js')
const { middleware_file } = require('../middleware/user');

const courseRouter = Router();

courseRouter.get('/preview',async function(req,res){

    const courses = await CourseModel.find({});
    res.json({
        courses
    })
})
courseRouter.post('/purchase' , middleware_file, async function(req,res){
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    // You can put check over here is the course bought or not ?
    // you should do check 
    console.log("boom");
    console.log(courseId);
    console.log(userId);
    
    await PurchaseModel.create({
        courseId:courseId,
        userId:userId
    })

    res.json({
        message: "You have successfully purchased course"
    })
})

module.exports = {
    courseRouter : courseRouter
}