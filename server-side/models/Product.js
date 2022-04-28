const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
    },
    desc : {
        type:String
    },
    img : {
        type:Array,
    },
    categories: {
        type:Array,
    },
    size : {
        type:Array,
    },
    color: {
        type:Array,
    },
    price: {
        type:Number,
    },
    inStock: {
        type:Boolean
    },
    quantity:{
        type:Number,
    },
    comment : [

        {
            cmnt : {
                type:String,
            },
            UserId : {
                type : mongoose.Types.ObjectId
            },
            date : {
                type : Date,
                default : Date.now()
            }
        }
        
    ],
},
{timestamps:true}
);

module.exports = mongoose.model("Product",ProductSchema);