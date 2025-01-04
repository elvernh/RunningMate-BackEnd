import express from "express";
import path from "path";
import { publicRouter } from "../route/public-api";
import { apiRouter } from "../route/api";

const app = express();
app.use(express.json());

// Serve static assets (like images, etc.) from the 'assets' directory
app.use('/assets', express.static(path.join(process.cwd(), '../assets')));

// Allow parsing JSON in incoming requests


// Use the public routes (login, register, achievements, etc.)
app.use(publicRouter);

// Use the API routes (with authentication middleware, etc.)
app.use(apiRouter);

export default app;
