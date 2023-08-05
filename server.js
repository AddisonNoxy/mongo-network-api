const express = require('express');
const { MongoClient } = require('mongodb');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}!`)
    })
});

// const mongoString = 'mongodb://127.0.0.1:27017';

// const client = new MongoClient(mongoString);

// let db;

// const dbName = 'thoughtsDB';

// client.connect()
//     .then(() => {
//         console.log("Connected to MongoDB!");
//         db = client.db(dbName);

//         app.listen(PORT, () => {
//             console.log(`App listening on ${PORT}.`);
//         })
//     }).catch((err) => {
//         console.error(err);
//     })