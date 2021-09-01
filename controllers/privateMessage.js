const Friendship = require('../models/friendship');

module.exports.message = (req,res) => {
    Friendship.find({from_user:req.user._id, to_user:req.params.to}, 'messages',async (err,friend) => {
        if(err){
            return res.status(500).json({
                message:"Error in fetching the private message",
                err,
            })
        }
        if(friend.length == 0){
            await Friendship.find({from_user:req.params.to, to_user:req.user._id}, 'messages', (err,friend) => {
                try{
                    if(err){
                        return res.status(500).json({
                            message:"Error in fetching the private message",
                            err,
                        })
                    }
                    return res.status(200).json({
                        message:"Here is your private message",
                        pm:friend,
                    })
                }catch(err){
                    console.log("error while getting the private messages!");
                    return res.status(500).json({
                        message:"error while getting the private messages!",
                    })
                }
            })
        }else{
            return res.status(200).json({
                message:"Here is your private message",
                pm:friend,
            })
        }
    })
}

module.exports.addMessage = async (req,res) => {
    console.log("adding message");
    console.log("req.user._id", req.user);
     try{
        let check =await Friendship.find({from_user:req.user._id, to_user:req.params.to});
        // if(!check){
        //     check =await Friendship.find({from_user:req.params.to, to_user:req.user._id});
        // }
        if(check.length==0){
            check = await Friendship.find({from_user:req.params.to, to_user:req.user._id});
        }
        console.log('check.',check[0]);
        const privateMessage = {
            msg:req.body.message,
            user_id:req.user._id,
        }
        check[0].messages.push(privateMessage);
        check[0].save();
        return res.status(200).json({
            message:"Your message has been added!",
            message:privateMessage,
            check,
        })
    }catch(err){
        console.log("Error while adding the message to the dB!",err);
        return res.status(500).json({
            message:"Error while adding the message to the dB!",
        })
    }
}


module.exports.chatroom = async (req, res) => {
    try{
        // console.log("chatroomm", req.params);
        // await Friendship.findOne({"from_user":req.params.from, "to_user":req.params.to}, 'messages', (err,friend) => {
        //     if(err){
        //         console.log("errrr", err);
        //         return;
        //     }
        //     if(!friend){
        //         const newFriend =  Friendship.find({"from_user":req.params.to, "to_user":req.params.from}, 'messages'); 
        //             console.log("anotherfriend");
        //             return res.status(200).json({
        //                 message:"take the chatroom id, keep it safe!",
        //                 newFriend,
        //             })
        //     }
        //     console.log("friend", friend);
        //     return res.status(200).json({
        //         message:"take the chatroom id, keep it safe!",
        //         friend,
        //     })
        // })
        // console.log("friendShippppppppp");
        // return res.status(200).json({
        //     message:"take your chatroom id!",
        // })
        
    }catch(err){
        console.log("Error while fetching the chatroom from db!",err);
        return res.status(500).json({
            message:"Error while fetching the chatroom from db!",
        })
    }
}