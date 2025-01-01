import { UserAchievement } from "@prisma/client";
import { prismaClient } from "../application/database";
import { CreateUserAchievementRequest, UserAchievementResponse, toUserAchievementResponse } from "../models/userAchievement-model";
import { ResponseError } from "../error/response-error";


export class UserAchievementService {

    static async getUserAchievement(user_id: number) {
        return await prismaClient.userAchievement.findMany({
            where: {
                user_id: user_id
            },
            include: {
                achievement: true
            }
        })
    }

    static async unlockUserAchievement(request: CreateUserAchievementRequest) {
        const userAchievement = await prismaClient.userAchievement.findFirst({
            where: {
                user_id: request.user_id,
                achievement_id: request.achievement_id
            }
        })
        if (userAchievement) {
            throw new ResponseError(400, "Achievement already unlocked!")
        }

        return await prismaClient.userAchievement.create({
            data: {
                user_id: request.user_id,
                achievement_id: request.achievement_id
            },
            include: {
                achievement: true
            }
        })
    }
}