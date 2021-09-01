module.exports.home=(req,res) => {
    return res.send("Hello !");
}

module.exports.createSession = (req,res) => {
    return res.status(200).json({
        message:"Google Authentication Done Successfully!",
    })
}