"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const public_api_1 = require("../route/public-api");
const api_1 = require("../route/api");
const app = (0, express_1.default)();
// Serve static assets (like images, etc.) from the 'assets' directory
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
// Allow parsing JSON in incoming requests
app.use(express_1.default.json());
// Use the public routes (login, register, achievements, etc.)
app.use(public_api_1.publicRouter);
// Use the API routes (with authentication middleware, etc.)
app.use(api_1.apiRouter);
exports.default = app;
