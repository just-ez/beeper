const router = require("../core/routeConfig");
const Message = require("../models/message");
const { success, error } = require("../utils/baseController");



router.post('/post', async ( req, res) => {
    const newMessage = new Message(req.body)
    console.log(req.body);
    try {
        const savedMessage = await newMessage.save()
        return success(res,savedMessage,200)
    } catch (err) {
        return error(res,{ code: err.code, message: err.message })
    }
})

router.get('/get/:conversationId', async ( req, res) => {
    try {
        console.log(req.params.conversationId);
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        
        return success(res,message,'',200)
    } catch (err) {
        return error(res,{ code: err.code, message: err.message })
    }
})

module.exports = router