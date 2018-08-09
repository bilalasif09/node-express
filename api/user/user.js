const userController = require('./user.ctrl');

module.exports = (router) => {

    router.route('/user')
    .get(userController.getUser)
    .post(userController.createUser)
    .put(userController.updateUser)

};