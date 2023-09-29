const express = require('express');
const router = express.Router();

const User = require('../models/tables/user');


//creating routes


//route forms user
router.get('/user/add', (req, res) => {
    res.render('user/registerUser');
});


//creating a new user
router.post('/user/new', (req, res) => {
    User.create({
        tb_user_name: req.body.userName,
        tb_user_email: req.body.userEmail,
        tb_user_password: req.body.userPassword
    }).then( () => {
        res.redirect('/routeUser/users');
    }).catch( (error) => {
        res.send('Find onde error: ' +error);
    });
}); 


//route find some user
router.get('/users', (req, res) => {
    User.findAll().then((users) => {
        users = users.map((user => {
            return user.toJSON();
        }));
        res.render('user/listUsers', { users: users });
    });
});


//route update data to the user
router.get('/editUser/:id', (req, res) => {
    User.findAll( {
        where: {'tb_user_id': req.params.id}
    }).then((users) => {
        users = users.map((user) => {
            return user.toJSON()
        });
        res.render('user/editUsers', {users: users})
    });
}); 


//update data of user 
router.post('/user/update', (req, res) => {
    User.update({
        tb_user_name: req.body.userName,
        tb_user_email: req.body.userEmail,
        tb_user_password: req.body.userPassword
    }, { 
        where: { tb_user_id : req.body.userId}
    }).then( () => {
        res.redirect('/routeUser/users')
    }).catch(( error) => {
        res.send('Find one error: ' +error)
    }) 
});


//destroy user
router.get('/deleteUser/:id', (req, res) => {
    User.destroy({
        where: { 'tb_user_id': req.params.id}
    }).then( () => {
        res.redirect('/routeUser/users')
    }).catch( (error) => {
        res.render('Not user exits, found the error: '+error)
    });
}); 

module.exports= router;

