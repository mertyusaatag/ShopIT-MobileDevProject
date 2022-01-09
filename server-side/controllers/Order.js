const {  getAllOrders, deleteOrder, getUserOrders, createNewOrder} = require("../services/Order");
const httpStatus = require("http-status");
const { verifyToken } = require("../utils/helper");
const fs = require("fs");

const userOrders = async (req, res) =>{
  const  id = req.param(`userId`)
  
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
    const auth = verifyToken(req.headers.authorization)
    const ord = req.param(req.body)
    if(auth.accessLevel > process.env.ACCESS_LEVEL_GUEST){
        newOrder = await createNewOrder(req.body)
     
        res.status(httpStatus.CREATED).send(newOrder);
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




module.exports = {
    userOrders,
    addOrder
}

