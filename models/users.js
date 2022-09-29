const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    loginName: {type: String, required: true},
    firstName: {type: String, required: true},
    familyName: {type: String, required: true},
    userEmail: {type: String, required: true},
    bornDate: {type: Date, required: true},
    ruleActepted: {type: Boolean, required: false},
    created: {type: Date, default: Date.now},
    lastEdit: {type: Date, default: Date.now},
    userAvatar: {type: String, default: 'nopicture'},
    userRole: {type: String, default: 'norole'}

});

module.exports = mongoose.model('Users', usersSchema);