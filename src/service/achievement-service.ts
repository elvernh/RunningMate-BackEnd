import { Achievement } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateAchievementRequest, AchievementResponse, toAchievementResponse } from "../models/achievement-model";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class AchievementService {
    static async getAchievements(): Promise<AchievementResponse[]> {
        try {
            const achievements: Achievement[] = await prismaClient.achievement.findMany({})
            return achievements.map(toAchievementResponse)
        } catch (error) {
            throw new ResponseError(401, "Invalid token")
        }
    }
}
