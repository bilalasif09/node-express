const { getAll, getSingle, create, update, apply } = require('./job.ctrl');
const { validateAuthToken, success } = require('../api_helper');

module.exports = (router) => {
    router.route('/job')
    .get(getAll, success)
    .put(getSingle, success)
    .post(validateAuthToken, create, success)
    .patch(validateAuthToken, update, success);
    router.patch('/apply', validateAuthToken, apply, success);
};
