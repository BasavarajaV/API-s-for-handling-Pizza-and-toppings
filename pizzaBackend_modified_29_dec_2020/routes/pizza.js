const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createPizza, getAllPizza, setPizzaPrice, getPizzaByID, getAvaliablePizza, pushPizzaInCartList} = require("../controllers/pizza");
const { getUserById} = require("../controllers/user");
var router = express.Router();

// //all of params
router.param("userId",getUserById);

router.param("pizzaId",getPizzaByID);


//All of actual routes

// create pizza
router.post("/pizza/create",isSignedIn, isAuthenticated, isAdmin, createPizza);

//listing all pizza
router.get("/allPizzas", getAllPizza)

//assign pizza price
router.put("/pizza/assignPrice/:pizzaId", isSignedIn, isAuthenticated, isAdmin, setPizzaPrice)

//available pizzas
router.get("/availalblePizzas", getAvaliablePizza)


//Choose pizza

router.get("/pizza/:userId/:pizzaId",pushPizzaInCartList)



module.exports = router;