import express from "express";
import { PORT } from "./config.js";

// create express app
const app = express();

app.get("/", (req,res) => {
    return res.status(234).send("Welcome to Book Store Fullstack");
});

// listen to requests
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
});