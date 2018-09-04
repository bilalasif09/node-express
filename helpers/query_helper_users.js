const UserModel = require('../model/user');
const { getUserHashToUpdate } = require('./common_helper');

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