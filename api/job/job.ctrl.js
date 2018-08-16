const jobModel = require('../../model/job');
const ApiHelper = require('../api_helper');
const mongoose = require('mongoose');

exports.getAll = async (req, res, next) => {
    try {
        const response = await jobModel.find();
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};

exports.getSingle = async (req, res, next) => {
    try {
        const response = await jobModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.body.jobId) }
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
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    }
};

exports.create = async (req, res, next) => {
    const jobObj = new jobModel({
        title: req.body.title,
        description: req.body.description,
        uploader: req.userId
    });
    try {
        const response = await jobObj.save();
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};

exports.update = async (req, res, next) => {
    try {
        const response = await jobModel.findOneAndUpdate({ _id: req.body.jobId, uploader: req.userId }, 
        { title: req.body.title, description: req.body.description });
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};

exports.interest = async (req, res, next) => {
    try {
        const response = await jobModel.findOneAndUpdate({ _id: req.body.jobId, uploader: req.userId },
        { $addToSet: { interested: req.userId } });
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};

exports.apply = async (req, res, next) => {
    try {
        const response = await jobModel.findOneAndUpdate({ _id: req.body.jobId, uploader: req.userId },
        { $addToSet: { applied: req.userId } });
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};