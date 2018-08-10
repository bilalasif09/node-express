const jobModel = require('../../model/job');
const UserModel = require('../../model/user');
const ApiHelper = require('../api_helper');
const mongoose = require('mongoose');

exports.getJob = async (req, res, next) => {
    try {
        const response = await jobModel.findOne({ _id: req.query.jobId}).populate('users');
        next(response);
    }
    catch(err) {
        ApiHelper.failure(res, err);
    }
};

exports.createJob = async (req, res, next) => {
    const jobId = new mongoose.Types.ObjectId;
    const jobObj = new jobModel({
        _id: jobId,
        title: req.body.title,
        description: req.body.description,
        uploader: req.userId
    });
    const promiseOne = new Promise( async (resolve, reject) => {
        try {
            const response = await jobObj.save();
            resolve(response);
        }
        catch(err) {
            reject('Problem saving job!');
        };
    });
    const promiseTwo = new Promise( async (resolve, reject) => {
        try {
            const response = await UserModel.findByIdAndUpdate(req.userId, {
                $push: { uploadedjobs: jobId }
            });
            resolve(response);
        }
        catch(err) {
            reject('Problem updating user!');
        };
    });
    await Promise.all([promiseOne, promiseTwo]);
    try {
        next(1);
    }
    catch(err) {
        ApiHelper.failure(res, err);
    };
};

exports.updateJob = async (req, res, next) => {
    try {
        const response = await jobModel.findOneAndUpdate({ _id: req.body.jobId, uploader: req.userId }, 
        { title: req.body.title, description: req.body.description });
        next(response);
    }
    catch(err) {
        ApiHelper.failure(res, err);
    };
};