const { postajob, job } = require('./job.ctrl');

module.exports = (router) => {
    router.get('/postajob', postajob);
    router.get('/job/:id', job);
};
