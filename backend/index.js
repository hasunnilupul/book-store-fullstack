import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import router from "./router/index.js";

// Determine the environment and load the corresponding .env file
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

// Load environment variables from the specified .env file
configDotenv({ path: envFile });

// create express app
const app = express();

// cors options
const corsOptions = {
    origin: process.env.FRONTEND_HOST,
    methods: process.env.ALLOWED_HTTP_METHODS,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// enable cors with the configurations
app.use(cors(corsOptions));

// middleware for parsing json
app.use(express.json());

app.use("/api", router);

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("Application connected to database.");

        // listen to http requests
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`)
        });
    })
    .catch((err) => { console.error(err.message); });