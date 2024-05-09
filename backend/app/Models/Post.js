const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    stack: {type: Schema.Types.ObjectId, ref: 'Stack', required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    votes: {type: Number, default: 0},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date}
});

module.exports = mongoose.model('Post', schema);