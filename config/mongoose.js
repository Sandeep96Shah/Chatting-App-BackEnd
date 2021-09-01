const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log("Connected to the mongoose atlas!");
    // const db = mongoose.connection;
    // db.on("error", (err) => {
    //     console.log("error in connecting to the MongoDB");
    // });
    // db.once('open', () => {
    //     console.log("Connected to the MongoDb Successfully!");
    // })
})
.catch((error)=>console.log("Listen nhi ho rha h!",error.message));

//const db = mongoose.connection;

// db.on("error", (err) => {
//     console.log("error in connecting to the MongoDB");
// });

// db.once('open', () => {
//     console.log("Connected to the MongoDb Successfully!");
// })
