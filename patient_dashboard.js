const mongoose = require("mongoose");

const patient_docs = new mongoose.Schema({
    P_ID: {
        type: String,
        required: true,
    },
    NAME: {
        type:  String,
        required: true
    },
    D_ID: {
        type: Number,
        required: true
    },
    CATEGORY: {
        type: String,
        required: true
    },
    TYPE: {
        type: String,
        required: true
    },
    UPLOAD: {
        type: String,
        required: true
    } 
})

const patient_dashboard = mongoose.model("patient_dashboard", patient_docs);

module.exports = patient_dashboard;