const express = require('express');

const route = express();
const ApplyLeaveDb  = require('../model/applyLeave')
const commonLeaveDb  = require('../model/commonleave')

route.get('',(req,res) => {
    return res.send('Leave service is running')
})

route.post('/applyLeave',(req,res) => {
    let data = req.body;

    let date = {
        "employeeId" : data.employeeId,
        "date" : data.date,
    }
    
    commonLeaveDb.find({  date : data.date } ).exec((err,comData) => {
        if(comData.length > 0){
            return res.json({status : 400, data : comData ,msg : "Selected date is a common leave"})
        }
        else{
            ApplyLeaveDb.find({ employeeId : data.employeeId , date : data.date }).exec((err,resData) => {
                if(resData.length > 0){
                    return res.json({status : 400, data : resData , msg : "Selected date is already applied" })
                }else{
                    ApplyLeaveDb.create(date,(err,insertedData) => {
                        if(err || !insertedData){
                            return res.json({ status: 400, msg: "something went wrong", err });
                        }
                        return res.json({status : 200, data : insertedData})
                    });
                }
            })
        }
    })

   
})

route.get('/listLeave',(req,res) => {
    ApplyLeaveDb.find().exec((err,data) => {
        if(err) {
            return res.json({ status: 400, msg: "something went wrong", err });
        }

        return res.json({status : 200, data : data})
    })
})

module.exports = route
