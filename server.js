const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const secretKey = require('./secretKey');
const { obtainBugs } = require('./SQLqueries');
const port = process.env.PORT || 3000;
const minutos = 1;
let tokenUser = '';
let tokenAdmin = '';

// Setup - App
app.listen(port, console.log(`Listening on port ${port}`));

// Setup - Assets
app.use('/assets', express.static(__dirname + '/assets'));

// Setup - jQuery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// Setup - Bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrapJS', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// Setup - express-handlebars
app.engine('handlebars',
    exphbs.engine({
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/components',
        helpers: {
            increment: function(value, options){ return parseInt(value) +1},
        }
    })
);
app.set('view engine', 'handlebars');

// Setup - body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Index page
app.get('/', async (req, res) => {
    res.render('home', {
        bugs: await obtainBugs(),
    });
});