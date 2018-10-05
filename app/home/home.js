const { index, search, dashboard } = require('./home.ctrl');

module.exports = (router) => {

    router.get('/', index);
    router.get('/search', search);
    router.get('/dashboard', dashboard);

};