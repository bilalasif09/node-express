const jwt = require('jsonwebtoken');
const config = require('../config');

exports.createAuthToken = (id) => {
    return jwt.sign(
        { id: id },
        config.secret,
        { expiresIn: 86400 } // expires in 24 hours 
    );
};
exports.validateAuthToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) failure404(res, {});
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            failure401(res, {});
        }
        req.userId = decoded.id;
        next();
    });
};
exports.success = (response, req, res, next) => {
    res.status(200).send({ auth: true, response: response, message: 'Success' });
};
exports.failure500 = (res, err) => {
    res.status(500).send({ error: err, auth: false, message: 'Something went wrong!' });
};
exports.failure404 = (res, err) => {
    res.status(404).send({ error: err, auth: false, message: 'Not found!' });
};
exports.failure401 = (res, err) => {
    res.status(401).send({ error: err, auth: false, message: 'Authentication failed!' });
};

