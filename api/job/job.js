const jobController = require('./job.ctrl');

module.exports = (router) => {
    router.route('/job')
    .get(jobController.getJob)
    .post(jobController.createJob)
    .put(jobController.updateJob);
}
