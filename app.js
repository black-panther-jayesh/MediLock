const { ok } = require("assert");
const { json, Router } = require("express");
const expreess = require("express");
const multer = require('multer')
const mongoose = require('mongoose')
const { css } = require("jquery");
const { dirname } = require("path");
const path = require("path");
const cors = require("cors");
const upload = require('./upload')
const PatientRoute = require('./patient')
const fileupload = require("express-fileupload")
const fs = require("fs")



require("./db/conn");

const signup = require("./signup");
const patient_dashboard = require("./patient_dashboard");
const { default: axios } = require("axios");
// const index = require('./index');
const app = expreess();
app.use(cors());
const port = process.env.PORT || 3000;

// setting the path 
const staticpath = path.join(__dirname);

// console.log( path.join(__dirname));

// middelware

app.use(expreess.json());
app.use(fileupload());
app.use(expreess.urlencoded({ extended: false }));
app.use(expreess.static('uploads'));
app.use('/api/patient', PatientRoute)
app.use('/uploads', expreess.static('uploads'))

app.use('/css', expreess.static(path.join(__dirname, "./css")));
app.use('/js', expreess.static(path.join(__dirname, "./js")));
app.use('/jquery', expreess.static(path.join(__dirname, "./jquery")));
app.use(expreess.static(staticpath))

// routing

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// create a new user in our database
app.post("/signup", async (req, res) => {
    try {
        // console.log(req.body)
        const user = await signup.create(req.body)

        res.status(201).json({ status: 'ok', user });

    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/login", (req, res) => {
    res.render("login.html")
});

app.get("/patinet_dashboard copy", (req, res) => {
    res.render("/patinet_dashboard copy");
});

app.get("/patient_login", (req, res) => {
    res.render("patient_login");

});
app.get("/patient_dashboard", (req, res) => {
    res.render("patient_dashboard");

});
app.get("/doctor_dashboard", (req, res) => {
    res.render("doctor_dashboard");

});



// login check

app.post("/patient_login", async (req, res) => {
    // console.log(req.body);
    try {

        const P_ID = req.body.P_ID;
        const PASSWORD = req.body.PASSWORD;


        const patientID = await signup.findOne({ P_ID: P_ID });

        // console.log(patientID)
        if (patientID.PASSWORD === PASSWORD) {
            // res.status(201).render("patient_dashboard.html");
            res.status(200).send("Succesfull")

        } else {
            res.send("Invalid Password");
        }
        // console.log(P_ID + ' is P_ID and PASSWORD ' + PASSWORD);

    } catch (error) {
        res.status(400).send("Invalid P_ID")

    }

});

//patient details

app.post("/patient_dashboard", async (req, res) => {
    try {
        const file = req.files.UPLOAD;
        console.log(req.files.UPLOAD.name)
        const filePath = path.join(__dirname, 'uploads', req.files.UPLOAD.name);
        console.log(filePath)
        file.mv(filePath, (err) => {
            if (err) {
                console.log(err);
            };
        });
        let patient_details = new patient_dashboard({
            P_ID: req.body.P_ID,
            NAME: req.body.NAME,
            D_ID: req.body.D_ID,
            CATEGORY: req.body.CATEGORY,
            TYPE: req.body.TYPE,
            // UPLOAD: req.body.UPLOAD
            UPLOAD: filePath
        })

        await patient_details.save();
        res.json({
            status: "ok",
            message: "Data Uploade Successfully",
            data: patient_details
        })

    } catch (error) {
        res.status(400).send(error);
    }
});

//patient details

app.post("/patient_dashboard", async (req, res) => {
    try {
        // console.log(req.body)
        const detail = await controlller.store(req.body)
        console.log(detail)
        res.status(201).json({ status: 'ok', detail });

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/patient_dashboard", async (req, res) => {
    try {
        // console.log(req.body)
        const detail = await patient_dashboard.updateOne(req.body)
        console.log(detail)
        res.status(201).json({ status: 'update', detail });

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/patient_dashboard", async (req, res) => {
    try {
        // console.log(req.body)
        const detail = await controlller.store(req.body)
        console.log(detail)
        res.status(201).json({ status: 'ok', detail });

    } catch (error) {
        res.status(400).send(error);
    }
});

//pathology Doc

app.post("/pathology_dashboard", async (req, res) => {
    try {
        const file = req.files.UPLOAD;
        // console.log(req.files.UPLOAD.name)
        const filePath = path.join(__dirname, 'uploads/patho', req.files.UPLOAD.name);
        console.log(filePath)
        file.mv(filePath, (err) => {
            if (err) {
                console.log(err);
            };
        });
        let patient_details = new pathology_dashboard({
            NAME: req.body.NAME,
            D_ID: req.body.D_ID,
            CATEGORY: req.body.CATEGORY,
            TYPE: req.body.TYPE,
            // UPLOAD: req.body.UPLOAD
            UPLOAD: filePath
        })

        await patient_details.save();
        res.json({
            status: "ok",
            message: "Data Uploade Successfully",
            data: patient_details
        })

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/pathology_dashboard", async (req, res) => {
    try {
        // console.log(req.body)
        const detail = await controlller.store(req.body)
        console.log(detail)
        res.status(201).json({ status: 'ok', detail });

    } catch (error) {
        res.status(400).send(error);
    }
});



