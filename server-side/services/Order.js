const orderModel = require("../models/Order");

//ADD ORDER
const createNewOrder = (orderData) =>      
{
    const order = new orderModel(orderData);
    return order.save();
}


//GET ALL USER ORDERS
const getUserOrders = (req, res) =>
{
    orderModel.find({ userId: req.params.userId }, (error,data) =>  
    {
        res.json(data)
    })
}

//DELETE ORDER
const deleteOrder = (req, res) =>
{
    orderModel.findByIdAndDelete(req.params.id, (error,data) =>
    {
        res.json(data)
    } )
}


//GET ALL ORDERS
const getAllOrders = (req, res) =>
{
    orderModel.find((error, data) =>
    {
        res.json(data)
    })
}

module.exports = {
    getAllOrders,
    deleteOrder,
    getUserOrders,
    createNewOrder
}
