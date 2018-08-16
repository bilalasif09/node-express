const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require(path.join(__dirname, 'routes'));
const router = express.Router();
const port = 3001;

routes(router);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Front end routes

app.get('/', (req, res) => {
    res.render('home', {
        data: 'Home'
    });
});

app.get('/featured', (req, res) => {
    res.render('featured', {
        data: 'Featured'
    });
});

app.get('/blogs', (req, res) => {
    res.render('blogs', {
        data: 'Blogs'
    });
});

app.get('/search', (req, res) => {
    console.log("Search", req.query.q);
    res.render('search', {
        data: 'Search'
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        data: 'Login'
    });
});
const UserModel = require('./model/user');
const ApiHelper = require('./api/api_helper');
const bcrypt = require('bcryptjs');

app.post('/register', async (req, res) => {
    const hashedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 8) : req.body.password;
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const response = await newUser.save();
        const token = ApiHelper.createAuthToken(response._id);
        res.render('logincomplete', {
            data: token
        });
    }
    catch(err) {
        console.log("err-->",err)
        res.render('register', {
            data: err,
            is_error: true
        });
    };
    
});

app.get('/register', (req, res) => {
    res.render('register', {
        data: '',
        is_error: false
    });
});

app.use('/api', router);
// router.use((response, req, res, next) => {
//     res.status(200).send({ auth: true, response: response, message: 'Success' });
// });

app.listen(port);
