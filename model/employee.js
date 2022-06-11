const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    destination : {
        type : String
    },
    email : {
        type : String
    }
})

module.exports = mongoose.model("Employee",employeeSchema)