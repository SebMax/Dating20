const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

//EJS
app.set('view engine', 'ejs');

//DB config
const db = require('./config/keys').MongoURI;

//Forbind til mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err)); 

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

//Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
}));


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));