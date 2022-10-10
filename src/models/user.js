const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true  
    },
   email: {
       type: String,
       required: true,
   },
   phone_number: {
    type: Number,
    trim: true
   },
   password: {
       type: String,
       required: true,
       minlength: 6
   },
   isOnline: {
    type: Boolean,
    default: false
   },
   isTyping: {
    type: Boolean,
    default: false
   },
   chatId: {
    type: String
   },
   bio: {
    type: String
   },
   profileImg: {
    type: String
   },
   coverImg: {
     type: String
   },
   isVerified: {
       type: Boolean,
       default: false
   }
})

Schema.pre('save', async function (next) {
    // if (!user.isModified('password')) return next();
 let salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
 next()

})
const userModel = mongoose.model('user', Schema)

module.exports = userModel