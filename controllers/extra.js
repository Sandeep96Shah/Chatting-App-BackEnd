module.exports.createUser = async (req, res) => {
  
    try{
      console.log("req.body",req.body);
    let isVerified = false;
    const user = await User.findOne({ email: req.body.email });
      let secret;
      console.log("checking user", user);
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
        from: "sandeep2016shah@gmail.com",
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
    }catch(err){
      return res.status(400).json({
        message: `Error ho gaya user controller me ${err}`,
      });
    }
  };