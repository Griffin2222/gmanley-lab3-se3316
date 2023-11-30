const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmcaSchema = new Schema({
    id:{
        type:Number,
        requires:true
    },
    dateRequestReceived:{
        type:Date,
        required:true
    },
    dateDisputeReceived:{
        type:Date,
        required:true
    },
    dateNoticeSent:{
        type:Date,
        required:true
    },
    notes:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
});

const DMCA = mongoose.model('DMCA', dmcaSchema);
module.exports = DMCA;