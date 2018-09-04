const { dateFormat, jsonFormatUserName } = require('../../helpers/app_helper');
const { getAllJobs } = require('../../helpers/query_helper_jobs');

exports.index = async (req, res) => {
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
    console.log("data Hash", dataHash);
    res.render('home', dataHash);
    
};
exports.featured = (req, res) => {
    console.log("Featured Token", req.session.token);
    const isLoggedIn = req.session.token ? true : false;
    res.render('featured', {
        data: 'Featured',
        isLoggedIn: isLoggedIn
    });
};
exports.blogs = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('blogs', {
        data: 'Blogs',
        isLoggedIn: isLoggedIn
    });
};
exports.search = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('search', {
        data: 'Search',
        isLoggedIn: isLoggedIn
    });
};
