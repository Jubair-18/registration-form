const mongoose = require("mongoose");


const employSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    c_Password: {
        type: String,
        required: true
    }

})


const Register = new mongoose.model("Register", employSchema)

module.exports = Register;