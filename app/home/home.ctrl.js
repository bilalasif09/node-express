const { dateFormat, getUserDetails, checkEquality } = require('../../helpers/app_helper');
const { getAllJobs, searchAllJobs } = require('../../helpers/query_helper_jobs');

exports.index = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: req.cookies.token !== 'undefined' ? true : false,
        helpers: {
            dateFormat: dateFormat,
            getUserDetails: getUserDetails,
            checkEquality: checkEquality
        }
    };
    try {
        const response = await getAllJobs();
        dataHash.data = response.reverse();
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('home', dataHash);
    
};
exports.search = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        query: req.query.query,
        isLoggedIn: req.cookies.token !== 'undefined' ? true : false,
        helpers: {
            dateFormat: dateFormat,
            getUserDetails: getUserDetails,
            checkEquality: checkEquality
        }
    };
    try {
        const response = await searchAllJobs(dataHash.query);
        dataHash.data = response.reverse();
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('home', dataHash);
};
