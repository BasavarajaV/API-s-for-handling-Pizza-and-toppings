const Toppings = require("../models/toppings")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const User = require("../models/user")


exports.getToppingById=(req, res, next, id)=>{
    Toppings.findById(id)
    .exec((err, topping)=>{ 
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        req.topping = topping;
        // console.log("topping param",req.topping);
        next(); 
    })
}

exports.createToppings= (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        
        //destructure the fields
        const { name, category} = fields;

        if(
            !name ||
            !category 
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        // TO DO is completed for restrcition on fields
        let toppings = new Toppings(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            toppings.photo.data = fs.readFileSync(file.photo.path)
            toppings.photo.contentType = file.photo.type
        }

        // console.log(product)

        //save to the DB
        toppings.save((err, topping)=>{
            if(err){
                return res.status(400).json({
                    error: " Saving toppings in DB failed"
                })
            }
            res.json(topping)
        })
    })
} 


//listing all toopings

exports.getAllToppings=(req, res)=>{
    Toppings.find()
    .select("-photo")
    .exec((err, toppings)=>{
        if(err){
            return res.status(400).json({
                error: "No pizzas found"
            })
        }
        res.json(toppings);
    })
}

//Assign topping price
exports.setToppingsPrice= (req, res) =>{
    const topping= req.topping;
    topping.price = req.body.price;
    

    topping.save((err, updatedTopping)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to asign price for Topping"
            })
        }

        res.json({
            name: updatedTopping.name,
            price:updatedTopping.price
        });
    })
}

//getAvailbale toppings
exports.getAvaliableToppings=(req, res)=> {
    Toppings.find({available: true})
    .select("-photo")
    .exec((err, toppings)=>{
        if(err){
            return res.status(400).json({
                error: "No pizzas found"
            })
        }
        res.json(toppings);
    })
}

//choose toppings
exports.pushToppingInCartList= (req, res)=>{
    let cart=[]

    cart.push({
        id:req.topping._id,
        name:req.topping.name,
        price:req.topping.price
    })

    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {cart : cart}},
        {new: true},
        (err, item) =>{
            if(err){
                return res.status(400).json({
                      error: "Unable to save purchase list"
                })
            }
            res.json({
                message: "topping pushed to cart",
                items: item.cart
            } )
        
        }
    )

}

