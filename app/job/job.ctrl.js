const { dateFormat, getUserDetails, getJobDetails } = require('../../helpers/app_helper');
const { getSingleJob } = require('../../helpers/query_helper_jobs');

exports.postajob = async (req, res) => {
    let dataHash = {
        data: null,
        name: req.cookies.name,
        isLoggedIn: req.cookies.token !== 'undefined' ? true : false
    };
    if (dataHash.isLoggedIn)
        res.render('postajob', dataHash);
    else 
        res.redirect('/');
};
exports.job = async (req, res) => {
    let dataHash = {
        data: null,
        isError: false,
        name: req.cookies.name,
        isLoggedIn: req.cookies.token !== 'undefined' ? true : false,
        requirements: [],
        responsibilities: [],
        offer: [],
        note: '',
        jobId: req.params.id,
        helpers: {
            dateFormat: dateFormat,
            getUserDetails: getUserDetails,
            getJobDetails: getJobDetails
        }
    };
    try {
        const response = await getSingleJob(dataHash.jobId);
        if (response) {
            dataHash.data = response[0];
            dataHash.requirements = getJobDetails(dataHash.data.jobdetails, 'requirements');
            dataHash.responsibilities = getJobDetails(dataHash.data.jobdetails, 'responsibilities');
            dataHash.offer = getJobDetails(dataHash.data.jobdetails, 'offer');
            dataHash.note = getJobDetails(dataHash.data.jobdetails, 'note');

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