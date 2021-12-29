const express = require("express");
const multer = require("multer");
const upload = multer({dest: `./uploads/profiles`})
const {create, login, changeImg, changePassword} = require("../controllers/User")

const router = express.Router();

router.post("/addUser",create);
router.post("/loginUser",login);
router.post("/changePhoto", upload.single("img"), changeImg)
router.put("/changePassword", changePassword)

module.exports = router;