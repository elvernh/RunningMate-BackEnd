import  express  from "express";
import { UserController } from "../controller/user-controller";
import { AchievementController } from "../controller/achievement-controller";
import { ChallengeController } from "../controller/challenge-controller";
import { UserAchievementController } from "../controller/userAchievement-controller";

export const publicRouter = express.Router()
publicRouter.post("/api/login", UserController.login)
publicRouter.post("/api/register", UserController.register)
publicRouter.get("/api/achievements", AchievementController.getAchievements)
publicRouter.get("/api/challenges", ChallengeController.getChallenges)
publicRouter.get("/api/getUserAchievements/:user_id", UserAchievementController.getUserAchievement)
publicRouter.post("/api/unlockUserAchievement/:user_id", UserAchievementController.unlockUserAchievement)