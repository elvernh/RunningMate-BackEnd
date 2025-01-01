import express from "express";
import path from "path";
import { publicRouter } from "../route/public-api";
import { apiRouter } from "../route/api";

const app = express();

// Serve static assets (like images, etc.) from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Allow parsing JSON in incoming requests
app.use(express.json());

// Use the public routes (login, register, achievements, etc.)
app.use(publicRouter);

// Use the API routes (with authentication middleware, etc.)
app.use(apiRouter);

export default app;
