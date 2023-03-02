const mongoose = require("mongoose");

const patient_docs = new mongoose.Schema({
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

const pathology_dashboard = mongoose.model("pathology_dashboard", patient_docs);

module.exports = pathology_dashboard;