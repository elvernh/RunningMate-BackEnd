"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const achievement_controller_1 = require("../controller/achievement-controller");
const challenge_controller_1 = require("../controller/challenge-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/login", user_controller_1.UserController.login);
exports.publicRouter.post("/api/register", user_controller_1.UserController.register);
exports.publicRouter.get("/api/achievements", achievement_controller_1.AchievementController.getAchievements);
exports.publicRouter.get("/api/getChallenges", challenge_controller_1.ChallengeController.getChallenges);
