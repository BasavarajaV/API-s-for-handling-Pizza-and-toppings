const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const crypto = require('crypto');
const uuidv1= require('uuid/v1');


var userSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },

    lastname:{
        type: String,
        maxlength: 32,
        trim: true,
    },

    email:{
        type:String,
        trim:true,
        required: true,
        unique:true
    },

    userinfo:{
        type:String,
        trim: true
    },

    role:{
        type:Number,
        default: 0
    },

    cart:{
        type:Array,
        default:[]
    },

    purchases:{
        type: Array,
        default: []
    }
},
{ timestamps: true}
);


module.exports =  mongoose.model("User",userSchema)


