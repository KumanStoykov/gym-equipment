const express = require('express');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const databaseInit = require('./config/database');
const expressInit = require('./config/express');
const config = require('./config');

const app = express();

expressInit(app);

cloudinary.config(config.CLOUDINARY);

databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        console.log('--->Database is running<---');

        app.listen(3000, () => console.log('App listen in port 3000'));

    })
    .catch(err => console.log('--->Database init is failed!<---', err));
