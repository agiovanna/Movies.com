const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Importe a estratégia LocalStrategy
const bcrypt = require('bcryptjs');

const User = require('../models/tables/user');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
    }, async (email, senha, done) => {
        try {
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return done(null, false, { message: 'Credenciais inválidas' });
            }

            if (!bcrypt.compareSync(senha, user.senha)) {
                return done(null, false, { message: 'Credenciais inválidas' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Rota de login
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/routeDirector',
        failureRedirect: '/routeLogin',
        failureFlash: true
    }));

    return router;
};