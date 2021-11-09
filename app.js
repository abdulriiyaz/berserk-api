//import express
const express = require("express");
const app = express();
const volleyball = require("volleyball");
const dotenv = require("dotenv");

//import port from .env

//import router
const berserkApi = require("./routes/api/index");

dotenv.config();
app.use(express.json());
app.use(volleyball);
app.use("/api/character", berserkApi);

app.get("/", (req, res, next) => {
    //console.log("Hello World");
    res.send("Welcome to the Berserk API, Struggler!");
});

function notFound(req, res, next) {
    res.status(404);
    const error = new Error("Not Found - " + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
