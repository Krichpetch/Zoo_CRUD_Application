const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const birdSchema = new Schema({
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

const Bird = mongoose.model('Birds', birdSchema);
module.exports = Bird;