const httpStatus = require("http-status");
const { FindUserCart,createNewCart,FindProductInCart,addQuantityForProduct} = require("../services/Cart");

const addProductToCart = async(req,res) => {
    try {
        const findCart = await FindUserCart(req.body.UserId)
        if(findCart)
        {
            const existingProduct = await FindProductInCart(req.body)
            if(existingProduct)
            {
                const updatedCart = await addQuantityForProduct(req.body);
                res.status(httpStatus.CREATED).send(updatedCart);
            }
            else{
              const addedProduct = await AddProductToCart(req.body);
              res.status(httpStatus.CREATED).send(addedProduct);
            }
        }
        else {
            await createNewCart(req.body)
            const existingProduct = await FindProductInCart(req.body)
            if(existingProduct)
            {
                const updatedCart = await addQuantityForProduct(req.body);
                res.status(httpStatus.CREATED).send(updatedCart);
            }
            else{
              const addedProduct = await AddProductToCart(req.body);
              res.status(httpStatus.CREATED).send(addedProduct);
            }
        }
    
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

module.exports = {
    addProductToCart
}