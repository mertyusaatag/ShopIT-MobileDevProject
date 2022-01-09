const Order = require("../models/Order");

//ADD ORDER
const createNewOrder = (orderData) =>      
{
    const order = new Order(orderData);
    return order.save();
}


//GET ALL USER ORDERS
const getUserOrders = (userData) =>
{
    //console.log(Order.find({userId: userData}))
    return Order.find({userId: `${userData}`});
}

//DELETE ORDER
const deleteOrder = (orderId) =>
{
   Order.findOneAndDelete(orderId, function (err) {
    if (err) {
        console.log(err)
    } 
    else {
        console.log(`Order ${orderId} deleted.`)
    }
   })
}


//GET ALL ORDERS
const getAllOrders = () =>
{
    return Order.find({});
}

module.exports = {
    getAllOrders,
    deleteOrder,
    getUserOrders,
    createNewOrder
}
