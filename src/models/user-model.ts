import { User } from "@prisma/client"
import { AchievementResponse } from "./achievement-model"
import { prismaClient } from "../application/database"

export interface RegisterUserRequest {
    username: string
    email: string
    password: string
}

export interface LoginUserRequest {
    email: string
    password: string
}

export interface UserResponse {
    token?: string
    username: string
    email: string
    password: string
}

export interface PublicUserResponse{
    username: string
    level: number
    totalFriends: number
    achievements: AchievementResponse[]
}

export async function toPublicUserResponse(user: User): Promise<PublicUserResponse>{
    const friendCount = await prismaClient.friendlist.count({
        where:{
            user_id: user.user_id,
            status: "accepted"
        }
    })

    const achievements = await prismaClient.userAchievement.findMany({
        where: { user_id: user.user_id },
        include: {
            achievement: true, // Include the achievement details
        },
    });

    // Map achievements to the response format
    const achievementResponses: AchievementResponse[] = achievements.map((userAchievement) => ({
        achievement_id: userAchievement.achievement.achievement_id,
        name: userAchievement.achievement.name,
        description: userAchievement.achievement.description,
        image: userAchievement.achievement.image
    }));

    // Return the public user response
    return {
        username: user.username,
        level: user.level,
        totalFriends: friendCount,
        achievements: achievementResponses,
    };
}
// export function toUserList(prismaUser: User[]): 

export function toUserResponse(user: User): UserResponse{
    return {
        token: user.token ?? "",
        username: user.username,
        email: user.email,
        password: user.password
    }
}