const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const flash = require('connect-flash');

router.get('/signup', (req, res, next)=>{
    res.render('auth/signup')
});

router.post('/signup', (req, res, next)=>{
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

router.get('/login', (req, res, next)=>{
    res.render('auth/login', { message: req.flash("error") });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: "/", 
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/private-page',
    failureRedirect: '/'
}));

router.get('/private-page', ensureAuthenticated, (req, res)=>{
    res.send({ message: "logged users page"});
});

router.get('/admin-page', checkRole('BOSS'), (req,res)=>{
    res.send({ message: "admin page"});
})

router.get('/users', ensureAuthenticated, (req, res) => {
    User.find()
    .then(data => res.send(data))
    .catch(err => res.send(err))
});

router.get('/users/:id', ensureAuthenticated, (req, res) => {
    const user_id = req.params.id;
    User.findById(user_id)
    .then(data => res.send(data))
    .catch(err => res.send(err))
});

router.post('/edit-profile', ensureAuthenticated, (req, res)=>{
    const user_id = req.user.id;
    const {
        username, 
        password, 
        name, 
        profileImg, 
        description, 
        facebookId, 
        role
    } = req.body;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findByIdAndUpdate(user_id, {
        username, 
        password: hashPass, 
        name,
        profileImg, 
        description, 
        facebookId, 
        role
    })
    .then(()=>{res.send({ message: 'Profile updated successfully' })})
    .catch(err => res.send(err))
})


router.get('/logout', (req, res)=>{
    req.logout();
    res.send({ message: "logout successfully" })
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.send({ messagge: "you must be logged to access this page" });
    }
};

 function checkRole(role){
    return function(req, res, next){
        if(req.isAuthenticated() && req.user.role === role) {
            return next(); 
        } else {
            res.send({ message: "restricted access page to admins"});
        }
    }
}

//exports.checkTheRole = checkRole;
module.exports = router;