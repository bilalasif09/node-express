const { dateFormat, jsonFormatUserName } = require('../../helpers/app_helper');
const { getAllJobs } = require('../../helpers/query_helper_jobs');

exports.index = async (req, res) => {
    console.log("Homepage session", req.session.token);
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false,
        helpers: {
            dateFormat: dateFormat,
            jsonFormatUserName: jsonFormatUserName
        }
    };
    try {
        const response = await getAllJobs();
        dataHash.data = response;
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('home', dataHash);
    
};
exports.search = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('search', {
        data: 'Search',
        isLoggedIn: isLoggedIn
    });
};
