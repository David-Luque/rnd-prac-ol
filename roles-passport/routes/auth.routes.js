const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('signup', (req, res, next)=>{
    res.render('auth/signup')
});

router.post('signup', (req, res, next)=>{
    const {username, password} = req.body;

    if(username === '' || password === ''){
        res.send({ message: 'Indicate username and password' })
    };

    User.findOne({ username })
    .then(user => {
        if(user !== null) {
            res.send({ message: 'The username already exists' })
            return;
        }
        
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass
        })

        newUser.save(err => {
            if(err){
                res.send({ message: 'Something went wrong' })
            } else {
                res.send({ message: 'User created successfully' })
            }
        });
    })
    .catch(err => {
        next(err)
    })
});

router.get('login', (req, res, next)=>{
    res.render('auth/login', { message: req.flash("error") });
});

router.post('login', passport.authenticate('local', {
    successRedirect: "/", 
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));

router.get('private-page', ensureLogin.ensureLoggedIn(), (req, res)=>{
    res.render("private");
});

router.get('logout', (req, res)=>{
    req.logout();
    res.send({ message: "logout successfully" })
});


module.exports = router;
