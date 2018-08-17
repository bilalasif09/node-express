const UserModel = require('../../model/user');
const ApiHelper = require('../../api/api_helper');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    res.render('login', {
        data: '',
        is_error: false,
        isLoggedIn: false,
        body: {}
    });
};
exports.loginPost = async (req, res) => {
    try {
        const response = await UserModel.findOne({ email: req.body.email });
        if (response) {
            if (bcrypt.compareSync(req.body.password, response.password)) {
                const token = ApiHelper.createAuthToken(response._id);
                req.session.token = token;
                res.redirect('logincomplete');
            }
            else {
                res.render('login', {
                    data: '',
                    is_error: true,
                    errorMessage: 'Incorrect Password!',
                    isLoggedIn: false,
                    body: req.body
                });
            } 
            
        }
        else {
            res.render('login', {
                data: '',
                is_error: true,
                errorMessage: 'User not found!',
                isLoggedIn: false,
                body: req.body
            });
        };
    }
    catch(err) {
        res.render('login', {
            data: err,
            is_error: true,
            errorMessage: 'Something went wrong. Try again!',
            isLoggedIn: false,
            body: req.body
        });
    };
};
exports.index = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('home', {
        data: 'Home',
        isLoggedIn: isLoggedIn
    });
};
exports.featured = (req, res) => {
    console.log("Token", req.session.token);
    const isLoggedIn = req.session.token ? true : false;
    res.render('featured', {
        data: 'Featured',
        isLoggedIn: isLoggedIn
    });
};
exports.blogs = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('blogs', {
        data: 'Blogs',
        isLoggedIn: isLoggedIn
    });
};
exports.search = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('search', {
        data: 'Search',
        isLoggedIn: isLoggedIn
    });
};
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.render('logout');
    });
};
exports.register = (req, res) => {
    res.render('register', {
        data: '',
        is_error: false,
        isLoggedIn: false,
        body: {}
    });
};
exports.registerPost = async (req, res) => {
    const hashedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 8) : req.body.password;
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const response = await newUser.save();
        const token = ApiHelper.createAuthToken(response._id);
        req.session.token = token;
        res.redirect('logincomplete');
    }
    catch(err) {
        console.log("err-->",err)
        res.render('register', {
            data: err,
            is_error: true,
            isLoggedIn: false,
            body: req.body
        });
    };
    
};
exports.loginComplete = (req, res) => {
    res.render('logincomplete', {
        isLoggedIn: true
    });
}; 