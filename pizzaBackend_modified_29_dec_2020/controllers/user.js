const User = require("../models/user");



exports.getUserById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        // console.log("from param",req.profile);
        next();
    })

    
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

exports.getTotalCost=(req, res)=>{
    
    const user=req.profile

    // console.log("in cost method", user);

    // res.json({
    //     userid: master._id
    // })

    User.findOne({_id: user._id})
    .exec((err, user)=>{
        if(err){
            return res.status(400).json({
                error:"User not found in DB"
            })
        }

        let totalCost=0;
        user.cart.map(item=>{
            totalCost= totalCost+ item.price
        })

        res.json({
            total_cost:totalCost
        })
    })
    
}

