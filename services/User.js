const User = require("../models/User");

const insert = (userData) => {
    const user = new User(userData);
    return user.save();
}
const list = () => 
{
   return User.find({});
}

const loginUser= (loginData) => 
{
    return User.findOne(loginData);
}

const UniqueEmail = (userdata) => 
{
    return User.findOne({email : userdata })
}
module.exports = {
    insert,
    list,
    loginUser,
    UniqueEmail
}