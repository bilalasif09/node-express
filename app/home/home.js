const { index, featured, blogs, search } = require('./home.ctrl');

module.exports = (router) => {

    router.get('/', index);
    router.get('/featured', featured);
    router.get('/blogs', blogs);
    router.get('/search', search);

};