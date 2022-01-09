const express = require("express");
const multer = require("multer");
const upload = multer({dest: `./uploads/profiles`})
const {create, login, changeImg, changePassword, getUserByEmail} = require("../controllers/User")

const router = express.Router();

router.post("/addUser",create);
router.post("/loginUser",login);
router.post("/changePhoto", upload.single("img"), changeImg)
router.put("/changePassword", changePassword);
router.get("/getUserByEmail/:email",getUserByEmail)

module.exports = router;