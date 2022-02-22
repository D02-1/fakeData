const { Schema, model } = require('mongoose');

// das schema (vorlage) für einen record
const recordSchema = new Schema({
    title: String,
    artist: String,
    year: Number,
    cover: String,
    price: Number
}, { timestamps: true })   // zeigt (createdAt) und (updatedAt) zeit an

    // gibt mir direkt nach dem speichern eine nachricht
    .post('save', (doc) => {
        console.log("Record ist gespeichert", doc);
    });


// das model für die records
// model name,    shema,    kollektion
const recordModel = new model('Record', recordSchema, 'records');

module.exports = recordModel; 