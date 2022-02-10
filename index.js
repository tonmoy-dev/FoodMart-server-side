const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eeauc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run(){

  try {
    await client.connect();
    console.log("database connect")
  } 
  finally {
    // await client.close();
  }



}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Foodmart!')
})

app.listen(port, () => {
  console.log(` listening at ${port}`)
})