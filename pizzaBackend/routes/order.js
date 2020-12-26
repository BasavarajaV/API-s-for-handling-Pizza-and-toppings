const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { createOrder, getTotalCost } = require("../controllers/order");
const { pushOrderInPurchaseList } = require("../controllers/user");
const router = require("./toppings");

//create order or choose pizza & toppings
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList,createOrder)

//get total cost
router.post("/order/makePayment/:userId", getTotalCost)

module.exports = router;
