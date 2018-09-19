const { getSingleUser, updateUser } = require('./user.ctrl');

module.exports = (router) => {
    router.get('/user/:id/:name', getSingleUser);
};
