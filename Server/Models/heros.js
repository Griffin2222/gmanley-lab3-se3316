const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const herosSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    eyeColor: {
        type: String,
        required: true
    },
    race: {
        type: String,
    },
    hairColor: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    publisher: {
        type: String
    },
    skinColor: {
        type: String,
        required: true
    },
    alignment: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    }
}, { timestamps: true });

const Heros = mongoose.model('Heros', herosSchema);
module.exports = Heros;