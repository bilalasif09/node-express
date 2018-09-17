const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
let session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require(path.join(__dirname, 'routes'));
const appRoutes = require(path.join(__dirname, 'app_routes'));
const router = express.Router();
const port = 3001;

routes(router);
appRoutes(router);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({ 
        resave: false,
        saveUninitialized: false,
        secret: 'dev secret', 
        cookie: {}
    })
);

//Api routes
app.use('/api', router);

//Front end routes
app.use('/', router);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/assets'));

app.listen(port);
