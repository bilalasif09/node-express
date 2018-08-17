const homeController = require('./home.ctrl');

module.exports = (router) => {

    router.get('/', homeController.index);
    router.get('/login', homeController.login);
    router.post('/login', homeController.loginPost);
    router.get('/logout', homeController.logout);
    router.get('/register', homeController.register);
    router.post('/register', homeController.registerPost);
    router.get('/featured', homeController.featured);
    router.get('/blogs', homeController.blogs);
    router.get('/search', homeController.search);
    router.get('/logincomplete', homeController.loginComplete);

};