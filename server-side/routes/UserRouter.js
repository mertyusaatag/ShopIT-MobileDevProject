const express = require("express");
const multer = require("multer");
const upload = multer({dest: `./uploads/profiles`})

const {create, login, changeImg, changePassword, getAllUsers, deleteUserById, deleteAll, getUserByEmail} = require("../controllers/User")


const router = express.Router();

router.post("/addUser",create);
router.post("/loginUser",login);
router.post("/changePhoto", upload.single("img"), changeImg)

router.get("/getUserByEmail/:email", getUserByEmail)
router.put("/changePassword", changePassword)
router.get("/getAll", getAllUsers)
router.delete("/delete/:id", deleteUserById)
router.delete("/deleteAll", deleteAll)


module.exports = router;