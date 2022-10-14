const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const { jwt_Secret_key, jwt_duration } = require('../core/config')
class User {
    constructor(data) {
        this.data = data
    }
    async getAllUsers() {
      const users = await userModel.find({})
      return users
    }
    async createUser() {
        const Data = this.data
        const user = new userModel(Data)
        const saveUser = await user.save()
        if (saveUser) {
            console.log(saveUser);
              const token = jwt.sign({ _id: saveUser._id }, jwt_Secret_key, {
                expiresIn: jwt_duration,
              });
              return token;
        }

    }
    async getUserById() {
        const data = this.data
        const findUser = await userModel.findById({_id: data})
        if (findUser) return findUser
    }
    async getUserByName(id) {
        const data = this.data
        const findUser = await userModel.findOne({ user_name: id });
        if (findUser) return findUser
    }
    async updateUserChatId() {
         const data = this.data;
         const updateChatId = await userModel.updateOne({_id: data.id}, data.chatId);
         if (updateChatId) return updateChatId 
    }
    async updateUserIsOnline(email, isOnline, socketId) {
       return await userModel.findOneAndUpdate(
         {
           $or: [{ email }, { socketId }],
         },
         {
           $set: { isOnline, socketId },
         },
         {
           new: true,
         }
       );
    }
}

module.exports = User