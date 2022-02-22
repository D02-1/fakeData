const Order = require('../models/Order');

// POST mit mongoose
const postOrder = (req, res) => {

    const { productId, quantity } = req.body;

    const newOrder = new Order({
        productId,
        quantity
    });

    // hier wird der post request in die datenbank gespeichert
    newOrder.save((err, order) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gegangen!" });
        }
        return res.status(200).json({ success: true, data: order });
    });
};

// GET mit mongoose
const getOrders = (req, res) => {

    Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }
        return res.status(200).json({ success: true, data: orders });
    })
};

// GET-ID mit mongoose
const getOrderById = (req, res) => {
    const { id } = req.params;

    Order.find({ _id: id }, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }
        return res.status(200).json({ success: true, data: orders[0] });
    });
};

// PUT-ID mit mongoose
const updateOrderById = (req, res) => {
    const { id } = req.params;

    Order.findOne({ _id: id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }
        order.productId = req.body.productId || order.productId;
        order.quantity = req.body.quantity || order.quantity;

        order.save((err, updatedOrder) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
            }
            return res.status(200).json({ success: true, newData: req.body, data: updatedOrder });
        });
    });
};

// DELETE-ID mit mongoose
const deleteOrderById = (req, res) => {
    const { id } = req.params;

    Order.deleteOne({ _id: id })
        .then(() => {
            return res.status(200).json({ success: true, message: "Order mit der id " + id + " wurde gelöscht!" });
        })
        .catch(() => {
            return res.status(400).json({ success: false, message: "Etwas ist schief gegangen!" });
        });
};

module.exports = { getOrders, postOrder, getOrderById, updateOrderById, deleteOrderById };

