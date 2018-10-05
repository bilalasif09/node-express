const { encodeAndValidatePassword } = require('./api_helper');

exports.getUserHashToUpdate = (requestBody) => {
    hash = {};
    if (requestBody.name) hash.name = requestBody.name;
    if (requestBody.cv_name) hash.cv_name = requestBody.cv_name;    
    if (requestBody.cv_path) hash.cv_path = requestBody.cv_path;    
    if (requestBody.email) hash.email = requestBody.email;
    if (requestBody.password) hash.password = encodeAndValidatePassword(requestBody.password);
    return hash;
};