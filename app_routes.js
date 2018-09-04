const Home = require('./app/home/home');
const Auth = require('./app/auth/auth');
const User = require('./app/user/user');
const Job = require('./app/job/job');

module.exports = (router) => {
    Home(router);
    Auth(router);
    User(router);
    Job(router);
};