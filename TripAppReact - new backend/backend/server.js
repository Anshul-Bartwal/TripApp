// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import placeRoutes from "./routes/placeRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware to allow JSON request bodies
app.use(express.json());

// Enable CORS so React (port 5173) can access backend (port 3000)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}));

// Use routes
app.use("/api/places", placeRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
