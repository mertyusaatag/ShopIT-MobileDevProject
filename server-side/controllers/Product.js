const { addProduct, listAllProducts, findProductByID, deleteProductByID, findProductByName, updateProduct } = require("../services/Product");
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
    try {
        allProducts = await listAllProducts()
        res.status(httpStatus.OK).send(allProducts)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

const getOneByID = async (req, res) => {
    try {
        product = await findProductByID(req.params.id)
        res.status(httpStatus.OK).send(product)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send(error.message)
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
                res.status(httpStatus.OK).send("Product deleted")
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

module.exports = {
    create,
    getAll,
    getOneByID,
    deleteOne,
    addImages
}