const Cart = require("../models/Cart");
const Product = require("../models/Product")
const User = require("../models/User")


// const addProductNew = async (ProductData) => {
    
//     const user = await new User({name :"anonim",email:"anonim", accessLevel:0})
//     console.log(ProductData)
//     const cart = await new Cart({
//         user : user,
//         products: ProductData
//     }
//         );
//     return cart.save();
// }

const FindUserCart = async (userID) => {
    const cart = await Cart.find({userId : userID})
    return cart;
};

const AddProductToCart = async(ProductData,CartData) => 
{
    const cart = await Cart.findByOne(CartData);
    cart.products.push(ProductData);
    return cart.save();
}

const FindProductInCart = (productData) => {
    return Cart.find({productId : productData})
}

const createNewCart = (userID,productData) => {
    const cart = new Cart({
        userId : userID,
        products :productData
    });
    return cart.save();
}

const addQuantityForProduct = (cartId,productData) => {
    console.log(cartId)
    const cart = Cart.findById(cartId);
   // console.log(cart);
    const selectedProduct = cart.products.filter(p => p.productId = productData);
    selectedProduct.quantity = selectedProduct.quantity+1
    return cart.save();
}
   

module.exports = {
  FindUserCart,
  AddProductToCart,
  FindProductInCart,
  createNewCart,
  addQuantityForProduct
}