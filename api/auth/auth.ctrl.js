const { createAuthToken, failure401, failure404, failure500, encodeAndValidatePassword } = require('../../helpers/api_helper');
const { compareSync } = require('bcryptjs');
const { authLogin, authRegister } = require('../../helpers/query_helper_auth');
const formidable = require('formidable');
const fs = require('fs');

exports.login = async (req, res, next) => {
    try {
        let addedResponse = {};
        let response = await authLogin(req.body.email);
        if (response) {
            if (compareSync(req.body.password, response.password)) {
                addedResponse.user = response;
                addedResponse.token = createAuthToken(response._id);
                next(addedResponse);
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

exports.register = async (req, res, next) => {
    // let userObj = {  name: '', email: '', password: '', image: '' };
    // let filePath = '';
    // const formPromise = new Promise( (resolve, reject) => {
    //     const form = new formidable.IncomingForm();
    //     form.uploadDir = './uploads/';
    //     form.parse(req);
    //     form.on('field', (field, value) => {
    //         if (field === 'name') userObj.name = value;
    //         else if (field === 'email') userObj.email = value;
    //         else if (field === 'password') userObj.password = encodeAndValidatePassword(value);
    //     });
    //     form.on('file', (name, file) => {
    //         userObj.image = file.name;
    //         filePath = file.path;
    //     });
    //     form.on('end', async () => {
    //         try {
    //             const response = await authRegister(userObj);
    //             if (response) {
    //                 const uniqueFileName = response._id.toString() + '_' + response.image; 
    //                 const promise = new Promise( (resolve, reject) => {
    //                     fs.rename(filePath, form.uploadDir + "/" + uniqueFileName, (err) => {
    //                         if (err) reject(err);
    //                         resolve();
    //                     });
    //                 }); 
    //                 try {
    //                     await Promise.all([promise]);
    //                     console.log("Form end promise all resolved");
    //                     resolve(response);
    //                 }
    //                 catch (err) {
    //                     console.log("Error resolving promise / renaming image");
    //                     reject(err);
    //                 };
    //             } else {
    //                 console.log("Error saving user 1");
    //                 reject('Error saving user');
    //             };
    //         }
    //         catch(err) {
    //             console.log("Error saving user 2");
    //             reject(err);
    //         };
    //     });
    // });
    try {
        req.body.password = encodeAndValidatePassword(req.body.password);
        let addedResponse = {};
        let response = await authRegister(req.body);
        if (response) {
            addedResponse.user = response;
            addedResponse.token = createAuthToken(response._id);
            next(addedResponse);
        } else {
            failure500(res, 'Error saving user');
        }; 
    }
    catch(err) {
        failure500(res, err);
    };

};