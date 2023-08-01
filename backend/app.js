import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.js"
import cors from 'cors';

// Route Imports
import user from "./routes/userRoutes.js";

dotenv.config({ path: "backend/config/config.env" })

export const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies (for forms with   
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:4200'
    }
))

// Route
app.use("/api/v1", user);


// middleware for error
app.use(errorMiddleware)


