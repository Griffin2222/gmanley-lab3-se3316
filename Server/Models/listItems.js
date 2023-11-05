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
    }
}, { timestamps: true });

const ListItems = mongoose.model('ListItems', listItemsSchema);
module.exports = ListItems;