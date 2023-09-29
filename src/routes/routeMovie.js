const express = require('express');
const router = express.Router();
const app = express();


const Movie = require('../models/tables/movie');
const AgeGroup = require('../models/tables/ageGroup');
const Gender = require('../models/tables/gender');
const Director = require('../models/tables/director');

//settings img
app.use(express.urlencoded({ extended: true }));


//creating routes

//route forms user
router.get('/movie/add', (req, res) => {

    Gender.findAll().then((genders) => {
        AgeGroup.findAll().then((group) => {
            Director.findAll().then((director) => {
                var thegenders = JSON.parse(JSON.stringify(genders));
                var ageGroup = JSON.parse(JSON.stringify(group));
                var thedirectors = JSON.parse(JSON.stringify(director));
                res.render('movie/registerMovie', {
                    genders: thegenders,
                    group: ageGroup,
                    director: thedirectors
                });
            });
        });
    });
});


//creating a new user
router.post('/movie/new', function (req, res) {

    Movie.create({
        tb_movie_name: req.body.movieName,
        tb_movie_year: req.body.movieYear,
        tb_movie_summary: req.body.movieSummary,
        fk_gender: req.body.movieGender,
        fk_age_group: req.body.movieAgeGroup,
        fk_director: req.body.movieDirector,
    }).then(() => {
        res.redirect('/routeMovie/movies');
    }).catch((error) => {
        res.send('Find onde error: ' + error);
    });
});


//route find some user
router.get('/movies', (req, res) => {
    /*Movie.findAll().then((movies) => {
        movies = movies.map((movie => {
            return movie.toJSON();
        }));
        res.render('movie/listMovie', { movies: movies });
    }); */

    Movie.sequelize.query('select * from selectMovie', { model: Movie }).then(function (movies) {
        var themovies = JSON.parse(JSON.stringify(movies));
        res.render('movie/listMovie', { movies: themovies })
    });
});
//route update data to the user
router.get('/editMovie/:id', (req, res) => {
    Movie.findAll({ where: { 'tb_movie_id': req.params.id } }).then((movies) => {
        Gender.findAll().then((genders) => {
            AgeGroup.findAll().then((group) => {
                Director.findAll().then((director) => {
                    var themovies = JSON.parse(JSON.stringify(movies));
                    var thegenders = JSON.parse(JSON.stringify(genders));
                    var ageGroup = JSON.parse(JSON.stringify(group));
                    var thedirectors = JSON.parse(JSON.stringify(director));
                    res.render('movie/editMovie', {
                        movies: themovies,
                        genders: thegenders,
                        group: ageGroup,
                        director: thedirectors
                    });
                });
            });
        });
    });
});


//update data of user 
router.post('/movie/update', (req, res) => {

    Movie.update({
        tb_movie_name: req.body.movieName,
        tb_movie_year: req.body.movieYear,
        tb_movie_summary: req.body.movieSummary,
        fk_gender: req.body.movieGender,
        fk_age_group: req.body.movieAgeGroup,
        fk_director: req.body.movieDirector,
    }, {
        where: { tb_movie_id: req.body.movieId }
    }).then(() => {
        res.redirect('/routeMovie/movies')
    }).catch((error) => {
        res.send('Find one error: ' + error)
    })
});


//destroy user
router.get('/deleteMovie/:id', (req, res) => {
    Movie.destroy({
        where: { 'tb_movie_id': req.params.id }
    }).then(() => {
        res.redirect('/routeMovie/movies')
    }).catch((error) => {
        res.render('Not movie exit, found the error: ' + error)
    });
});

module.exports = router;
