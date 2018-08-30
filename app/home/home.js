const homeController = require('./home.ctrl');

module.exports = (router) => {

    router.get('/', homeController.index);
    router.get('/postajob', homeController.postajob);
    router.post('/postajob', homeController.postajobPost);
    router.get('/job/:id', homeController.job);
    router.get('/user/:id', homeController.user);
    router.get('/featured', homeController.featured);
    router.get('/blogs', homeController.blogs);
    router.get('/search', homeController.search);

};