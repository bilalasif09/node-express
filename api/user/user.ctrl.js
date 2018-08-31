const { failure500 } = require('../../helpers/api_helper');
const { updateUser } = require('../../helpers/query_helper_users');

exports.getUser = (req, res, next) => {

};

exports.updateUser = async (req, res, next) => {
    try {
        const response = await updateUser(req.userId, req.body);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    }
};

