require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const records = require('./../routes/records');
const users = require('./../routes/users');
const orders = require('./../routes/orders');
const error = require('./../routes/error');

// Hier hole ich mongoose
const mongoose = require('mongoose');
// Hole mir die url von der datenbank und die datenbank
const databaseURL = `${process.env.DB_URL}/${process.env.DB_NAME}`;
// verbinde mongoose mit der datenbank 
const db = mongoose.connect(databaseURL);

const { security } = require('./../middleware/security');

const app = express();
const port = process.env.PORT || 3000;

//express soll als middleware den body-parser nutzen, um die daten der url zu dekodieren
app.use(bodyParser.urlencoded({ extended: true }));
// damit express auch json auslesen und dekodieren kann, nutzen wir die middleware .json(); vom body-parser
app.use(bodyParser.json());

// CORS Middleware prüft, ob die Anfrage stattfinden darf, wenn ja geht es weiter zu den routen
app.use(security);
// die routen zu den inhalten
app.use("/records", records);
app.use("/users", users);
app.use("/orders", orders);
app.use("*", error);





// der listener
app.listen(port, () => {
    console.log(`Server läuft auf port ${port}`);
});
