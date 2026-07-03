import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/borrow", borrowRoutes);
app.use("/history", borrowRoutes); // Maps /history/ to borrowRoutes, so GET /history/ hits getAllBorrows

app.get("/", (req, res) => {
    res.send("Library Management API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});