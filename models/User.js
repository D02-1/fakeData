const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true }
}, { timestamps: true })

    // gibt mir direkt nach dem speichern eine nachricht
    .post('save', (doc) => {
        console.log("User ist gespeichert", doc);
    });

// das model für die users - Name des Models - User / nach welchem Schema erstellt - userSchema / wie heißt die Collection in der DB - users
const userModel = new model('User', userSchema, 'users');

module.exports = userModel;