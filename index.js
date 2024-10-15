import express from "express";
import mongoose from "mongoose";
import cors from "cors";


// Create an express app
const app = express();

// Use middlewares
app.use(express.json())
app.use(cors())








// Listen for incoming requests
app.listen(8080, () => {
    console.log("App is listening on port 8080");
});


