const jobController = require('./job.ctrl');
const ApiHelper = require('../api_helper');

module.exports = (router) => {
    router.route('/job')
    .put(jobController.get, ApiHelper.success)
    .post(ApiHelper.validateAuthToken, jobController.create, ApiHelper.success)
    .patch(ApiHelper.validateAuthToken, jobController.update, ApiHelper.success);
    router.patch('/interest', ApiHelper.validateAuthToken, jobController.interest, ApiHelper.success);
    router.patch('/apply', ApiHelper.validateAuthToken, jobController.apply, ApiHelper.success);
};
