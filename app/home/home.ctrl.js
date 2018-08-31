const UserModel = require('../../model/user');
const JobModel = require('../../model/job');
const ApiHelper = require('../../api/api_helper');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { dateFormat, jsonFormatUserName } = require('../app_helper');
const axios = require('axios');
const { getAllJobs } = require('../../model/query_helper');

exports.postajobPost = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false
    };
    res.render('postajob', dataHash);
};
exports.postajob = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false
    };
    res.render('postajob', dataHash);
};
exports.user = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false
    };
    try {
        const response = await UserModel.findById(req.params.id);
        dataHash.data = response;
    }
    catch(err) {
        dataHash.data = err;
    };
    res.render('user', dataHash);
};
exports.job = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false,
        helpers: {
            jsonFormatUserName: jsonFormatUserName
        }
    };
    try {
        const response = await JobModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'uploader',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]);
        dataHash.data = response[0];
    }
    catch(err) {
        dataHash.data = err;
    };
    console.log("Single job", dataHash.data);
    res.render('job', dataHash);
};
exports.index = async (req, res) => {
    let dataHash = {
        data: null,
        isLoggedIn: req.session.token ? true : false,
        countries: [],
        helpers: {
            dateFormat: dateFormat,
            jsonFormatUserName: jsonFormatUserName
        }
    };
    const Promise1 = new Promise( async (resolve, reject) => {
        try {
            const restCountries = await axios.get('https://restcountries.eu/rest/v2/all?fields=name')
            dataHash.countries = restCountries.data;
            resolve();
        }
        catch(err) {
            console.log("error fetching countries");
            reject();
        };
    });
    const Promise2 = new Promise( async (resolve, reject) => {
        try {
            const response = await getAllJobs();
            dataHash.data = response;
            resolve();
        }
        catch(err) {
            dataHash.data = err;
            reject();
        };
    });
    try {
        await Promise.all([Promise1, Promise2])
    }
    catch (err) {
        console.log("Error resolving promises home", err);
        dataHash.data = err;
    };
    
    console.log("data Hash", dataHash);
    res.render('home', dataHash);
    
};
exports.featured = (req, res) => {
    console.log("Featured Token", req.session.token);
    const isLoggedIn = req.session.token ? true : false;
    res.render('featured', {
        data: 'Featured',
        isLoggedIn: isLoggedIn
    });
};
exports.blogs = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('blogs', {
        data: 'Blogs',
        isLoggedIn: isLoggedIn
    });
};
exports.search = (req, res) => {
    const isLoggedIn = req.session.token ? true : false;
    res.render('search', {
        data: 'Search',
        isLoggedIn: isLoggedIn
    });
};
