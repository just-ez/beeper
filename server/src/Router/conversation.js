const router = require("../core/routeConfig");
const Conversation = require("../models/conversation");
const { success, error } = require("../utils/baseController");

router.post('/', async (req,res)=> {

    // create new cnv
    const newConversation = new Conversation({
        members: [
            req.body.senderId, 
            req.body.recieverId
        ]
    })
    try {
        const savedConversation = await newConversation.save()
        return success(res,savedConversation,'conversation saved')
    } catch (err) {
        return error(res,{code: err.code,message: err.message})
    }
})

router.get('/:userId', async (req,res) => {
  try {
    const conversation = await Conversation.find({
        members: {
            $in: [req.params.userId]
        }
        
    })
    return success(res,conversation,200)
  } catch (err) {
    return error(res,{code: err.code,message: err.message})
  }
})

module.exports = router