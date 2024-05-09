const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    content: {type: String, required: true},
    votes: {type: Number, default: 0},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date}
});

module.exports = mongoose.model('Comment', schema);