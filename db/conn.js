 const mongoose = require("mongoose")
 
//  Creating a database
 mongoose.connect("mongodb://localhost:27017/medi-lock",{
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) .then(() => {
    console.log("connection successful");
 }) .catch((error) => {
        console.log(error);
        console.log('No Connection');
 })