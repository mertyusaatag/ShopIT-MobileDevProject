const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId : 
        {
            type: mongoose.Types.ObjectId,
            autopopulate: { maxDepth: 3 }
        },
        products : 
        [
           { productId: 
                {
                    type : mongoose.Types.ObjectId,
                    ref:"Product",
                    autopopulate: { maxDepth: 3 }
                },
            quantity : {
                type:Number,
                default:1
            }}
        ],
        address : {
            type:String,
        },
        phoneNumber: {
            type:String,
        },
        amount : {
            type:Number,
        },
        status : {
            type:String,
            default:"Pending"
        }
    },
    {timestamps:true},

);

module.exports = mongoose.model("Order",OrderSchema);