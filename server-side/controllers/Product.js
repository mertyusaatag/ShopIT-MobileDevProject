const { getProductByCategory,addProduct, listAllProducts, findProductByID, deleteProductByID, findProductByName, updateProduct, deleteAllProducts } = require("../services/Product");
const httpStatus = require("http-status");
const { verifyToken } = require("../utils/helper");
const fs = require("fs");


const create = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel > process.env.ACCESS_LEVEL_GUEST) {
        if (auth.accessLevel > process.env.ACCESS_LEVEL_NORMAL_USER) {
            try {
                existingProduct = await findProductByName(req.body.name)
                if (existingProduct) {
                    return res
                        .status(httpStatus.FOUND)
                        .send({
                            message: "Product already exists"
                        });
                } else {
                    newProduct = await addProduct(req.body)
                    if(newProduc.quantity > 0){
                        newProduct.inStock = true
                    }else{
                        newProduct.inStock = false
                    }
                    res.status(httpStatus.CREATED).send(newProduct);
                }
            } catch (error) {
                res.status(httpStatus.BAD_REQUEST).send(error)
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

const getProductsByCategory= async (req,res) => 
{
    try {
        const products = await getProductByCategory(req.params);
        const productImgs = products.map(product => {
            let files = []
            product.img.map((img) => {
                file = fs.readFileSync(`./uploads/products/${img}`, `base64`)
                files.push(file)
            })
            product.img = files
            return product
        })
        res.status(httpStatus.CREATED).send(productImgs);
        
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

const addImages = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel > process.env.ACCESS_LEVEL_GUEST) {
        if (auth.accessLevel > process.env.ACCESS_LEVEL_NORMAL_USER) {
            try {
                product = await findProductByName(req.body.name)
                if (!product) {
                    req.files.map((file) => (
                        fs.unlinkSync(`./uploads/products/${file.filename}`)
                    ))
                    return res
                        .status(httpStatus.NOT_FOUND)
                        .send({
                            message:
                                "Product Not Found",
                        });
                } else {
                    if (!req.files) {
                        console.log("No files")
                        return res
                            .status(httpStatus.BAD_REQUEST)
                            .send({
                                message: "No file was selected to be uploaded"
                            })
                    } else {
                        let fileNames = []
                        req.files.map((file) => (
                            fileNames.push(file.filename)
                        ))
                        product.img = fileNames
                        const response = await updateProduct({ name: product.name }, product)
                        res.status(httpStatus.OK).send()
                    }
                }
            } catch (error) {
                res.status(httpStatus.BAD_REQUEST).send(error)
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

const getAll = async (req, res) => {
    products = await listAllProducts()
    if(!products){
        return res
        .status(httpStatus.NOT_FOUND)
        .send({
            message: "No products"
        })
    }else{
        const productImgs = products.map(product => {
            let files = []
            product.img.map((img) => {
                file = fs.readFileSync(`./uploads/products/${img}`, `base64`)
                files.push(file)
            })
            product.img = files
            return product
        })
        return res
            .status(httpStatus.OK)
            .send(productImgs)
    }

}

const getOneByID = async (req, res) => {
    product = await findProductByID(req.params.id)
    if (!product) {
        return res
            .status(httpStatus.NOT_FOUND)
            .send({
                message: "Product not found"
            })
    } else {
        const productImg = product.img.map((img) => {
            let files = []
            file = fs.readFileSync(`./uploads/products/${img}`, `base64`)
            files.push(file)
            return files
        })
        product.img = productImg
        return res
            .status(httpStatus.OK)
            .send(product)
    }
}
const deleteOne = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel > process.env.ACCESS_LEVEL_GUEST) {
        if (auth.accessLevel > process.env.ACCESS_LEVEL_NORMAL_USER) {
            try {
                product = await findProductByID(req.params.id)
                product.img.map((img) => {
                    fs.unlinkSync(`./uploads/products/${img}`)
                })
                await deleteProductByID(req.params.id)
                res.status(httpStatus.OK).send("Product removed")
            } catch (error) {
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

const deleteAll = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel < process.env.ACCESS_LEVEL_ADMIN) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({
                message:
                    "You don't have access to this feature.",
            });
    } else {
        fs.readdir(`./uploads/products`, (err, files) => {
            if (err) {
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .send("Something went wrong")
            }
            for (const file of files) {
                fs.unlinkSync(`./uploads/products/${file}`)
            }
        })
        await deleteAllProducts()
        return res
            .status(httpStatus.OK)
            .send("All products removed")
    }
}

const clearImages = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel < process.env.ACCESS_LEVEL_ADMIN) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({
                message:
                    "You don't have access to this feature.",
            });
    } else {
        product = await findProductByID(req.params.id)
        product.img.map((img) => {
            fs.unlinkSync(`./uploads/products/${img}`)
        })
        product.img = [];
        await updateProduct({ _id: req.params.id }, product)
        return res
            .status(httpStatus.OK)
            .send("Images cleared")
    }
}

const update = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel < process.env.ACCESS_LEVEL_ADMIN) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({
                message:
                    "You don't have access to this feature.",
            });
    } else {
        product = await findProductByID(req.body._id)
        product.name = req.body.name
        product.color = req.body.color
        product.categories = req.body.categories
        product.desc = req.body.desc
        product.price = req.body.price
        product.quantity = req.body.quantity
        if(product.quantity > 0){
            product.inStock = true
        }else{
            product.inStock = false
        }
        
        await updateProduct({ _id: req.body._id }, product)
        return res
            .status(httpStatus.OK)
            .send(`Product: ${product._id} updated`)
    }
}

module.exports = {
    create,
    getAll,
    getOneByID,
    deleteOne,
    addImages,
    deleteAll,
    clearImages,
    update,
    getProductsByCategory
}