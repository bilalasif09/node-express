const { getAll, getSingle, create, update, apply } = require('./job.ctrl');
const { validateAuthToken, success } = require('../../helpers/api_helper');

module.exports = (router) => {
    router.route('/job')
    .get(getAll, success)
    .put(getSingle, success)
    .post(validateAuthToken, create, success)
    .patch(validateAuthToken, update, success);
    router.post('/apply', validateAuthToken, apply, success);
};
