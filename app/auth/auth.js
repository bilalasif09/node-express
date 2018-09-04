const { login, loginPost, logout, register, registerPost, loginComplete } = require('./auth.ctrl');

module.exports = (router) => {
    
    router.route('/login')
    .get(login)
    .post(loginPost);
    router.get('/logout', logout);
    router.route('/sign-up')
    .get(register)
    .post(registerPost);
    router.get('/logincomplete', loginComplete);

};