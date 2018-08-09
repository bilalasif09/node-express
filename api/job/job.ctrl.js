const jobModel = require('../../model/job');
const UserModel = require('../../model/user');
const ApiHelper = require('../api_helper');
const mongoose = require('mongoose');

exports.getJob = async (req, res) => {
    try {
        const response = await jobModel.findById(req.query.job_id);
        res.status(200).send(response);
    }
    catch(err) {
        res.status(500).send(err);
    }
};

exports.createJob = async (req, res, next) => {
    const jobId = new mongoose.Types.ObjectId;
    const userId = ApiHelper.validateAuthToken(req, res);
    const jobObj = new jobModel({
        _id: jobId,
        title: req.body.title,
        description: req.body.description,
        uploader: userId
    });
    const promiseOne = new Promise( async (resolve, reject) => {
        try {
            const response = await jobObj.save();
            resolve(response);
        }
        catch(err) {
            ApiHelper.failure(res, err);
        }
    });
    const promiseTwo = new Promise( async (resolve, reject) => {
        try {
            const response = await UserModel.findByIdAndUpdate(userId, {
                $push: {
                    uploadedjobs: jobId
                }
            });
            resolve(response);
        }
        catch(err) {
            ApiHelper.failure(res, err);
        }
    });
    await Promise.all([promiseOne, promiseTwo]);
    try {
        next(1);
    }
    catch(err) {
        ApiHelper.failure(err);
    }
};

exports.updateJob = async (req, res) => {
    try {
        const response = await jobModel.findByIdAndUpdate(req.query.job_id, req.body);
        res.status(200).send(response);
    }
    catch(err) {
        res.status(500).send(err);
    }
};