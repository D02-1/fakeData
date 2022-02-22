//Hier importiere ich recordModel
const Record = require('../models/Record');

// POST mit mongoose
const postRecord = (req, res) => {

    const { title, artist, year, cover, price } = req.body;

    const newRecord = new Record({
        title,
        artist,
        year,
        cover,
        price
    });

    // mit .save() speichere ich es in der datenbank 
    newRecord.save((err, record) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }
        // wenn erfolgreich, dann...
        return res.status(200).json({ success: true, data: record });
    });
};

// GET mit mongoose
const getRecords = (req, res) => {

    // hier suche ich alle records
    Record.find({}, (err, records) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }
        // wenn erfolgreich, dann...
        return res.status(200).json({ success: true, data: records });
    });
};

// GET-ID mit mongoose
const getRecordId = (req, res) => {
    const { id } = req.params;

    Record.find({ _id: id }, (err, records) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }

        return res.status(200).json({ success: true, data: records[0] });
    });
};

// PUT-ID mit mongoose
const updateRecord = (req, res) => {
    const { id } = req.params;

    Record.findOne({ _id: id }, (err, record) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        }
        // zuerst hole ich die daten von dem record und dann ERSETZE ich sie 
        record.title = req.body.title || record.title;
        record.artist = req.body.artist || record.artist;
        record.year = req.body.year || record.year;
        record.cover = req.body.cover || record.cover;
        record.price = req.body.price || record.price;

        record.save((err, updatedRecord) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
            }

            return res.status(200).json({ success: true, newData: req.body, data: updatedRecord });
        });
    });
};

// DELETE-ID mit mongoose
// in diesem fall mit .then() und .catch()
const deleteRecord = (req, res) => {

    const { id } = req.params;

    Record.deleteOne({ _id: id })
        .then(() => {
            return res.status(200).json({ success: true, message: "Record mit der id " + id + " wurde gelöscht." });
        })
        .catch(() => {
            return res.status(400).json({ success: false, message: "Etwas ist schief gelaufen!" });
        });
};

module.exports = { getRecords, postRecord, getRecordId, updateRecord, deleteRecord };
