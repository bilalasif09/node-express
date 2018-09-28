const jwt = require('jsonwebtoken');
const config = require('../config');
const { hashSync } = require('bcryptjs');

exports.encodeAndValidatePassword = (password) => {
    return password ? hashSync(password, 8) : password;
};
exports.createAuthToken = (id) => {
    return jwt.sign(
        { id: id },
        config.secret,
        { expiresIn: 86400 } // expires in 24 hours 
    );
};
exports.validateAuthToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        this.failure404(res, {});
    };
    const promise = new Promise( (resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                reject();
            } else {
                req.userId = decoded.id;
                resolve();
            };
        });
    }); 
    try {
        await Promise.all([promise]);
        next();
    }
    catch (err) {
        this.failure401(res, err);
    };
};
exports.saveSession = (data, req, res, next) => {
    // req.session.token = data.token;
    // req.session.name = data.user.name;
    res.cookie('token', data.token);
    res.cookie('name', data.user.name);
    next(data);
};
exports.success = (response, req, res, next) => {
    res.status(200).send({ auth: true, response: response, message: 'Success', status: 200 });
};
exports.failure500 = (res, err) => {
    res.status(500).send({ error: err, auth: false, message: 'Something went wrong!', status: 500 });
};
exports.failure404 = (res, err) => {
    res.status(404).send({ error: err, auth: false, message: 'Not found!', status: 404 });
};
exports.failure401 = (res, err) => {
    res.status(401).send({ error: err, auth: false, message: 'Authentication failed!', status: 401 });
};

