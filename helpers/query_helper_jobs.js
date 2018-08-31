const JobModel = require('./job');
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
        return -1;
    };
};

exports.getSingleJob = async (jobId) => {
    try {
        return await jobModel.aggregate([
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
            }
        ]);
    }
    catch (err) {
        console.log("Error fetching single job", err);
        return -1;
    }
};

exports.createJob = async (title, description, userId) => {
    const jobObj = new jobModel({
        title: title,
        description: description,
        uploader: userId
    });
    try {
        return await jobObj.save();
    }
    catch (err) {
        console.log("Error saving job", err);
        return -1;
    };
};

exports.updateJob = async (title, description, userId, jobId) => {
    try {
        return await jobModel.findOneAndUpdate({ _id: jobId, uploader: userId }, 
            { title: title, description: description });
    }
    catch (err) {
        console.log("Error updating job", err);
        return -1;
    };  
};

exports.applyJob = async (jobId, userId) => {
    try {
        return await jobModel.findOneAndUpdate({ _id: jobId, uploader: userId },
            { $addToSet: { applied: userId } });
    }
    catch (err) {
        console.log("Error applying to job", err);
        return -1
    };
};   
