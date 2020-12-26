const mongoose= require("mongoose")
const {ObjectId}= mongoose.Schema;


const pizzaSchema= new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        maxlength: 32,
        required:true
    },

    description:{
        type: String,
        trim: true,
        maxlength: 2000,
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

    size:{
        type:String,
        trim: true,
        maxlength: 32
    },

    crust:{
        type:String,
        trim: true,
        maxlength: 32
    },

    photo:{
        data: Buffer,
        contentType: String
    },

    toppings:{
        type:ObjectId,
        ref:"Toppings"
    }
},

{ timestamps: true}

);

module.exports= mongoose.model("Pizza",pizzaSchema)

