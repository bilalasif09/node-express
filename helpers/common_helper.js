const { encodeAndValidatePassword } = require('./api_helper');

exports.getUserHashToUpdate = (requestBody) => {
    hash = {};
    if (requestBody.name) hash.name = requestBody.name;
    if (requestBody.cv) hash.cv = requestBody.cv;    
    if (requestBody.email) hash.email = requestBody.email;
    if (requestBody.password) hash.password = encodeAndValidatePassword(requestBody.password);
    return hash;
};