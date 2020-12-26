const mongoose= require("mongoose");
const {ObjectId}= mongoose.Schema;

const ProductCartSchema= new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Pizza"
    },

    name: String,
    count: Number,
    price: Number
});

const productcart= mongoose.model("Productcart",ProductCartSchema);

const OrderScehma = new mongoose.Schema({
    products: [ProductCartSchema],
    amount: {type: Number},
    user: {
        type: ObjectId,
        ref:"User"
    }
}, {timestamps: true}
);

const Order= mongoose.model("Order",OrderScehma)

module.exports = {Order, productcart };