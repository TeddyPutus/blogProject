const express = require("express");
const cors = require('cors');

// const userRouter = require("./routes/user"); //this will be our route for the user model, if implemented (stretch goal)
const blogPostRouter = require("./routes/BlogPost.js");
const app = express(); //create a new instance of express
const seed = require('./db/seed'); //this will be our set up file for some dummy data

//very important tp include these!! We need this to read the body in our routers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //This allows post requests etc.

//set up  routers
// app.use('/users', userRouter);
app.use('/blogPosts', blogPostRouter);

//Comment out app.listen when running a supertest file
app.listen(5001, async() => {
    // await seed();
    console.log('Listening on port 5001');
});

module.exports = app;