const { createAuthToken, failure401, failure404, failure500, encodeAndValidatePassword } = require('../../helpers/api_helper');
const { compareSync } = require('bcryptjs');
const { authLogin, authRegister } = require('../../helpers/query_helper_auth');
const formidable = require('formidable');
const fs = require('fs');

exports.login = async (req, res, next) => {
    try {
        const response = await authLogin(req.body.email);
        if (response) {
            if (compareSync(req.body.password, response.password)) {
                next(createAuthToken(response._id));
            } else {
                failure401(res, {});
            };
        }
        else {
            failure404(res, {});
        };
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.register = (req, res, next) => {
    let userObj = {  name: '', email: '', password: '', image: '' };
    let filePath = '';
    const form = new formidable.IncomingForm();
    form.uploadDir = './uploads/';
    form.parse(req);

    form.on('field', (field, value) => {
        if (field === 'name') userObj.name = value;
        else if (field === 'email') userObj.email = value;
        else if (field === 'password') userObj.password = encodeAndValidatePassword(value);
    });
    form.on('file', (name, file) => {
        userObj.image = file.name;
        filePath = file.path;
    });
    form.on('end', async () => {
        try {
            const response = await authRegister(userObj);
            if (response) {
                const uniqueFileName = response._id.toString() + '_' + response.image; 

      	        const promise = new Promise( (resolve, reject) => {
                    fs.rename(filePath, form.uploadDir + "/" + uniqueFileName, (err) => {
                        if (err) reject();
                        resolve();
                    });
                }); 
                try {
                    await Promise.all([promise]);
                    next(response);
                }
                catch (err) {
                    console.log("Error resolving promise / renaming image");
                    failure500(res, err);
                };
            } else {
                console.log("Error saving user 1");
                failure500(res, {});
            };
        }
        catch(err) {
            console.log("Error saving user 2");
            failure500(res, err);
        };
    });

};