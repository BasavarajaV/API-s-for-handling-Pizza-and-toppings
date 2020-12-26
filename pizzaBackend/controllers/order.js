const {Order, productcart } = require("../models/order")

exports.createOrder= (req,res)=>{
    req.body.order.user = req.profile ;

    const order = new Order(req.body.order)

    order.save((err, order)=>{
        if(err){
            return status(400).json({
                error: "Failed to save  your order in DB"
            })
        }

        res.json(order);
    })
}

exports.getTotalCost=(req, res)=>{
    const {products} = req.body
    console.log("Products", products);

    let totalCost =0;
    products.map(p=>{
        totalcost=totalCost+p.price;
    })

    return res.json(totalCost);
}