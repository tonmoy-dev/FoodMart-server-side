const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors = require('cors');
require('dotenv').config()
const fileUpload = require("express-fileUpload")
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId

app.use(cors());
app.use(fileUpload());
app.use(express());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ernrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run(){

  try {
    await client.connect();
    console.log("database connected");
    const database = client.db('foodmart_shop');
    const productCollection = database.collection('products')
    const blogCollection = database.collection('blogs')
    // const reviewCollection = database.collection('reviews')
    const commentCollection = database.collection('comments')
    const reviewCollection = database.collection('reviews')
    const addblogCollection = database.collection('add_blog')
    const vendorsCollection = database.collection('vendors')


    app.get('/products', async (req, res) => {
      const cursor = productCollection.find({})
      const products = await cursor.toArray();
      res.send(products);
  })

  app.post('/products', async(req,res) => {
    const productTitle = req.body.productTitle;
    const productCategory = req.body.productCategory;
    const productPrice = req.body.productPrice;
    const productStock = req.body.productStock;
    const productVendor = req.body.productVendor;
    const productDetails = req.body.productDetails;
    const productImage = req.files.productImage
    const productImageData = productImage.data
    const encodedProductImage = productImageData.toString('base64')
    const imageBuffer = Buffer.from(encodedProductImage, 'base64')

    const product = {
      productTitle,
      productCategory,
      productPrice,
      productPrice,
      productStock,
      productVendor,
      productDetails,
      productImage: imageBuffer
    }
    const result = await productCollection.insertOne(product)
    res.json(result)
  })


  // Add comment 
   app.post('/comments', async(req,res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userComment = req.body.userComment;

    const commentss = {
      userName,
      userEmail,
      userComment
     
    }
    const result = await commentCollection.insertOne(commentss)
    res.json(result)
  })

// review 
   app.post('/reviews', async(req,res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const reviewDate = req.body.reviewDate;
    const reviewTime = req.body.reviewTime;
    const description = req.body.description;
    const imgUrl = req.body.imgUrl;

    const review = {
      userName,
      userEmail,
      reviewDate,
      reviewTime,
      description,
      imgUrl     
    }
    const result = await reviewCollection.insertOne(review)
    res.json(result)
  })

// add blog 
   app.post('/addBlog', async(req,res) => {
    const blogTitle = req.body.blogTitle;
    const blogCategory = req.body.blogCategory;
    const blogThumb = req.body.blogThumb;
    const blogTag = req.body.blogTag;
    const blogDescription = req.body.blogDescription;
    const authorName = req.body.authorName;
    const photoUrl = req.body.photoUrl;

    const addBlog = {
      blogTitle,
      blogCategory,
      blogThumb,
      blogTag,
      blogDescription,
      authorName,
      photoUrl   
    }
    const result = await addblogCollection.insertOne(addBlog)
    res.json(result)
  })

  // DELETE
  app.delete('/products/:id', async(req,res) => {
    const id = req.params.id
    const query = { _id: ObjectId (id) }
    const result = await productCollection.deleteOne(query)
    res.json(result)
  })


  // comment get api 
  app.get('/comments', async (req, res) => {
    const cursor = commentCollection.find({})
    const comments = await cursor.toArray();
    res.send(comments);
})



    app.get('/blogs', async (req, res) => {
      const cursor = blogCollection.find({})
      const blogs = await cursor.toArray();
      res.send(blogs);
  })


  // reviews get 
    app.get('/reviews', async (req, res) => {
      const cursor = reviewCollection.find({})
      const reviews = await cursor.toArray();
      res.send(reviews);
  })

    app.get('/vendors', async (req, res) => {
      const cursor = vendorsCollection.find({})
      const vendors = await cursor.toArray();
      res.send(vendors);
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