const express = require('express');
// express.Router() wird benutzt
const router = express.Router();
const { getRecords, postRecord, getRecordId, updateRecord, deleteRecord } = require('../controllers/records');

/*
    routen sind:
    GET         /records ----haben wir bereits
    POST        /records ----haben wir bereits
    GET         /records/:id
    PUT         /records/:id
    DELETE      /records/:id
    
*/

router.route("/")
    // GET
    .get(getRecords)
    //POST
    .post(postRecord)

router.route("/:id")
    // GET-ID
    .get(getRecordId)
    // PUT-ID
    .put(updateRecord)
    // DELETE-ID
    .delete(deleteRecord)

module.exports = router;