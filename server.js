 // Core Dependencies
const express = require("express");
const app = express();
 const http = require('http').createServer(app)
 const cors = require('cors')
// const { Socket } = require('socket.io')
 const io = require('socket.io')(http, {
    cors: { origin: "*" }
 })
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middlewares

const userRoute = require('./src/Router/userRoute')

app.use('/api', userRoute)
 app.get('/', (req,res) => {
    res.render('index')
 })

const userModel = require('./src/models/user')
const formatMessage = require('./src/utils/messages');
const { default: mongoose } = require("mongoose");
const { mongodburi } = require("./src/core/config");
const User = require("./src/service/user");

// io
 io.on("connection", (socket) => {
   console.log("user connected");
   socket.on('GroupChat', async ()=> {
    const user = await new User().getUserById()
   })

   // checking if user is disconnected
   socket.on("online", async () => {
     await new User().updateUserIsOnline("", true, socket.id);
   });

   //check if user is typing
   socket.on("typing", () => {

   });

   // listening for messages
   socket.on("message", (message, callback) => {
     console.log(message);

     io.emit("message", formatMessage("ezra", message));
     callback({
       status: "ok",
     });
   });

   // checking if user is disconnected
   socket.on("disconnect", async () => {
     await new User().updateUserIsOnline("", false, socket.id);
   });
 });

mongoose.connect(mongodburi).then(()=> {
 http.listen(3000, () => console.log("listening on port 3000"));

})