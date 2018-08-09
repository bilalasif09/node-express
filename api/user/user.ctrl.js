const UserModel = require('../../model/user');
const ApiHelper = require('../api_helper');

exports.getUser = (req, res) => {

};

exports.createUser = async (req, res) => {
    const hashedPassword = ApiHelper.encodeAndValidatePassword(req.body.password);
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const response = await newUser.save();
        const token = ApiHelper.createAuthToken(response._id);
        ApiHelper.success(res, token);
    }
    catch(err) {
        ApiHelper.failure(res, err);
    };
};

exports.updateUser = async (req, res) => {
    const userId = ApiHelper.validateAuthToken(req, res);
    const userHashToUpdate = getUserHash(req.body);
    try {
        const response = await UserModel.findByIdAndUpdate(userId, userHashToUpdate);
        ApiHelper.success(res, response);
    }
    catch(err) {
        ApiHelper.failure(res, err);
    }
};

const getUserHash = (requestBody) => {
    hash = {};
    if (requestBody.name) hash.name = requestBody.name;
    if (requestBody.email) hash.email = requestBody.email;
    if (requestBody.password) hash.password = ApiHelper.encodeAndValidatePassword(requestBody.password);
    return hash;
};