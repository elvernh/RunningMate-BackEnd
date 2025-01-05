"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.publicRouter = void 0;
const express_1 = __importStar(require("express"));
const user_controller_1 = require("../controller/user-controller");
const achievement_controller_1 = require("../controller/achievement-controller");
const challenge_controller_1 = require("../controller/challenge-controller");
const userAchievement_controller_1 = require("../controller/userAchievement-controller");
const public_user_controller_1 = require("../controller/public-user-controller");
exports.publicRouter = express_1.default.Router();
exports.router = (0, express_1.Router)();
exports.publicRouter.post("/api/login", user_controller_1.UserController.login);
exports.publicRouter.post("/api/register", user_controller_1.UserController.register);
exports.publicRouter.get("/api/achievements", achievement_controller_1.AchievementController.getAchievements);
exports.publicRouter.get("/api/challenges", challenge_controller_1.ChallengeController.getChallenges);
exports.publicRouter.get("/users", public_user_controller_1.PublicUserController.getAllUsers);
exports.publicRouter.get("/api/getUserAchievements/:user_id", userAchievement_controller_1.UserAchievementController.getUserAchievement);
exports.publicRouter.post("/api/unlockUserAchievement/:user_id", userAchievement_controller_1.UserAchievementController.unlockUserAchievement);
exports.publicRouter.delete("/api/deleteUser/:user_id", user_controller_1.UserController.deleteUser);
