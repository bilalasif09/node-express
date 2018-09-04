const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobDetailSchema = new Schema({
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    },
    about: {
        type: String,
        required: true
    },
    requirements: [String],
    responsibilities: [String],
    offer: [String],
    more_details: String
});
module.exports = mongoose.model('jobdetails', JobDetailSchema);