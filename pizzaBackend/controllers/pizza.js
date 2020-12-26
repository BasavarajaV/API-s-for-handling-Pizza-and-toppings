const Pizza = require("../models/pizza")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const {Order, ProductCartSchema } = require("../models/order")


exports.getPizzaByID=(req, res, next, id)=>{
    Pizza.findById(id)
    .exec((err, pizza)=>{ 
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        req.pizza = pizza;
        console.log("i am into param");
        next(); 
    })
}

exports.createPizza= (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        
        //destructure the fields
        const { name, description, available} = fields;

        if(
            !name ||
            !description ||
            !available
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        
        let newPizza = new Pizza(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            newPizza.photo.data = fs.readFileSync(file.photo.path)
            newPizza.photo.contentType = file.photo.type
        }

        // console.log(product)

        //save to the DB
        newPizza.save((err, piza)=>{
            if(err){
                return res.status(400).json({
                    error: " Saving pizza in DB failed"
                })
            }
            res.json(piza)
        })
    })
} 


//listing all pizzas

exports.getAllPizza=(req, res)=>{
    Pizza.find()
    .select("-photo")
    .exec((err, pizzas)=>{
        if(err){
            return res.status(400).json({
                error: "No pizzas found"
            })
        }
        res.json(pizzas);
    })
}

exports.setPizzaPrice= (req, res) =>{
    const pizza= req.pizza;
    pizza.price = req.body.price;
    

    pizza.save((err, updatedPizza)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to asign price for pizza"
            })
        }

        res.json({
            name: updatedPizza.name,
            price:updatedPizza.price
        });
    })
}

//user

exports.getAvaliablePizza=(req, res)=> {
    Pizza.find({available: true})
    .select("-photo")
    .exec((err, pizzas)=>{
        if(err){
            return res.status(400).json({
                error: "No pizzas found"
            })
        }
        res.json(pizzas);
    })
}

//choose pizza
exports.choosePizza=(req, res)=>{
    console.log(req.pizza);

}




