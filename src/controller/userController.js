const { success, error } = require('../utils/baseController')
const User = require('../service/user')

module.exports.createUser = async (req,res) => {
   try {
     const user = await new User(req.body).createUser()
    if (user) return success(res,user,'user created',200)
   }
   catch (err) {
    return error(res,{code: 400, message: err.message})
   }
}

module.exports.getUserById = async (req,res) => {
   try {
      const user = await new User({
         Id: req.params.Id, 
         ...req.body
      }).getUserById()
      if (user) return success(res,user,200)
   }
   catch (err) {
      return error(res, { code: err.code, message: err.message });
   }
}
module.exports.getUserByName = async (req,res) => {
   try {
      const user = await new User({
         Id: req.params.Id, 
         ...req.body
      }).getUserById(req.params.Id)
      if (user) return success(res,user,200)
   }
   catch (err) {
      return error(res, { code: err.code, message: err.message });
   }
}

module.exports.updateChatId = async (req,res) => {
   try {
   const chatId = await new User(req.params.Id).updateUserChatId()
   if (chatId) return success(res, chatId, 200);
   }
   catch (err) {
      return error(res, { code: err.code, message: err.message });
   }
}