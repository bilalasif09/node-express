const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    uploader: { 
        type: Schema.Types.ObjectId, 
        ref: 'users'   
    },
    interested: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    applied: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    created_at: { type: Date, default: new Date }
});
module.exports = mongoose.model('jobs', JobSchema);