require('dotenv').config();

const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
const app = express();

require('./configs/passport.config');
require('./configs/database.config');

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


app.locals.title = 'Developed by David';

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const index = require('./routes/index');
app.use('/', index);
app.use('/api', require('./routes/auth.routes'));


module.exports = app;
