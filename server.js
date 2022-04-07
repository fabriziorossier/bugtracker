const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const secretKey = require('./secretKey');
const { obtainBugsGeneral, obtainBugsByUser, validateUser } = require('./SQLqueries');
const port = process.env.PORT || 3000;
const minutes = 1;
let tokenUser = '';
let user = '';

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
        bugs: await obtainBugsGeneral(),
    });
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Authenticate user
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    user = await validateUser(email, password);
    if (user && user.length > 0){
        tokenUser = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (minutes * 60),
                data: user,
            },
            secretKey
        );
        if (user[0].rol === 1){
            res.redirect(`/admin?token=${tokenUser}`);
        }
        if (user[0].rol === 2){
            res.redirect(`/user?token=${tokenUser}`);
        }
    }
    else {
        res.render('incorrectUserOrPassword');
    }
});

// Verify authenticity of the token for normal user
app.get('/user', async (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, async (err, decodedData) => {
        if(err){
            res.render('invalidToken');
        }
        else {
            const userId = decodedData.data[0].id_usuario;
            const bugsByUser = await obtainBugsByUser(userId);
            res.render('user', {
                user: decodedData.data,
                bugsByUser: bugsByUser,
            });
        }
    });
});

// Verify authenticity of the token for admin user
app.get('/admin', async (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, async (err, decodedData) => {
        if(err){
            res.render('invalidToken');
        }
        else {
            res.render('admin');
        }
    });
});