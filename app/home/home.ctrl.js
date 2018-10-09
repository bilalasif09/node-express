const { dateFormat, checkEquality, getFirstCharIfNoImage } = require('../../helpers/app_helper');
const { getAllJobs, searchAllJobs } = require('../../helpers/query_helper_jobs');
const { getSingleUserJob } = require('../../helpers/query_helper_users');
const { checkTokenValidity } = require('../../helpers/api_helper');

exports.index = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: checkTokenValidity(req.cookies.token),
        helpers: {
            dateFormat: dateFormat,
            checkEquality: checkEquality,
            getFirstCharIfNoImage: getFirstCharIfNoImage
        }
    };
    try {
        const response = await getAllJobs();
        console.log(response);
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
        isLoggedIn: checkTokenValidity(req.cookies.token),
        helpers: {
            dateFormat: dateFormat,
            checkEquality: checkEquality,
            getFirstCharIfNoImage: getFirstCharIfNoImage
        }
    };
    try {
        const response = await searchAllJobs(dataHash.query);
        dataHash.data = response;
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('home', dataHash);
};
exports.dashboard = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: checkTokenValidity(req.cookies.token),
        helpers: {
            dateFormat: dateFormat,
            getFirstCharIfNoImage: getFirstCharIfNoImage
        }
    };
    console.log("User id", dataHash.isLoggedIn);
    
    if (dataHash.isLoggedIn) {
        try {
            const response = await getSingleUserJob(dataHash.isLoggedIn);
            dataHash.data = response[0];
            dataHash.data.jobs = dataHash.data.jobs.reverse();
            console.log(dataHash.data);
        }
        catch(err) {
            dataHash.data = err;
        };
        res.render('dashboard', dataHash);
    }
    else {
        res.redirect('/logout');
    };
};
exports.codeEditor = async (req, res) => {
    res.render('codeeditor');
};