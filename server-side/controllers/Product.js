const {addProduct , listAllProducts , findProductByID , deleteProductByID, findProductByName} = require("../services/Product");
const httpStatus = require("http-status");
const {verifyToken} = require("../utils/helper");

const create = async(req, res) =>{
    const auth = verifyToken(req.headers.authorization)
    if(auth.accessLevel > process.env.ACCESS_LEVEL_GUEST){
        if(auth.accessLevel > process.env.ACCESS_LEVEL_NORMAL_USER){
            try{    
                existingProduct = await findProductByName(req.body.name)
                if(existingProduct){
                    throw new Error("That product already exists.")
                }else{
                    newProduct = await addProduct(req.body)
                    res.status(httpStatus.CREATED).send(newProduct);
                }
            }catch(error){
                res.status(httpStatus.BAD_REQUEST).send(error.message)
            }
        } else {
            return res
            .status(httpStatus.UNAUTHORIZED)
            .send({
              message:
                "You don't have access to that feature",
            });
        }
    } else {
        return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message:
            "User is not logged in",
        });
    }
}

const getAll = async(req, res) =>{
    try{    
        allProducts = await listAllProducts()
        res.status(httpStatus.OK).send(allProducts)
    }catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

const getOneByID = async(req, res) =>{
    try{    
        product = await findProductByID(req.params.id)
        res.status(httpStatus.OK).send(product)
    }catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}
const deleteOne = async(req, res) =>{
    const auth = verifyToken(req.headers.authorization)
    if(auth.accessLevel > process.env.ACCESS_LEVEL_GUEST){
        if(auth.accessLevel > process.env.ACCESS_LEVEL_NORMAL_USER){
            try{    
                await deleteProductByID(req.params.id)
                res.status(httpStatus.OK)
            }catch(error){
                res.status(httpStatus.BAD_REQUEST).send(error.message)
            }
        } else {
            return res
            .status(httpStatus.UNAUTHORIZED)
            .send({
              message:
                "You don't have access to that feature",
            });
        }
    } else {
        return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message:
            "User is not logged in",
        });
    }
}

module.exports = {
    create,
    getAll,
    getOneByID,
    deleteOne
}