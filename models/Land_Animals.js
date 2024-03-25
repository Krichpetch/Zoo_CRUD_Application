const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const landSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortDetail: {
        type: String,
        required: true,
    },
    sciName: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    habitat: {
        type: String,
        required: true
    },
    lifespan: {
        type: Number,
        required: true
    },
    fullDetail: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Land_Animal = mongoose.model('Land_Animals', landSchema);
module.exports = Land_Animal;