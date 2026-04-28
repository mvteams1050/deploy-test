import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);

// global error handler
app.use(errorHandler);



export default app;
