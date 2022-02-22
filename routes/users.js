const express = require('express')
const router = express.Router();

// Modul basic-auth zu authentifizierung des users
const basicAuth = require('express-basic-auth');
const { getUsers, postUser, getUserById, updateUserById, deleteUserById } = require('../controllers/users');

router.use(basicAuth({
    users: { 'fariha': 'nurichkommerein' }
}))

/*
    routen sind:
    GET         /users
    POST        /users 
    GET         /users/:id
    PUT         /users/:id
    DELETE      /users/:id   
*/

router.route("/")
    // GET
    .get(getUsers)
    //POST
    .post(postUser)

router.route("/:id")
    // GET-ID
    .get(getUserById)
    // PUT-ID
    .put(updateUserById)
    // DELETE-ID
    .delete(deleteUserById)

module.exports = router;

