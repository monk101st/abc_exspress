const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    roleName: {type: String, required: true},
    description: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Roles', rolesSchema);