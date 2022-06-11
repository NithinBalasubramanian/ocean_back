const express = require('express');

const route = express();
const EmployeeDb  = require('../model/employee')

route.get('',(req,res) => {
    return res.send('Employee service is running')
})

route.post('/addEmployee',(req,res) => {
    let data = req.body;

    let employee = {
        "name" : data.name,
        "destination" : data.destination,
        "email" : data.email,
    }

    EmployeeDb.create(employee,(err,insertedData) => {
        if(err || !insertedData){
            return res.json({ status: 400, msg: "something went wrong", err });
        }
        return res.json({status : 200, data : insertedData})
    });
})

route.get('/listEmployee',(req,res) => {
    EmployeeDb.find({})
        .then((data) => {
            return res.json({status : 200, data : data})
        })
        .catch((err) => {
            return res.json({ status: 400, msg: "something went wrong", err });
        })        
    })


module.exports = route