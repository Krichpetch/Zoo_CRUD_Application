const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const landSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Land_Animal = mongoose.model('Land_Animals', landSchema);
module.exports = Land_Animal;