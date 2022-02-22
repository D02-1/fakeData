const User = require('../models/User');
//const generatedUser = require('./../utils/data');

// POST mit mongoose
const postUser = (req, res) => {

    // erstelle die keys die du im post request benutzt
    const { firstName, lastName, email, password } = req.body;

    //.. und füge sie dem user hinzu
    const newUser = new User({
        firstName,
        lastName,
        email,
        password
    });

    // in die datenbank speichern
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }

        return res.status(200).json({ success: true, data: user });
    });
};

// GET mit mongoose
const getUsers = (req, res) => {

    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }

        return res.status(200).json({ success: true, data: users });
    });
};

// GET-ID mit mongoose
const getUserById = (req, res) => {
    const { id } = req.params;

    User.find({ _id: id }, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }

        return res.status(200).json({ success: true, data: users[0] });
    });
};

// PUT-ID mit mongoose
const updateUserById = (req, res) => {
    const { id } = req.params;

    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        user.save((err, updatedUser) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
            }

            return res.status(200).json({ success: true, newData: req.body, data: updatedUser });
        });
    });
};

// DELETE-ID
const deleteUserById = (req, res) => {
    const { id } = req.params;

    /*
    User.deleteOne({ _id: id }, err => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }

        return res.status(200).json({ success: true, message: "Der User mit der id " + id + " wurde gelöscht!" });
    });
    */

    User.deleteOne({ _id: id })
        .then(() => {
            return res.status(200).json({ success: true, message: "Der User mit der id " + id + " wurde gelöscht!" });
        })
        .catch(() => {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        });
};

module.exports = { getUsers, postUser, getUserById, updateUserById, deleteUserById };