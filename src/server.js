const express = require('express');
const app = express();

const passport = require('passport'); 
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const routeUser = require('./routes/routeUser');
const routeDirector = require('./routes/routeDirector');
const routeMovie = require('./routes/routeMovie');
const routeLogin = require('./routes/routeLogin');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/routeUser', routeUser);
app.use('/routeDirector', routeDirector);
app.use('/routeMovie', routeMovie);
app.use('/routeLogin', routeLogin);

app.use(passport.initialize()); 

app.use('/public/', express.static('public/css/bootstrap'));
app.use('/public', express.static('/public/css/styles.css'));

//SERVER

const port = 8081;

app.listen(port, () => {
    console.log('Server running!')
});

