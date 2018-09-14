const { jsonFormatUserName } = require('../../helpers/app_helper');
const { getSingleJob } = require('../../helpers/query_helper_jobs');

exports.postajob = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false
    };
    if (dataHash.isLoggedIn)
        res.render('postajob', dataHash);
    else 
        res.redirect('/');
};
exports.job = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false,
        helpers: {
            jsonFormatUserName: jsonFormatUserName
        }
    };
    try {
        const response = await getSingleJob(req.params.id);
        dataHash.data = response[0];
    }
    catch(err) {
        dataHash.data = err;
    };
    console.log("Single job", dataHash.data);
    res.render('job', dataHash);
};