const express = require('express');
const router = express.Router();

const Director = require('../models/tables/director');


//creating routes

//route forms user
router.get('/director/add', (req, res) => {
    res.render('director/registerDirector');
});


//creating a new user
router.post('/director/new', (req, res) => {
    Director.create({
        tb_director_name: req.body.directorName,
    }).then( () => {
        res.redirect('/routeDirector/directors');
    }).catch( (error) => {
        res.send('Find onde error: ' +error);
    });
}); 


//route find some user
router.get('/directors', (req, res) => {
    Director.findAll().then((directors) => {
        directors = directors.map((director => {
            return director.toJSON();
        }));
        res.render('director/listDirector', { directors: directors });
    });
});


//route update data to the user
router.get('/editDirector/:id', (req, res) => {
    Director.findAll( {
        where: {'tb_director_id': req.params.id}
    }).then((directors) => {
        directors = directors.map((director) => {
            return director.toJSON()
        });
        res.render('director/editDirector', { directors: directors })
    });
}); 


//update data of user 
router.post('/director/update', (req, res) => {
    Director.update({
        tb_director_name: req.body.directorName,
    }, { 
        where: { tb_director_id : req.body.directorId}
    }).then( () => {
        res.redirect('/routeDirector/directors')
    }).catch(( error) => {
        res.send('Find one error: ' +error)
    }) 
});


//destroy user
router.get('/deleteDirector/:id', (req, res) => {
    Director.destroy({
        where: { 'tb_director_id': req.params.id}
    }).then( () => {
        res.redirect('/routeDirector/directors')
    }).catch( (error) => {
        res.render('Not director exit, found the error: '+error)
    });
}); 

module.exports= router;

