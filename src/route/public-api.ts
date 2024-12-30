import  express  from "express";
import { UserController } from "../controller/user-controller";
import { AchievementController } from "../controller/achievement-controller";
import { ChallengeController } from "../controller/challenge-controller";

export const publicRouter = express.Router()
publicRouter.post("/api/login", UserController.login)
publicRouter.post("/api/register", UserController.register)
publicRouter.get("/api/achievements", AchievementController.getAchievements)
publicRouter.get("/api/getChallenges", ChallengeController.getChallenges)