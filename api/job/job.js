const jobController = require('./job.ctrl');
const ApiHelper = require('../api_helper');

module.exports = (router) => {
    router.route('/job')
    .get(jobController.getJob, ApiHelper.success)
    .post(ApiHelper.validateAuthToken, jobController.createJob, ApiHelper.success)
    .put(ApiHelper.validateAuthToken, jobController.updateJob, ApiHelper.success);
};
