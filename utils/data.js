const mongoose = require('mongoose');
const User = require('../models/User');

// Hier benutze ich das module chance, um zufallsdaten zu generieren
const Chance = require('chance');
const chance = new Chance();

const userData = () => {
    // const databaseURL = `${process.env.DB_URL}/${process.env.DB_NAME}`;
    const db = mongoose.connect("mongodb://localhost:27017/recordshop")
        .then(() => console.log("db connected"))
        .catch((err) => console.error("not connected", err));

    const users = [];

    for (index = 0; index < 10; index++) {

        const generateUser = new User({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email(),
            password: chance.hash()
        });
        users.push(generateUser);
    }
    // die zufälligen User wurden erstellt
    console.log(users);
    // mit insertMany können wir Dokumente User in der collection users auf der db hinterlegen
    User.insertMany(users, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("saved in db", data);
        }
    })
};
userData()
// in der package.json ein Startscript nur für diese Datei erstellt data.js ( "fake":"node ./utils/data.js")
// damit können wir diese Datei einmalig starten und die Datenbank mit Fakedaten befüllen
// die Funktion ruft sich selber auf, innerhalb der Funktion connecten wir zur Datenbank, erstellen die Fakedaten mit chance
// mit insertMany fügen wir das Array mit den neuen Fakeusern als Dokumente in die Collection users ein.
module.exports = userData;