const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aquaSchema = new Schema({
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

const Aquatic_Animal = mongoose.model('Aquatic_Animals', aquaSchema);
module.exports = Aquatic_Animal;