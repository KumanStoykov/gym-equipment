const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const databaseInit = require('./config/database');
const expressInit = require('./config/express');
const config = require('./config');

const app = express();

expressInit(app);

cloudinary.config(config.CLOUDINARY);

const formats = ['.js', '.css', '.ico', '.jpg', '.png'];

databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        console.log('--->Database is running<---');

        app.get('*',(req, res) => {
            if(formats.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                res.sendFile(path.join(`public/${req.url}`));
            } else {
                res.sendFile(path.join(__dirname, '..', 'dist', 'gym-equipment', 'index.html'));
            }
        })

        app.listen(3000, () => console.log('App listen in port 3000'));

    })
    .catch(err => console.log('--->Database init is failed!<---', err));
