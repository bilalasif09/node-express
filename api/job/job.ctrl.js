const { failure500 } = require('../../helpers/api_helper');
const { getAllJobs, getSingleJob, createJob, updateJob, applyJob } = require('../../helpers/query_helper_jobs');
const { updateUser } = require('../../helpers/query_helper_users');
const formidable = require('formidable');
const fs = require('fs');

exports.getAll = async (req, res, next) => {
    try {
        const response = await getAllJobs();
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.getSingle = async (req, res, next) => {
    try {
        const response = await getSingleJob(req.body.jobId);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.create = async (req, res, next) => {
    // console.log("creating job", req.body);
    // try {
    //     const response = await createJob(req.body, req.userId);
    //     response ? next(response) : failure500(res, {});
    // }
    // catch(err) {
    //     failure500(res, err);
    // };
    const form = new formidable.IncomingForm();
    form.parse(req);
    form.on('field', (field, value) => {
        console.log("Fields", field, value);
    });
    form.on('file', (name, file) => {
        console.log("file", name, file);
    });
    form.on('end', () => {
        console.log("form end");
    });
};

exports.update = async (req, res, next) => {
    try {
        const response = await updateJob(req.body.title, req.body.description, req.userId, req.body.jobId);
        next(response);
    }
    catch(err) {
        failure500(res, err);
    };
};

exports.apply = async (req, res, next) => {
    let userObj = { cv: '' };
    let jobId;
    let filePath = '';
    const form = new formidable.IncomingForm();
    form.uploadDir = './cvfiles/';
    form.parse(req);

    form.on('field', (field, value) => {
        if (field === 'jobId') jobId = value;
    });
    form.on('file', (name, file) => {
        userObj.cv = file.name;
        filePath = file.path;
    });
    form.on('end', async () => {
        
        const promise1 = new Promise( async (resolve, reject) => {
            try {
                const response = await updateUser(req.userId, userObj);
                if (response) {
                    const uniqueFileName = response._id.toString() + '_' + response.cv; 
                    const promise = new Promise( (resolve, reject) => {
                        fs.rename(filePath, form.uploadDir + "/cvs-" + uniqueFileName, (err) => {
                            if (err) reject();
                            resolve();
                        });
                    }); 
                    try {
                        await Promise.all([promise]);
                        resolve(response);
                    }
                    catch (err) {
                        console.log("Error resolving promise / renaming image");
                        reject(err);
                    };
                } else {
                    console.log("Error updating user 1");
                    reject('Error updating user');
                };
            }
            catch(err) {
                console.log("Error updating user 2");
                reject(err);
            };
        });
        const promise2 = new Promise( async (resolve, reject) => {
            try {
                const response = await applyJob(jobId, req.userId);
                response ? resolve(response) : reject('Error applying job');
            }
            catch(err) {
                reject(err);
            };
        });
        try {
            const response = await Promise.all([promise1, promise2]);
            next(response);
        }
        catch(err) {
            console.log("Error promise all", err);
            failure500(res, err);
        };
    });
};