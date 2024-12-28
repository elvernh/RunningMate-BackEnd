import { Achievement } from "@prisma/client";
import { Request } from 'express';

export interface AchievementRequest extends Request {
    achievement?: Achievement
}