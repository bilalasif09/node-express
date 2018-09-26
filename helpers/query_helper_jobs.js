const JobModel = require('../model/job');
const JobDetailModel = require('../model/jobdetail');
const mongoose = require('mongoose');

exports.getAllJobs = async () => {
    try {
        return await JobModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'uploader',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]);
    } 
    catch (err) {
        console.log("Error fetching jobs", err);
        return false;
    };
};

exports.searchAllJobs = async (query) => {
    try {
        return await JobModel.aggregate([
            {
                $match: { $text: { $search: query } }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'uploader',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]);
    } 
    catch (err) {
        console.log("Error searching jobs", err);
        return false;
    };
};

exports.getSingleJob = async (jobId) => {
    try {
        return await JobModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(jobId) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'uploader',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'jobdetails',
                    localField: '_id',
                    foreignField: 'job_id',
                    as: 'jobdetails'
                }
            }
        ]);
    }
    catch (err) {
        console.log("Error fetching single job", err);
        return false;
    };
};

exports.createJob = async (requestBody, userId) => {
    if (!requestBody.title || !requestBody.description || !requestBody.company_name)
        return false;
    const jobId = new mongoose.Types.ObjectId();
    const jobObj = new JobModel({
        _id: jobId,
        title: requestBody.title,
        tags: requestBody.tags,
        company_name: requestBody.company_name,
        type: requestBody.type,
        location: requestBody.location,
        closing_date: requestBody.closing_date,
        uploader: userId
    });
    const jobDetailObj = new JobDetailModel({
        job_id: jobId,
        description: requestBody.description
    });
    const promise1 = new Promise( async (resolve, reject) => {
        try {
            await jobObj.save();
            resolve();
        }
        catch (err) {
            console.log("Error saving job", err);
            reject();
        };
    });
    const promise2 = new Promise( async (resolve, reject) => {
        try {
            await jobDetailObj.save();
            resolve();
        }
        catch (err) {
            console.log("Error saving jobdetail", err);
            reject();
        };
    });
    try {
        return await Promise.all([promise1, promise2]);
    }
    catch (err) {
        console.log("Error resolving promises", err);
        return false;
    };
};

exports.updateJob = async (title, description, userId, jobId) => {
    try {
        return await JobModel.findOneAndUpdate({ _id: jobId, uploader: userId }, 
            { title: title, description: description });
    }
    catch (err) {
        console.log("Error updating job", err);
        return false;
    };  
};

exports.applyJob = async (jobId, userId) => {
    try {
        return await JobModel.findOneAndUpdate({ _id: jobId },
            { $addToSet: { applied: userId } });
    }
    catch (err) {
        console.log("Error applying to job", err);
        return false;
    };
};   
