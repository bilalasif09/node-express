const UserModel = require('../model/user');

exports.authLogin = async (email) => {
    try {
        return await UserModel.findOne({ email: email });

    }
    catch (err) {
        console.log("Error logging in user", err);
        return -1;
    };
};

exports.authRegister = async (userObj) => {
    try {
        return await new UserModel(userObj).save();
    }
    catch (err) {
        console.log("Error registering user", err);
        return -1;
    };
};