const express=require('express')
const app=express()
var cors=require('cors')
const connectDB = require('./connection');
// const router=require('router')
require('dotenv').config()
const router = require('./routes');
app.use(cors())
app.use(express.json());
app.use('/',router)

const start=async(req,res)=>{

    try {
          await connectDB(process.env.MONGO_CDN_URL)
          app.listen(5000,(req,res)=>{
 console.log('success')
          })

         
    } catch (error) {
        console.log(error)          
    }
  


}
start()