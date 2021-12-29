const express = require("express");
const multer = require("multer");
const {create, getAll, getOneByID, deleteOne, addImages} = require("../controllers/Product");
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
router.put("/addImages",upload.array("img"), addImages)

module.exports = router;