//TODO: test last new routes


require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const flash = require('connect-flash');
const User = require('./models/User.model');

mongoose.connect('mongodb://localhost/passport-roles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err));


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user)=>{
    if(err){ return cb(err) };
    cb(null, user);
  });
});
passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next)=>{
  User.findOne({ username }, (err, user)=>{
    if(err){ return next(err) };
    if(!user){
      return next(null, false, { message: "Incorrect username" })
    };
    if(!bcrypt.compareSync(password, user.password)){
      return next(null, false, { message: "Incorrect password" })
    };
    return next(null, user);
  })
}));

passport.use(new FacebookStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback'
  }, 
  function(accessToken, refreshToken, profile, done){
    console.log("Facebook account details ", profile);
    User.findOne({ facebookId: profile.id })
    .then(user => {
      if(user){
        done(null, user);
        return;
      }
      User.create({ facebookId: profile.id })
      .then(newUser => {
        done(null, newUser);
      })
      .catch(err => done(err))
    })
    .catch(err => done(err))
  }
));


app.use(passport.initialize());
app.use(passport.session());


// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


const index = require('./routes/index.routes');
app.use('/', index);
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);
const courseRoutes = require('./routes/courses.routes');
app.use('/', courseRoutes);

module.exports = app;
