const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobDetailSchema = new Schema({
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    },
    description: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('jobdetails', JobDetailSchema);