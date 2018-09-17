const { dateFormat, getUserDetails } = require('../../helpers/app_helper');
const { getAllJobs } = require('../../helpers/query_helper_jobs');

exports.index = async (req, res) => {
    console.log("Homepage session", req.session.token);
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false,
        helpers: {
            dateFormat: dateFormat,
            getUserDetails: getUserDetails
        }
    };
    try {
        const response = await getAllJobs();
        console.log("Home response", response);
        dataHash.data = response.reverse();
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
