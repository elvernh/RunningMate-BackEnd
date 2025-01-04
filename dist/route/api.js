"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const run_controller_1 = require("../controller/run-controller");
exports.apiRouter = express_1.default.Router();
// Apply authMiddleware to all routes in apiRouter
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// Define authenticated routes
// apiRouter.post("/logout", authMiddleware, UserController.logout);
//users
// apiRouter.get("/api/users", UserController.getAllUsers) //getAllUsers masih error
// apiRouter.get("/api/users/:user_id", UserController.getUser)
//run
exports.apiRouter.post("/api/run", run_controller_1.RunController.addRun);
exports.apiRouter.delete("/api/run/:run_id", run_controller_1.RunController.deleteRun);
exports.apiRouter.get("/api/user/:userId(\\d+");
exports.apiRouter.post("/api/logout", user_controller_1.UserController.logout);
