const express = require('express');
const { getOrders, postOrder, getOrderById, updateOrderById, deleteOrderById } = require('../controllers/orders');
const router = express.Router();

/*
    routen sind:
    GET         /orders
    POST        /orders 
    GET         /orders/:id
    PUT         /orders/:id
    DELETE      /orders/:id   
*/

router.route("/")
    // GET
    .get(getOrders)
    //POST
    .post(postOrder)

router.route("/:id")
    // GET-ID
    .get(getOrderById)
    // PUT-ID
    .put(updateOrderById)
    // DELETE-ID
    .delete(deleteOrderById)

module.exports = router;

