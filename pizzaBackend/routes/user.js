const express = require("express");
const { addUser, addAdmin } = require("../controllers/user");
var router = express.Router();


// assuming that there are signup routes. this root will hardcode tha user and admin data into DB
router.post("/adduser", addUser)

router.post("/addAdmin", addAdmin)



module.exports = router;
