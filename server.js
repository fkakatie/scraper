const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cheerio = require('cheerio');
const axios = require('axios');
const db = require('./models');

var PORT = process.env.PORT || 3000;

var app = express();

var routes = express.Router();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/djScraper';

mongoose.connect(MONGODB_URI);

app.get('/', function(req, res) {

    var gq = 'https://www.gq.com';

    // GQ SEARCH
    axios.get(gq + '/search?q=%22dwayne+johnson%22').then(function(response) {

        var $ = cheerio.load(response.data);

        $('.title-card__container').each(function(i, element) {

            var result = {};

            result.headline = $(this).find('.title-card__hed').text();
            result.summary = $(this).find('.title-card__dek').text();
            result.link = gq + $(this).find('.title-card__hed-link').attr('href');
            result.image = $(this).find('source').attr('srcset').split(',')[0].split(' ')[0];
            result.author = $(this).find('.content-type-details__author').text().replace('By ', '');
            result.date = $(this).find('.content-type-details__pub-date').text();
            result.source = gq;

            db.Story.create(result)
                .then(function(dbStory) {
                    console.log(dbStory);
                })
                .catch(function(err) {
                    console.log(err);
                });

        });

    });

    res.redirect('/stories');

});

app.get('/stories', function(req, res) {

    db.Story.find({}).sort({ date: -1 })
    .then(function(dbStory) {
        res.render('index', { stories: dbStory })
    })
    .catch(function(err) {
        res.json(err);
    });

});

app.get('/stories/:id', function(req, res) {
    db.Story.findOne({ _id: req.params.id })
        .populate('comment')
        .then(function(dbStory) {
            res.json(dbStory);
        })
        .catch(function(err) {
            res.json(err);
        })
});

app.post('/stories/:id', function(req, res) {
    db.Comment.create(req.body)
        .then(function(dbComment) {
            return db.Story.findOneAndUpdate({ _id: req.params.id }, { note: dbComment._id }, {new: true });
        })
        .catch(function(err) {
            res.json(err);
        })
});

app.listen(PORT, function() {
    console.log('\nAPP RUNNING ON');
    console.log('http://localhost:' + PORT + '\n');
})