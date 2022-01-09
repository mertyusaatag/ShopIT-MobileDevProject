const express = require("express");
const { userOrders,addOrder } = require("../controllers/Order")


const router = express.Router();

// get all user orders
router.get(`/userOrders/:userId`, userOrders)

//add order
router.post(`/addOrder`, addOrder)



module.exports = router;