const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createToppings, getAllToppings, setToppingsPrice, getToppingById , pushToppingInCartList, getAvaliableToppings} = require("../controllers/toppings");
const { getUserById } = require("../controllers/user");
var router = express.Router();

//All of param
router.param("userId",getUserById);

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
router.get("/toppings/:userId/:toppingId",pushToppingInCartList)


module.exports = router;
