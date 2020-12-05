const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

//DB config
const db = require('./config/keys').MongoURI;

//Forbind til mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err)); 

//Ejs
//app.use(expressLayouts);


//Bodyparser
app.use(bodyparser.json());


//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));


const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));