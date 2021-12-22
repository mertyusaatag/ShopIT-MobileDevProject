const {addProduct , listAllProducts , findProductByID , deleteProductByID, findProductByName} = require("../services/Product");
const httpStatus = require("http-status");

const create = async(req, res) =>{
    try{    
        existingProduct = await findProductByName(req.body.name)
        if(existingProduct){
            throw new Error("That product already exists.")
        }else{
            newProduct = await addProduct(req.body)
            res.status(httpStatus.CREATED).send(newProduct);
        }
    }catch(error){
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

const getAll = async(req, res) =>{
    try{    
        allProducts = await listAllProducts()
        res.status(httpStatus.OK).send(allProducts)
    }catch(error){
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

const getOneByID = async(req, res) =>{
    try{    
        product = await findProductByID(req.params.id)
        res.status(httpStatus.OK).send(product)
    }catch(error){
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}
const deleteOne = async(req, res) =>{
    try{    
        await deleteProductByID(req.params.id)
        res.status(httpStatus.OK)
    }catch(error){
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

module.exports = {
    create,
    getAll,
    getOneByID,
    deleteOne
}