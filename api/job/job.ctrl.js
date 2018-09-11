const { failure500 } = require('../../helpers/api_helper');
const { getAllJobs, getSingleJob, createJob, updateJob, applyJob } = require('../../helpers/query_helper_jobs');

exports.getAll = async (req, res, next) => {
    try {
        const response = await getAllJobs();
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.getSingle = async (req, res, next) => {
    try {
        const response = await getSingleJob(req.body.jobId);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.create = async (req, res, next) => {
    console.log("creating job", req.body);
    try {
        const response = await createJob(req.body, req.userId);
        response ? next(response) : failure500(res, {});
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.update = async (req, res, next) => {
    try {
        const response = await updateJob(req.body.title, req.body.description, req.userId, req.body.jobId);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.apply = async (req, res, next) => {
    try {
        const response = await applyJob(req.body.jobId, req.userId);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};