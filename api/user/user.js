const { getUser, updateUser } = require('./user.ctrl');
const { validateAuthToken, success } = require('../api_helper');

module.exports = (router) => {

    router.route('/user')
    .get(getUser, success)
    .patch(validateAuthToken, updateUser, success);

};