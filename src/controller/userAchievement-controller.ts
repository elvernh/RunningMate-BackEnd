import { Request, Response, NextFunction } from 'express';
import { CreateUserAchievementRequest, UserAchievementResponse, toUserAchievementResponse } from "../models/userAchievement-model";
import { UserAchievementService } from "../service/userAchievement-service";

export class UserAchievementController {

    static async getUserAchievement(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = Number(req.params.user_id);
            const userAchievements = await UserAchievementService.getUserAchievement(user_id);
            res.status(200).json({ data: userAchievements });
        } catch (error) {
            next(error);
        }
    }

    static async unlockUserAchievement(req: Request, res: Response, next: NextFunction) {    
        try {
            const request = req.body as CreateUserAchievementRequest;
            const unlockAchievement = await UserAchievementService.unlockUserAchievement(request);
}
        catch (error) {
            next(error);
        }
    }
    
}