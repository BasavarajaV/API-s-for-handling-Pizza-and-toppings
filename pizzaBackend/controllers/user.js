const { Order, ProductCartSchema } = require("../models/order");
const User = require("../models/user");



exports.getUserById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        console.log(req.profile);
    })

    next();
}

//adduser method: hardcoding the data
exports.addUser= (req, res)=>{
    let user= new User({
        name:"Basavaraja",
        lastname:"kumbar",
        email:"basavarajkv.kumbar@gmail.com",
        role:0
    })

    user.save((err, user)=>{
        if(err){
            return res.status(400).json({
                error: " Saving user in DB failed"
            })
        }
        res.json(user)
    })
}

exports.addAdmin=(req, res)=>{
    let admin= new User({
        name:"Triofi",
        lastname:"technologies PVT",
        role: 1
    })

    admin.save((err, admin)=>{
        if(err){
            return res.status(400).json({
                error: " Saving admin in DB failed"
            })
        }
        res.json(admin);
    })
}

exports.userPurchaseList = (req, res)=>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: " No Order in this account"
            })
        }
        res.json(order)

    })
}


exports.pushOrderInPurchaseList = (req,res, next) =>{
    let purchases=[]
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id : product._id,
            name: product.name,
            amount : req.body.order.amount,
        })
    })
    
    //store this in DB

    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases : purchases}},
        {new: true},
        (err, purchases) =>{
            if(err){
                return res.status(400).json({
                      error: "Unable to save purchase list"
                })
            }
            next();
        }
    )

    
}