const { response } = require('express')
const patient_dashboard = require('./patient_dashboard')
const patient_details = require('./patient_dashboard')

//show the list of the patient 

const index = (req, res, next) => {
    patient_details.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error Occured!'
        })
    })
}


//store update

const store = (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    let patient_details = new patient_dashboard({
        P_ID: req.body.P_ID,
        NAME: req.body.NAME,
        D_ID: req.body.D_ID,
        CATEGORY: req.body.CATEGORY,
        TYPE: req.body.TYPE,
        UPLOAD: req.body.UPLOAD    
    })
    if(req.file){
        patient_details.UPLOAD = req.file.path
    }
    patient_details.save()
    .then(response => {
        res.json({
            message: 'Patient added successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error Occurred!'
        })
    })
}

// show single patient
 
const show = (req, res, next) => {
    let P_ID = req.body.P_ID
    
    patient_details.findById(P_ID)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error => {
        console.log(P_ID)
        res.json({
            message: 'An error Occured'
        })
        
    })
}



//update details 

const update = (req, res, next) =>{
    const P_ID = req.body.P_ID

    let updatedData = {
        P_ID: req.body.P_ID,
        NAME: req.body.NAME,
        D_ID: req.body.D_ID,
        CATEGORY: req.body.CATEGORY,
        TYPE: req.body.TYPE,
        UPLOAD: req.body.UPLOAD
    }
    patient_details.findByIdAndUpdate(P_ID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Patient Details updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete patient details 

const destroy = (req, res, next) => {
    let P_ID = req.body.P_ID
    patient_details.findOneAndRemove(P_ID)
    .then(() => {
        res.json({
            message: 'Pateint details deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
 }

 module.exports = {
    index, store, show, update, destroy
 }