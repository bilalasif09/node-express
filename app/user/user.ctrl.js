const { dateFormat, getFirstCharIfNoImage } = require('../../helpers/app_helper');
const { getSingleUserJob, updateUser } = require('../../helpers/query_helper_users');
const { checkTokenValidity } = require('../../helpers/api_helper');

exports.getSingleUser = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: req.cookies.token && req.cookies.token !== 'undefined' && checkTokenValidity(req.cookies.token),
        helpers: {
            dateFormat: dateFormat,
            getFirstCharIfNoImage: getFirstCharIfNoImage
        }
    };
    try {
        const response = await getSingleUserJob(req.params.id);
        dataHash.data = response[0];
        dataHash.data.jobs = dataHash.data.jobs.reverse();
        console.log(dataHash.data);
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('user', dataHash);
};
exports.updateUser = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: req.cookies.token && req.cookies.token !== 'undefined' && checkTokenValidity(req.cookies.token)
    };
    try {
        const response = await updateUser(req.params.id);
        dataHash.data = response;
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('user', dataHash);
};