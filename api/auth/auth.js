const { login, register } = require('./auth.ctrl');
const { saveSession, success } = require('../../helpers/api_helper');

module.exports = (router) => {

    router.put('/login', login, saveSession, success);
    router.post('/register', register, saveSession, success);
    
};