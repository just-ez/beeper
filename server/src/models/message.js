const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
   conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String
    }

}, { timestamps: true })

const Message = mongoose.model('message', Schema)

module.exports = Message