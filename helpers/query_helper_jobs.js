const JobModel = require('../model/job');
const JobDetailModel = require('../model/jobdetail');
const mongoose = require('mongoose');
const fs = require('fs');

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
            },
            {
                $unwind: '$user'
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
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'jobdetails',
                    localField: '_id',
                    foreignField: 'job_id',
                    as: 'jobdetails'
                }
            },
            {
                $unwind: '$jobdetails'
            }
        ]);
    }
    catch (err) {
        console.log("Error fetching single job", err);
        return false;
    };
};

exports.createJob = async (requestBody, userId, filePaths, uploadDir) => {
    if (!requestBody.title || !requestBody.description || !requestBody.company_name)
        return false;
    const jobId = new mongoose.Types.ObjectId();
    requestBody['uploader'] = userId;
    requestBody['_id'] = jobId;
    if (requestBody['company_logo_file_name'])
        requestBody['company_logo_file_path'] = '/logos-'+jobId.toString()+'_'+requestBody.company_logo_file_name;
    if (requestBody['test_file_name'])    
        requestBody['test_file_path'] = '/tests-'+jobId.toString()+'_'+requestBody.test_file_name;
    const jobObj = new JobModel(requestBody);
    const jobDetailObj = new JobDetailModel({
        job_id: jobId,
        description: requestBody.description
    });
    const promise1 = new Promise( async (resolve, reject) => {
        try {
            const response = await jobObj.save();
            resolve(response);
        }
        catch (err) {
            console.log("Error saving job", err);
            reject(err);
        };
    });
    const promise2 = new Promise( async (resolve, reject) => {
        try {
            const response = await jobDetailObj.save();
            resolve(response);
        }
        catch (err) {
            console.log("Error saving jobdetail", err);
            reject(err);
        };
    });
    const promise3 = new Promise( (resolve, reject) => {
        if (filePaths['company_logo_file_name']) {
            fs.rename(filePaths['company_logo_file_name'], uploadDir + requestBody['company_logo_file_path'], (err) => {
                if (err) {
                    console.log("Error renaming company logo", err);
                    reject(err);
                } else {
                    resolve();
                };
            });
        } else {
            resolve();
        };
    });
    const promise4 = new Promise( (resolve, reject) => {
        if (filePaths['test_file_name']) {
            fs.rename(filePaths['test_file_name'], uploadDir + requestBody['test_file_path'], (err) => {
                if (err) {
                    console.log("Error renaming test file", err);
                    reject(err);
                } else {
                    resolve();
                };
            });
        } else {
            resolve();
        };
    });
    try {
        return await Promise.all([promise1, promise2, promise3, promise4]);
    }
    catch (err) {
        console.log("Error resolving promises", err);
        return {error: err};
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
