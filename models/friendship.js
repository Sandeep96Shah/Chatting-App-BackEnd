const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    from_user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    to_user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    messages:[
        {
            msg:{
                type:String,
            },
            user_id:{
                type:String,
            }
            
        }
    ]
},{
    timestamps:true,
})

const Friendship = mongoose.model('Friendship', friendSchema);

module.exports = Friendship;