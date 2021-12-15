const mongoose = require("mongoose");

const CartSchema =  new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
        
        },
        products : [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                },
                quantity: {
                    type:Number,
                    default:1,
                }
            }
        ]
    },
    {timestamps:true},
);

module.exports = new mongoose.Schema("Cart",CartSchema);