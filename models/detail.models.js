const mongoose = require('mongoose')

const DetailSchema= new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true,
    }, 
    companyDetails:{
        companyName:{
            type:String,
            required:true},
        location:{
            type:String,
            required:true},
        salary:{
            type:String,
            required:true},
        jobType:{
            type:String,
            required:true}
    },
    jobDescription:{
        type:String,
        required:true
    },
    qualifications:{
        type:Array,
        required:true
    },
},{
    timestamps:true
})

const Details=mongoose.model('Details',DetailSchema)

module.exports=Details






