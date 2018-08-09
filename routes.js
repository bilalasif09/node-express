const User = require('./api/user/user');
const Job = require('./api/job/job');

module.exports = (router) => {
    User(router);
    Job(router);
}