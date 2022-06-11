const mongoose = require('mongoose');

const Schema = mongoose.Schema

const applyLeaveSchema = new Schema({
    employeeId : {
        type : String
    },
    date : {
        type : Date
    }
})

module.exports = mongoose.model("applyLeaveDb",applyLeaveSchema)