"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
exports.apiRouter = express_1.default.Router();
// Apply authMiddleware to all routes in apiRouter
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// Define authenticated routes
// apiRouter.post("/logout", authMiddleware, UserController.logout);
exports.apiRouter.post("/logout", user_controller_1.UserController.logout);
