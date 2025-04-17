// const express = require('express');
// const course = express.Router;
const {Router} = require('express');
const { CourseModel } = require('../Database/db.js')

const courseRouter = Router();

courseRouter.get('/preview', function(req,res){
    res.json({
        message : "course preview "
    })
})
courseRouter.post('/purchase' , function(req,res){
    res.json({
        message: "Course purchased"
    })
})

module.exports = {
    courseRouter : courseRouter
}