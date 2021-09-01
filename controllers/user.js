const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
const jwt = require('jsonwebtoken');
const Speakeasy = require("speakeasy");
//edit this before deploying
const API_KEY = process.env.API_KEY;

sgMail.setApiKey(API_KEY);

module.exports.createUser = async (req, res) => {
  console.log("req.body",req.body);
  let isVerified = false;
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      return res.status(404).json({
        message: "Error in fetching the user from DB!",
      });
    }
    let secret;
    if (!user) {
      const secretA = () => {
        secret = Speakeasy.generateSecret({ length: 20 }).base32;
      };
      secretA();
      const account = await User.create({
        secret,
        email: req.body.email,
      });
    } else {
      secret = user.secret;
      isVerified = true;
    }
    let token = Speakeasy.totp({
      secret,
      encoding: "base32",
    });
    console.log("token", token);
    const message = {
      to: req.body.email,
      from: process.env.EMAIL_ID,
      subject: "OTP",
      text: token,
      html: `<h1>Hello!</h1> <h2>${token}</h2>`,
    };
    sgMail
      .send(message)
      .then((response) => {
        return res.status(200).json({
          message: response,
          isVerified,
          success:true,
        });
      })
      .catch((err) => {
        return res.status(200).json({
          message: err,
        });
      });
  });
};

module.exports.validateUser = async (req,res) => {
  console.log("req.body",req.body);
    if(req.body.name.length>0){
        let dosttt = await User.findOneAndUpdate({email:req.body.email}, {name:req.body.name},{new:true});
    }
    User.find({email:req.body.email}, (err,user) => {
        if (err) {
            return res.status(404).json({
              message: "Error in fetching the user from DB!",
            });
        }
        let secret = user[0].secret;
        let valid = Speakeasy.totp.verify({
            secret,
            encoding: "base32",
            token: req.body.token,
            window:3
        });
        if(valid){
            return res.status(200).json({
                message:"Verification successful, keep the token!",
                data:{
                    token: jwt.sign(user[0].toJSON(), process.env.SECRET, { expiresIn: "10000000" }),
                },
                user:user[0],
                success:true,
            })
        }else{
            return res.status(200).json({
                message:"Verification Failed, Try Again!",
            })
        }
    })
}


module.exports.allUsers = async (req,res) => {
   await User.find({}, 'name', (err,users) => {
    return res.status(200).json({
      users,
      message:"Here Is a list of allthe users!",
    })
  })
}

module.exports.userFriends = (req,res) => {
  User.findById(req.user._id, 'messages').populate('friends', 'name').exec((err,friends) => {
    if (err) {
      return res.status(404).json({
        message: "Error in fetching friendList of user from DB!",
      });
  }
    return res.status(200).json({
      message:"Here Is A user friendList!",
      friends,
    })
  })
}

module.exports.searchFriend = (req,res) => {
  console.log("Searching friend", req.body);
  User.find({name:req.body.name}).populate('friends', 'name').exec((err, friends) => {
    if (err) {
      return res.status(404).json({
        message: "Error in fetching friendList of user from DB!",
      });
    }
    return res.status(200).json({
      message:"Here Is A Searched friendList!",
      friends,
    })
  })
}
