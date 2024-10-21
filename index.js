import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import advertRouter from "./routes/adverts.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database connected successfully"))
.catch((error)=>console.log("Error connecting to database", error));

// Create an express app
const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());


app.use(advertRouter);

// Listen for incoming requests
app.listen(8080, () => {
    console.log("App is listening on port 8080");
});