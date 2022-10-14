 // Core Dependencies
const express = require("express");
const app = express();
 const cors = require('cors')

 const cookieParser = require('cookie-parser')

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

// middlewares

const userRoute = require('./src/Router/userRoute')
const conversationRoute = require('./src/Router/conversation')
const messageRoute = require('./src/Router/message')

//Router midlewares
app.use('/message', messageRoute)
app.use('/api', userRoute)
app.use('/api/conversation', conversationRoute)

// views
 app.get('/', (req,res) => {
    res.render('index')
 })

 app.get('/signup', (req, res) => {
   res.render('signup')
 })

 app.get('/login', (req, res) => {
   res.render('login')
 })

const { default: mongoose } = require("mongoose");
const { mongodburi } = require("./src/core/config");



mongoose.connect(mongodburi).then(()=> {
 app.listen(3000, () => console.log("listening on port 3000"));

})