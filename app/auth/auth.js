const authController = require('./auth.ctrl');

module.exports = (router) => {
    
    router.get('/login', authController.login);
    router.post('/login', authController.loginPost);
    router.get('/logout', authController.logout);
    router.get('/sign-up', authController.register);
    router.post('/sign-up', authController.registerPost);
    router.get('/logincomplete', authController.loginComplete);

};