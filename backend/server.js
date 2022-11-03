const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleWare");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes middlewares
app.use("/api/users", userRoute);

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
//connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))
