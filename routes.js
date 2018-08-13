const User = require('./api/user/user');
const Job = require('./api/job/job');
const Auth = require('./api/auth/auth');

module.exports = (router) => {
    User(router);
    Job(router);
    Auth(router);
};