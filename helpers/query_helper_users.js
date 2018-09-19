const UserModel = require('../model/user');
const { getUserHashToUpdate } = require('./common_helper');
const mongoose = require('mongoose');

exports.updateUser = async (userId, requestBody) => {
    const userHashToUpdate = getUserHashToUpdate(requestBody);
    try {
        return await UserModel.findByIdAndUpdate(userId, userHashToUpdate);
    }
    catch (err) {
        console.log("Error updating user", err);
        return false;
    };
};
exports.getSingleUser = async (userId) => {
    try {
        return await UserModel.findById(userId);
    }
    catch(err) {
        console.log("Error fetching user", err);
    };
};
exports.getSingleUserJob = async (userId) => {
    try {
        return await UserModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: '_id',
                    foreignField: 'uploader',
                    as: 'jobs'
                }
            }
        ]);
    }
    catch(err) {
        console.log("Error fetching user", err);
    };
};