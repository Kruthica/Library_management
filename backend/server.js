import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (req, res) => {
    res.send("Library Management API is running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});