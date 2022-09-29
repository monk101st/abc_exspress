const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    body: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('News', newsSchema);