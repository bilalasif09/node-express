const { createAuthToken, failure401, failure404, failure500, encodeAndValidatePassword } = require('../../helpers/api_helper');
const { compareSync } = require('bcryptjs');
const { authLogin, authRegister } = require('../../helpers/query_helper_auth');

exports.login = async (req, res, next) => {
    try {
        const response = await authLogin(req.body.email);
        if (response) {
            compareSync(req.body.password, response.password) 
            ? next(createAuthToken(response._id)) 
            : failure401(res, {});
        }
        else {
            failure404(res, {});
        };
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.register = async (req, res, next) => {
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: encodeAndValidatePassword(req.body.password)
    };
    try {
        const response = await authRegister(userObj);
        next(createAuthToken(response._id));
    }
    catch(err) {
        failure500(res, err);
    };
};

