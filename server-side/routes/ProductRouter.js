const express = require("express");
const multer = require("multer");
const {getProductsByCategory,create, getAll, getOneByID, deleteOne, addImages, deleteAll, clearImages, update} = require("../controllers/Product");
const upload = multer({
        dest: `./uploads/products`,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format accepted'));
            }
        }})
const router = express.Router();

router.post("/addProduct", create);
router.get("/getAllProducts", getAll);
router.get("/getProduct/:id", getOneByID);
router.delete("/deleteProduct/:id", deleteOne);
router.delete("/clearImages/:id", clearImages);
router.put("/addImages",upload.array("img"), addImages)
router.delete("/deleteAll", deleteAll)
router.put("/update", update)
router.get("/productsByCategory/:name",getProductsByCategory)

module.exports = router;