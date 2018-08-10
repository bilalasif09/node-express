const userController = require('./user.ctrl');
const ApiHelper = require('../api_helper');

module.exports = (router) => {

    router.route('/user')
    .get(userController.getUser, ApiHelper.success)
    .post(userController.createUser, ApiHelper.success)
    .put(ApiHelper.validateAuthToken, userController.updateUser, ApiHelper.success);

};