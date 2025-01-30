const express= require('express')
const app =express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initializeDatabase} = require('./db/db.connect')
const Details = require('./models/detail.models')

app.use(express.json())

initializeDatabase()

const jobDetail1={
    jobTitle:"Software Engineer",
    companyDetails:{
        companyName:"TechCorp",
        location:"San Francisco, CA",
        salary:"820000 LPA",
        jobType:"Full-time(On-site)"
    },
    jobDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    qualifications:["Bachelor's degree in related field","3+ yeats experience"]   
}

const jobDetail2={
    jobTitle:"Content Writer",
    companyDetails:{
        companyName:"Creative ink",
        location:"Austin, TX",
        salary:"680000 LPA",
        jobType:"Part-time(Remote)"
    },
    jobDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    qualifications:["Bachelor's degree in related field","3+ yeats experience"]   
}

const jobDetail3={
    jobTitle:"Data Analyst",
    companyDetails:{
        companyName:"Data Insights Inc.",
        location:"Chicago, IL",
        salary:"900000 LPA",
        jobType:"Full-time(On-site)"
    },
    jobDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    qualifications:["Bachelor's degree in related field","3+ yeats experience"]   
}

const jobDetail4={
    jobTitle:"UI/UX Designer",
    companyDetails:{
        companyName:"Design Studio",
        location:"Seattle, WA",
        salary:"750000 LPA",
        jobType:"Part-time(On-site)"
    },
    jobDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    qualifications:["Bachelor's degree in related field","3+ yeats experience"]   
}

const jobDetail5={
    jobTitle:"DevOps Engineer",
    companyDetails:{
        companyName:"CloudTech",
        location:"Remote",
        salary:"530000 LPA",
        jobType:"Full-time(Remote)"
    },
    jobDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    qualifications:["Bachelor's degree in related field","3+ yeats experience"]   
}

const jobDetail6={
    jobTitle:"Customer Support Representative",
    companyDetails:{
        companyName:"Supportly",
        location:"Remote",
        salary:"600000 LPA",
        jobType:"Full-time(Remote)"
    },
    jobDescription:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    qualifications:["Bachelor's degree in related field","3+ yeats experience"]   
}



async function createDetails(newDetails) {
    try{
        const detail = new Details(newDetails)
        const saveDetails= await detail.save()
        //console.log('New Job Details data: ', saveDetails)
        return saveDetails
    }catch(error){
        throw error
    }
}

//createDetails(jobDetail1)
//createDetails(jobDetail2)
// createDetails(jobDetail3)
// createDetails(jobDetail4)
// createDetails(jobDetail5)
// createDetails(jobDetail6)

//add new job detials 
app.post('/details', async(req,res)=>{
    try{
        const savedDetails= await createDetails(req.body)

        res.status(201).json({message:'details added successfully ',detail:savedDetails})

    }catch(error){
        res.status(500).json({error:"Failed to add data" })
  }
})

//get all jobs details form the database

async function readAllDetails() {
    try{
        const detail= await Details.find()
        return detail

    }catch(error){
        throw(error)
    }
}

app.get('/detail/all',async(req,res)=>{
    try{
        const details = await readAllDetails()
        if(details.length !=0){
            res.json(details)
        }else{
            res.status(404).json({error:'Details not found'})
        }
    }catch(error){
        res.status(500).json({error:'failed to fetch data from details'})
    }
})

//get job detail by id from the database
async function readDetailById(detailId) {
    try{
        const detail = await Details.findById(detailId)
        return detail
    }catch(error){
        throw error
    }
}

app.get('/detail/:detailId', async(req,res)=>{
    try{
        const detail = await readDetailById(req.params.detailId)
        if(detail){
            res.json(detail)
        }else{
            res.status(404).json({error:'Data not found.'})
        }
    }catch(error){
        res.status(500).json({error:'failed to fetch data from database.'})
    }
})

//update detail of job with the help of its id
async function updateDetailData(detailId, dataToUpdate) {
    try{
        const updatedDetail= await Details.findByIdAndUpdate(detailId,dataToUpdate,{new:true})
        return updatedDetail
    }catch(error){
        throw error
    }
}

app.post('/detail/:detailId', async(req,res)=>{
    try{
        const updatedDetail= await updateDetailData(req.params.detailId, req.body)

        if(updatedDetail){
            res.status(200).json({message:'job detail updated successfully.'})
        }else{
            res.status(404).json({error:'data not found'})
        }
    }catch(error){
        res.status(500).json({error:'failed to update data.'})
    }
})

//delete job detail by id
async function deleteJobDetailById(detailId){
    try{
        const deleteDetail= await Details.findByIdAndDelete(detailId)
        return deleteDetail
    }catch(error){
        throw error
    }
}

app.delete('/detail/:detailId', async(req,res)=>{
    try{
        const deleteDetail = await deleteJobDetailById(req.params.detailId)

        if(deleteDetail){
            res.status(200).json({message:'data deleted successfully.'})
        }else{
            res.status(404).json({error:'data not found.'})
        }
    }catch(error){
        res.status(500).json({error:'failed to delete data.'})
    }
})

const PORT =3000
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
