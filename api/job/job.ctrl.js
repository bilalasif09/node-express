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
    let jobObj = {}, filePaths = {};
    const form = new formidable.IncomingForm();
    form.uploadDir = './employerfiles';
    form.parse(req);
    form.on('field', (field, value) => {
        jobObj[field] = value;
    });
    form.on('file', (name, file) => {
        jobObj[name] = file.name;
        filePaths[name] = file.path;
        console.log("File", name, file.name, "Path", file.path);
    });
    form.on('end', async () => {
        console.log("form end", jobObj);
        try {
            const response = await createJob(jobObj, req.userId, filePaths, form.uploadDir);
            console.log("save job response", response);
            if (response && !response.error) {
                next(response);
            } else {
                failure500(res, response);
            };
        }
        catch(err) {
            failure500(res, err);
        };
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
    let userObj = { cv_name: '', cv_path: '' };
    let jobId;
    let filePath = '';
    const form = new formidable.IncomingForm();
    form.uploadDir = './cvfiles/';
    form.parse(req);

    form.on('field', (field, value) => {
        if (field === 'jobId') jobId = value;
    });
    form.on('file', (name, file) => {
        userObj.cv_name = file.name;
        filePath = file.path;
    });
    form.on('end', async () => {
        
        const promise1 = new Promise( async (resolve, reject) => {
            try {
                userObj.cv_path = '/cvs-' + req.userId.toString() + '_' + userObj.cv_name;
                const response = await updateUser(req.userId, userObj);
                if (response) { 
                    const promise = new Promise( (resolve, reject) => {
                        fs.rename(filePath, form.uploadDir + userObj.cv_path, (err) => {
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