const User = require("../models/User");

const insert = (userData) => {
    const user = new User(userData);
    return user.save();
}
const getAll = () => 
{
   return User.find({});
}

const loginUser = (loginData) => 
{
    return User.findOne(loginData);
}

const UniqueEmail = (userdata) => 
{
    return User.findOne({email : userdata })
}

const getOne = (id) => 
{
    return User.findById(id)
}

const updateUser = (filter, update) =>
{
    return User.findOneAndUpdate(filter, update, {new: true})
}

const deleteUser = (id) => {
    return User.findByIdAndDelete(id)
}

const deleteUsers = () => {
    return User.deleteMany({accessLevel: process.env.ACCESS_LEVEL_NORMAL_USER})
}

module.exports = {
    insert,
    getAll,
    loginUser,
    UniqueEmail,
    updateUser,
    deleteUser,
    getOne,
    deleteUsers
}