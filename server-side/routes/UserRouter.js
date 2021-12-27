const express = require("express");
const multer = require("multer");
const upload = multer({dest: `./uploads`})
const {create, login, changeImg} = require("../controllers/User")

const router = express.Router();

router.post("/addUser",create);
router.post("/loginUser",login);
router.post("/changePhoto", upload.single("img"), changeImg)

module.exports = router;