require('dotenv').config()


const mongoose = require('mongoose');
const express= require("express");
const app= express();

const bodyParser= require("body-parser")
const cookieParser= require("cookie-parser")
const cors= require("cors")


//my routes
const pizzaRoutes= require("./routes/pizza")
const userRoutes= require("./routes/user")
const toppingsRoutes= require("./routes/toppings")
const orderRoutes= require("./routes/order")


// DB connection
mongoose.connect(process.env.DATABASE, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    ).then(() =>{
        console.log("DB CONNECTED")
});


//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", pizzaRoutes);
app.use("/api", userRoutes);
app.use("/api", toppingsRoutes);
app.use("/api", orderRoutes);


//port

const port= process.env.PORT || 8000;

//starting a server
app.listen(port,() => {
    console.log(`app is running at ${port}`);
});