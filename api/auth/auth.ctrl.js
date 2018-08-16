const UserModel = require('../../model/user');
const ApiHelper = require('../api_helper');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
    try {
        const response = await UserModel.findOne({ email: req.body.email });
        if (response) {
            bcrypt.compareSync(req.body.password, response.password) 
            ? next(ApiHelper.createAuthToken(response._id)) 
            : ApiHelper.failure401(res, {});
        }
        else {
            ApiHelper.failure404(res, {});
        };
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};

exports.register = async (req, res, next) => {
    const hashedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 8) : req.body.password;
    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const response = await newUser.save();
        next(ApiHelper.createAuthToken(response._id));
    }
    catch(err) {
        ApiHelper.failure500(res, err);
    };
};

