const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type: Boolean,
        required:true,
    }
});

const Users = mongoose.model('User', userSchema);
module.exports = Users;