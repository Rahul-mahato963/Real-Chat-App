// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import { createCorsOptions } from "./config/corsOptions.js";
import mongoose from "mongoose";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET_KEY"];

const validateEnv = () => {
    const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

    if (missingEnvVars.length) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    }
};

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json({ limit: "2mb" })); 
app.use(cookieParser());

const corsOption = createCorsOptions();
app.use(cors(corsOption));
app.options("*", cors(corsOption));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Real Chat App backend is running" });
});

app.get("/health", (req, res) => {
    const isDatabaseConnected = mongoose.connection.readyState === 1;

    return res.status(isDatabaseConnected ? 200 : 503).json({
        status: isDatabaseConnected ? "ok" : "error",
        database: isDatabaseConnected ? "connected" : "disconnected",
    });
});

app.use("/api", (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            message: "Database is not connected. Check backend environment variables and MongoDB network access.",
        });
    }

    next();
});

// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

const startServer = async () => {
    try {
        validateEnv();
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server listen at prot ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();

