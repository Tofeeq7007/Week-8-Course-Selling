const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// console.log("Mongo DB Connected");
// dotenv.config();
// mongoose.connect(process.env.Database_link);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
 

const userSchema = new Schema({
    email:{type:String , unique:true },
    password:String,
    firstName:String,
    lastName:String
});

const adminSchema = new Schema({
    email:{type:String , unique:true },
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema = new Schema({
    title:String,
    description:String,
    Price:Number,
    imageUrl:String,
    creatorId:ObjectId
    
})

const purchaseSchema = new Schema({

    courseId: ObjectId,
    userId: ObjectId

})

const UserModel = mongoose.model('users', userSchema);
const AdminModel = mongoose.model('admin', adminSchema);
const CourseModel = mongoose.model('courses', courseSchema);
const PurchaseModel = mongoose.model('purchases',purchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}