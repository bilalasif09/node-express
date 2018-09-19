const { dateFormat, getJobDetails } = require('../../helpers/app_helper');
const { getSingleUserJob, updateUser } = require('../../helpers/query_helper_users');

exports.getSingleUser = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.session.name,
        isLoggedIn: req.session.token ? true : false,
        helpers: {
            dateFormat: dateFormat,
            getJobDetails: getJobDetails
        }
    };
    try {
        const response = await getSingleUserJob(req.params.id);
        dataHash.data = response[0];
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
        name: req.session.name,
        isLoggedIn: req.session.token ? true : false
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