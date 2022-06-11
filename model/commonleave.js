const mongoose = require('mongoose');

const Schema = mongoose.Schema

const commonleaveSchema = new Schema({
    title : {
        type : String
    },
    date : {
        type : Date
    }
})

module.exports = mongoose.model("commonLeaveDb",commonleaveSchema)