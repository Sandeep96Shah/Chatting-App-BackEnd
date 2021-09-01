const Friendship = require('../models/friendship');
const User = require('../models/user');
//const mongoose = require('mongoose');

module.exports.makeFriend =async (req,res) => {

    // const from = mongoose.Types.ObjectId(req.params.from);
    // console.log("paramssss", from);
    try{
    console.log("req.user makefriedn", req.params);
    let checking = await User.findOne({_id : req.params.from}, 'friends');
    let ans = checking.friends.filter(id => id == req.params.to );

    if(ans.length>0){
        return res.status(200).json({
            message:"Friendship already exists!",
        })
    }

    let fromUser = await User.findById(req.params.from);
    console.log("from userrrr", fromUser);
    fromUser.friends.push(req.params.to);
    fromUser.save();

    let toUser = await User.findById(req.params.to);
    console.log("from userrrr", fromUser);
    toUser.friends.push(req.params.from);
    toUser.save();
    let privateMessage = await Friendship.create({
        from_user:req.params.from,
        to_user:req.params.to,
    })
    await User.find({_id:req.params.to}, 'name', (err,users) => {
        return res.status(200).json({
          users,
          message:"Friendship Done!",
        })
      })
    // return res.status(200).json({
    //     message:"Friendship Done!",
    // })
    }catch(err){
        return res.status(400).json({
        message:"error while making the friendship!",
    })
    }
}

