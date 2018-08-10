const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.encodeAndValidatePassword = (password) => {
    return password ? bcrypt.hashSync(password, 8) : password;
};
exports.createAuthToken = (id) => {
    return jwt.sign(
        { id: id },
        config.secret,
        { expiresIn: 86400 } // expires in 24 hours 
    );
};
exports.validateAuthToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) res.status(401).send({ auth: false, message: 'Access token not found!' });
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(500).send({ error: err, auth: false, message: 'Authentication failed!' });
        }
        req.userId = decoded.id;
        next();
    });
};
exports.success = (response, req, res, next) => {
    res.status(200).send({ auth: true, response: response, message: 'Success' });
};
exports.failure = (res, err) => {
    res.status(500).send({ error: err, auth: false, message: 'Something went wrong!' });
};

