const { login, loginPost, logout, register, registerPost, loginComplete } = require('./auth.ctrl');

module.exports = (router) => {
    
    router.get('/login', login);
    router.get('/logout', logout);
    router.get('/sign-up', register);

};