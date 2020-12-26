const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createToppings, getAllToppings, setToppingsPrice, getToppingById , chooseTopping, getAvaliableToppings} = require("../controllers/toppings");
var router = express.Router();

//topping param
router.param("toppingId",getToppingById);

// create pizza
router.post("/toppings/create",isAdmin, createToppings);

//listing all pizza
router.get("/allToppings", getAllToppings)

//assign pizza price
router.put("/toppings/assignPrice/:toppingId", isSignedIn, isAuthenticated, isAdmin, setToppingsPrice)

//available pizzas
router.get("/availalbleToppings", getAvaliableToppings)

// //Choose toppings
// router.get("/toppings/:toppingId", chooseTopping)

module.exports = router;
