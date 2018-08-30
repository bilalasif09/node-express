const UserModel = require('../../model/user');
const JobModel = require('../../model/job');
const ApiHelper = require('../../api/api_helper');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { dateFormat, jsonFormatUserName } = require('../app_helper');

exports.login = (req, res) => {
    res.render('login', {
        data: '',
        is_error: false,
        isLoggedIn: false,
        body: {}
    });
};
exports.loginPost = async (req, res) => {
    let dataHash = {
        data: '',
        is_error: true,
        errorMessage: 'Incorrect Password!',
        isLoggedIn: false,
        body: req.body
    };
    try {
        const response = await UserModel.findOne({ email: req.body.email });
        if (response) {
            if (bcrypt.compareSync(req.body.password, response.password)) {
                const token = ApiHelper.createAuthToken(response._id);
                req.session.token = token;
                res.redirect('logincomplete');
            }
            else {
                res.render('login', dataHash);
            };
        }
        else {
            dataHash.errorMessage = 'User not found!';
            res.render('login', dataHash);
        };
    }
    catch(err) {
        dataHash.errorMessage = 'Something went wrong. Try again!';
        dataHash.data = err;
        res.render('login', dataHash);
    };
};
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.render('logout');
    });
};
exports.register = (req, res) => {
    res.render('sign-up', {
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
        const errorMessage = err.code ? 'Email already exist' : 'Password is required';
        res.render('sign-up', {
            data: '',
            is_error: true,
            errorMessage: errorMessage,
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