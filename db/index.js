const { connect } = require("mongoose");

const url = 'mongodb://localhost:27017/medi-lock';

const client = new MongoClientt(url);

async function getData()
{
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection('medi-lock');
    let response = await collection.find({}).toArray();
    console.log(response);
}

getData();
