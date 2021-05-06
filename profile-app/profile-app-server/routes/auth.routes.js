const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcryptjs")

const User = require("../models/user.model")


router.post('/auth/signup', (req, res, next) => {

    const { username, password, course, campus } = req.body;  

    if (!username || !password || !course || !campus) {
        res.status(400).json({ message: 'Empty fields' });
        return;
    }

    if (password.length < 5) {
        res.status(400).json({ message: 'Weak password' });
        return;
    }

    User.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "Username check error" });
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username already exist' });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass,
            course,
            campus
        });

        newUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Error saving user to database' });
                return;
            }

            req.login(newUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login error' });
                    return;
                };

                res.status(200).json(newUser);
            });
        });
    });
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session error' });
                return;
            }

            res.status(200).json(theUser);
        });
    })(req, res, next);
});



router.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});


router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});


module.exports = router