const express = require('express');


const databaseInit = require('./config/database');
const expressInit = require('./config/express');
const config = require('./config');

const app = express();

expressInit(app);

databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        console.log('--->Database is running<---');

        app.listen(3000, () => console.log('App listen in port 3000'));

    })
    .catch(err => console.log('--->Database init is failed!<---', err));
