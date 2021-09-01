const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    friends: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    secret : {
        type:String,
    }
},{
    timestamps:true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;