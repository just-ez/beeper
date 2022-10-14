const io = require('socket.io')(5000, {
    cors: {
        origin: '*'
    }
})


let users = []

const addUser = (userId, socketId) => {
    !users.some( user => user.userId === userId) &&
    users.push({ userId, socketId })
}
 
 const removeUser = (socketId) => {
   users =  users.filter(user => user.socketId !== socketId)
 }

 const getUsers = (recieverId) => {
    console.log(recieverId);
    return users.find( user => user.userId === recieverId)
 }

io.on('connection', (socket) => {
    // user connects
    console.log('user connected');
    io.emit('welcome', 'welcome to bleep')

    // take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
    io.emit("getUsers", users)
    })

    //send an recieve message

    socket.on('message', ({senderId, recieverId, text})=> {
        const user = getUsers(recieverId)
        console.log('user',user);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })

    // user disconnects
    socket.on('disconnect', () => {
        console.log(`${users.userId} disconnected`);
        removeUser(socket.id)
        io.emit("getUsers", users)
    })

})