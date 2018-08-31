const { login, register } = require('./auth.ctrl');
const { success } = require('../api_helper');

module.exports = (router) => {

    router.put('/login', login, success);
    router.post('/register', register, success);
    
};