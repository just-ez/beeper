const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = new mongoose.Schema({
    members: {
        type: Array,
        required: true
    },
    
}, { timestamps: true })

const Conversation = mongoose.model('conversation', Schema)

module.exports = Conversation