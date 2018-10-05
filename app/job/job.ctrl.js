const { dateFormat, getFirstCharIfNoImage } = require('../../helpers/app_helper');
const { getSingleJob } = require('../../helpers/query_helper_jobs');
const { checkTokenValidity } = require('../../helpers/api_helper');

exports.postajob = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: checkTokenValidity(req.cookies.token)
    };
    if (dataHash.isLoggedIn)
        res.render('postajob', dataHash);
    else 
        res.redirect('/logout');
};
exports.job = async (req, res) => {
    let dataHash = {
        data: null,
        isError: false,
        name: req.cookies.name,
        isLoggedIn: checkTokenValidity(req.cookies.token),
        jobId: req.params.id,
        helpers: {
            dateFormat: dateFormat,
            getFirstCharIfNoImage: getFirstCharIfNoImage
        }
    };
    try {
        const response = await getSingleJob(dataHash.jobId);
        if (response) {
            dataHash.data = response[0];
        } else {
            dataHash.isError = true;
        };
    }
    catch(err) {
        dataHash.isError = true
        dataHash.data = err;
    };
    console.log("Single job", dataHash.data);
    res.render('job', dataHash);
};