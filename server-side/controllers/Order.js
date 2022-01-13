const {  getAllOrders, deleteOrder, getUserOrders, createNewOrder} = require("../services/Order");
const {  updateProduct, findProductByID } = require("../services/Product")
const httpStatus = require("http-status");
const { verifyToken } = require("../utils/helper");
const fs = require("fs");
const mongoose = require('mongoose');

const userOrders = async (req, res) =>{
  const  id = req.params.userId;
  
const auth = verifyToken(req.headers.authorization)


if(auth.accessLevel > process.env.ACCESS_LEVEL_GUEST){
   
    try{
       
       const allOrders = await getUserOrders(id)
        console.log("addes")
        if(allOrders === null){
         
            res.status(httpStatus.OK.send({message:"Nothing to show"}))
        }
        else{
          
            res.status(httpStatus.OK).send(allOrders)
        }
        
    }
    catch (error) {
        res
        .status(httpStatus.BAD_REQUEST)
        .send({
            message:"No orders to show"
        })
    }
}
else{
    return res
        .status(HTTP.UNAUTHORIZED)
        .send({
            message:
            "User is not logged in"         
        });
}
}



const addOrder = async (req, res) =>
{
    try{
        newOrder = await createNewOrder(req.body)
        for(product of newOrder.products){
            let prod = await findProductByID(product.productId)
            prod.quantity = prod.quantity - product.quantity
            await updateProduct({ _id: prod._id }, prod)
        }
        res.status(httpStatus.CREATED).send(newOrder);
    }catch(error){
        return res
        .status(httpStatus.BAD_REQUEST)
        .send({
            message: error        
        });
    }

}




module.exports = {
    userOrders,
    addOrder
}

