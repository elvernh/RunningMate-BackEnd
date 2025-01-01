"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const public_api_1 = require("../route/public-api");
const api_1 = require("../route/api");
const path = require('path');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(public_api_1.publicRouter);
app.use(api_1.apiRouter);
app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
exports.default = app;
