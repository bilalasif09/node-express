const { postajob, postajobPost, job } = require('./job.ctrl');

module.exports = (router) => {
    router.route('/postajob')
    .get(postajob)
    .post(postajobPost);
    router.get('/job/:id', job);
};
