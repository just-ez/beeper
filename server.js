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
 app.get('/', (req,res) => {
    res.render('index')
 })
// io.on()
 io.on("connection", (socket) => {
   console.log("user connected");

   socket.on("message", (message) => {
     console.log(message);
     io.emit("message", `${socket.id} said ${message}`);
   });
 });


 http.listen(3000, ()=> console.log('listening on port 3000'))