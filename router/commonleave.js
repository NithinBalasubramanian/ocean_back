const express = require('express');

const route = express();
const commonLeaveDb  = require('../model/commonleave')

route.get('',(req,res) => {
    return res.send('Common leave is running')
})

route.post('/addCommonLeave',(req,res) => {
    let data = req.body;

    let date = {
        "title" : data.title,
        "date" : data.date,
    }
    commonLeaveDb.find({ date : data.date }).exec((err,comData) => {
        if(comData.length > 0){
            return res.json({ status: 400, msg: "Common leave is already applied" });
        }else{
            commonLeaveDb.create(date,(err,insertedData) => {
                if(err || !insertedData){
                    return res.json({ status: 400, msg: "something went wrong", err });
                }
                return res.json({status : 200, data : insertedData})
            });
        }
    });
})

route.get('/listLeave',(req,res) => {
    commonLeaveDb.find().exec((err,data) => {
        if(err) {
            return res.json({ status: 400, msg: "something went wrong", err });
        }

        return res.json({status : 200, data : data})
    })
})

route.post('/checkLeave',(req,res) => {
    let data = req.body;

    let date = {
        "date" : data.date,
    }

    commonLeaveDb.findOne(date,(err,insertedData) => {
        if(err){
            return res.json({ status: 400, msg: "something went wrong", err });
        }else if(!insertedData){
            return res.json({ status: 400, msg: "No data found", data : [] });
        }
        return res.json({status : 200, data : insertedData})
    });
})

module.exports = route