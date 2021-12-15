const Mongoose = require("mongoose");

const db =Mongoose.connection;

db.once("open",() => {
     console.log("Db connection is succesfull !")
})

const connectDB = async () =>
{
    await Mongoose.connect("mongodb+srv://mert37:mert37@shopit.pch5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}
module.exports = {
    connectDB
}