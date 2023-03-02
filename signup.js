const mongoose = require("mongoose");

const patient_signup = new mongoose.Schema({
    P_ID: {
        type: String,
        maxlength: 10,
        required: true,
        unique: true
    },
    NAME: {
        type:  String,
        maxlength: 32,
        required: true
    },
    AGE: {
        type: Number,
        maxlength: 3,
        required: true
    },
    GENDER: {
        type: String,
        maxlength: 10,
        required: true
    },
    MOBILE: {
        type: Number,
        maxlength: 12,
        required: true
    },
    PASSWORD: {
        type: String,
        maxlength: 15,
        required: true
    } 
})

// Now We need to create a collection

const signup = mongoose.model("signup", patient_signup);

module.exports = signup;