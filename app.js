const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
    mongoose.connect('mongodb://localhost/voyager',
        { useNewUrlParser: true, useUnifiedTopology: true });
}


const app = express();
app.use(bodyParser.json());

require("./routes/route")(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});


module.exports = app;