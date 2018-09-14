const { index, featured, blogs, search } = require('./home.ctrl');

module.exports = (router) => {

    router.get('/', index);
    router.get('/search', search);

};