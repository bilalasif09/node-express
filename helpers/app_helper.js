const timeago = require('timeago.js');

exports.dateFormat = (date) => timeago().format(date);
exports.getUserDetails = (user, key) => JSON.parse(JSON.stringify(user[0]))[key];
exports.getJobDetails = (job, key) => JSON.parse(JSON.stringify(job[0]))[key];