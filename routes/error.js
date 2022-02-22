const express = require('express');
const { throwErr } = require('../controllers/error');
const router = express.Router();

router.route("/")
    .all(throwErr)

module.exports = router;