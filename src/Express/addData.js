const express =  require('express')
var app=express();
require("dotenv").config()
const db  = require("./Db/Connection")
const tipsJson = require("./Tips.json")
const doctorJson = require("./Doctors.json")
const tips=require("./Model/TipSchema")
const Doctor =  require("./Model/DoctorsSchema");


const addTips = async()=>{
    await db(process.env.MONGODB_URL);
    await tips.create(tipsJson)
}
const addDocters = async()=>{
    await db(process.env.MONGODB_URL);
    await Doctor.create(doctorJson)
}


module.exports = {addTips, addDocters}