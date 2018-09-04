const { failure500 } = require('../../helpers/api_helper');
const { updateUser, getSingleUser } = require('../../helpers/query_helper_users');

exports.getUser = async (req, res, next) => {
    try {
        const response = await getSingleUser(req.params.userId);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.updateUser = async (req, res, next) => {
    try {
        const response = await updateUser(req.userId, req.body);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

