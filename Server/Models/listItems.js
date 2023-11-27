const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listItemsSchema = new Schema({
    listName: {
        type: String,
        required: true
    },
    ids: {
        type: Array,
        required: true
    },
    owner:{
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Array,
        required: true  
    },
    comment: {
        type: Array,
        required: true
    },
    additionalInfo:{
        type: String,
        required: true
    }
}, { timestamps: true });

const ListItems = mongoose.model('ListItems', listItemsSchema);
module.exports = ListItems;