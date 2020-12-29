const express = require("express");
const { getPizzaByID, getClientId, testClientId } = require("../controllers/pizza");
const { getUserById,addUser, addAdmin, getTotalCost } = require("../controllers/user");
var router = express.Router();

//user param
router.param("userId",getUserById);

router.param("pizzaId",getPizzaByID);

// router.param("clientId", getClientId)

// assuming that there are signup routes. this root will hardcode tha user and admin data into DB
router.post("/adduser", addUser)

router.post("/addAdmin", addAdmin)

//totalCost

router.get("/totalcost/:userId",getTotalCost)

// //testing param
// router.get("/test/:clientId", testClientId );


module.exports = router;
