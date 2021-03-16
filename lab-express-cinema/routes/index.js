const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index')
});

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(data => {
        console.log('successfully find data');
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    })
})

router.get('/movie/:id', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId)
    .then(data => {
        console.log('film successfully find!')
        res.send(data)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router;
