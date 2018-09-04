const { getSingleUser, updateUser } = require('../../helpers/query_helper_users');

exports.getSingleUser = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false
    };
    try {
        const response = await getSingleUser(req.params.id);
        dataHash.data = response;
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('user', dataHash);
};
exports.updateUser = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false
    };
    try {
        const response = await updateUser(req.params.id);
        dataHash.data = response;
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('user', dataHash);
};