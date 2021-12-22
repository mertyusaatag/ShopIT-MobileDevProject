const express = require("express");
const {create, getAll, getOneByID, deleteOne} = require("../controllers/Product");

const router = express.Router();

router.post("/addProduct", create);
router.get("/getAllProducts", getAll);
router.get("/getProduct/:id", getOneByID);
router.delete("/deleteProduct/:id", deleteOne);

module.exports = router;