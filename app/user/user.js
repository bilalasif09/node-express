const { getSingleUser, updateUser } = require('./user.ctrl');

module.exports = (router) => {
    router.route('/user')
    .get(getSingleUser)
    .patch(updateUser);
};
