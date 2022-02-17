const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ernrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

  try {
    await client.connect();
    console.log("database connected");
    const database = client.db('foodmart_shop');
    const productCollection = database.collection('products')
    const blogCollection = database.collection('blogs')
    const reviewCollection = database.collection('reviews')


    app.get('/products', async (req, res) => {
      const cursor = productCollection.find({})
      const products = await cursor.toArray();
      res.send(products);
  })
    app.get('/blogs', async (req, res) => {
      const cursor = blogCollection.find({})
      const blogs = await cursor.toArray();
      res.send(blogs);
  })
    app.get('/reviews', async (req, res) => {
      const cursor = reviewCollection.find({})
      const reviews = await cursor.toArray();
      res.send(reviews);
  })

  } 
  finally {
    // await client.close();
  }



}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Foodmart!!')
})

app.listen(port, () => {
  console.log(` listening at ${port}`)
})