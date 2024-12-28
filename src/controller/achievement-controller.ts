import { Request, Response, NextFunction } from 'express';
import { CreateAchievementRequest, AchievementResponse, toAchievementResponse} from '../models/achievement-model';
import { AchievementRequest } from '../type/achievement-request';

export class AchievementController {
    static async getAchievements(req: Request, res: Response, next: NextFunction) {
        try {
            const achievements: AchievementResponse[] = []
            res.status(200).json({
                data: achievements
            })
        } catch (error) {
            next(error)
        }
    }
}