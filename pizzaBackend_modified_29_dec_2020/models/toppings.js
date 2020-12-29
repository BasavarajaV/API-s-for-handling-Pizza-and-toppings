const mongoose= require("mongoose")

const toppingsSchema= new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        maxlength: 32,
        required:true
    },

    category:{
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },

    price:{
        type: Number,
        maxlength: 32,
        trim: true
    },

    available:{
        type: Boolean,
        default: true,
        required:true
    },

    photo:{
        data: Buffer,
        contentType: String
    }
},

{ timestamps: true}

);

module.exports= mongoose.model("Toppings",toppingsSchema) 