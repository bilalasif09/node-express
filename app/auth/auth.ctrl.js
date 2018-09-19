exports.login = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;   
    isLoggedIn ? res.redirect('/') : res.render('login', {
        isLoggedIn: isLoggedIn
    });
};
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.render('logout', {
            error: err
        });
        res.redirect('/');
    });
};
exports.register = (req, res) => {
    console.log("register token", req.session.token);
    const isLoggedIn = req.session.token ? true : false;
    isLoggedIn ? res.redirect('/') : res.render('sign-up', {
        isLoggedIn: isLoggedIn
    });
};