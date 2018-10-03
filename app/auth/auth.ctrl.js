const { checkTokenValidity } = require('../../helpers/api_helper');

exports.login = (req, res) => {
    const isLoggedIn = req.cookies.token && req.cookies.token !== 'undefined' && checkTokenValidity(req.cookies.token);   
    isLoggedIn ? res.redirect('/') : res.render('login', {
        isLoggedIn: isLoggedIn
    });
};
exports.logout = (req, res) => {
    // req.session.destroy((err) => {
    //     if (err) res.render('logout', {
    //         error: err
    //     });
    //     res.redirect('/');
    // });
    res.cookie('token');
    res.cookie('name');
    res.redirect('/');

};
exports.register = (req, res) => {
    const isLoggedIn = req.cookies.token && req.cookies.token !== 'undefined' && checkTokenValidity(req.cookies.token);
    isLoggedIn ? res.redirect('/') : res.render('sign-up', {
        isLoggedIn: isLoggedIn
    });
};