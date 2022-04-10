const express = require("express");
const { getUserOrders, deleteOrder, createNewOrder } = require("../services/Order");


const router = express.Router();

// get all user orders
router.get(`/:userId`,getUserOrders)

//delete order
router.delete(`/:id`, deleteOrder)

//add order
router.post(`/`, createNewOrder)



module.exports = router;