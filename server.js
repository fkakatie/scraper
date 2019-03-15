const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cheerio = require('cheerio');
const axios = require('axios');
const db = require('./models');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/djScraper";

mongoose.connect(MONGODB_URI);

app.get('/', function(req, res) {
    axios.get('').then(function(response) {

        var $ = cheerio.load(response.data);

        $('').each(function(i, element) {
            var result = {};
        })

        // res.send();
    })

    res.render('index');

});

app.listen(PORT, function() {
    console.log('\nAPP RUNNING ON');
    console.log('http://localhost:' + PORT + '\n');
})