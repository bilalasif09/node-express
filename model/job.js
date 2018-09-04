const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    tags: [String],
    uploader: { 
        type: Schema.Types.ObjectId, 
        ref: 'users'   
    },
    country: String,
    is_remote: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    applied: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    created_at: { type: Date, default: new Date }
});
module.exports = mongoose.model('jobs', JobSchema);