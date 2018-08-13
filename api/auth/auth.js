const authController = require('./auth.ctrl');
const ApiHelper = require('../api_helper');

module.exports = (router) => {

    router.put('/login', authController.login, ApiHelper.success);
    router.post('/register', authController.register, ApiHelper.success);
    
};