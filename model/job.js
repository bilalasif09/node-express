const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        index: true,
        required: [true, 'Title is required']
    },
    tags: {
        type: [String],
        index: true
    },
    uploader: { 
        type: Schema.Types.ObjectId, 
        ref: 'users'   
    },
    location: String,
    type: String,
    closing_date: Date,
    company_name: {
        type: String,
        required: [true, 'Company name is required'],
        index: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    applied: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    created_at: { type: Date, default: new Date }
});
module.exports = mongoose.model('jobs', JobSchema);