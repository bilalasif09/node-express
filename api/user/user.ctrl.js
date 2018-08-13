const UserModel = require('../../model/user');
const ApiHelper = require('../api_helper');

exports.getUser = (req, res, next) => {

};



exports.updateUser = async (req, res, next) => {
    const userHashToUpdate = getUserHash(req.body);
    try {
        const response = await UserModel.findByIdAndUpdate(req.userId, userHashToUpdate);
        next(response);
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    }
};

const getUserHash = (requestBody) => {
    hash = {};
    if (requestBody.name) hash.name = requestBody.name;
    if (requestBody.email) hash.email = requestBody.email;
    if (requestBody.password) hash.password = ApiHelper.encodeAndValidatePassword(requestBody.password);
    return hash;
};