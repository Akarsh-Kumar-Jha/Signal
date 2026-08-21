import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import graphRoutes from "./routes/graphRoutes.js";

const app = express();

// Enable CORS for all cross-origin frontend requests
app.use(cors());

app.use(express.json());

// Routes
app.use("/health", healthRoutes);
app.use("/api/health", healthRoutes);
app.use("/analyze", graphRoutes);
app.use("/api/analyze", graphRoutes);

export default app;
