import { UserAchievement, Achievement } from "@prisma/client";

export interface CreateUserAchievementRequest {
    user_id: number;
    achievement_id: number;
}

export interface UserAchievementResponse {
    user_achievement_id: number;
    user_id: number;
    achievement_id: number;
    achievement_name: string;
    achievement_description: string;
    achievement_image: string;
}

export function toUserAchievementResponse(userAchievement: UserAchievement & { achievement: Achievement }): UserAchievementResponse {
    return {
        user_achievement_id: userAchievement.user_achievement_id,
        user_id: userAchievement.user_id,
        achievement_id: userAchievement.achievement_id,
        achievement_name: userAchievement.achievement.name,
        achievement_description: userAchievement.achievement.description,
        achievement_image: userAchievement.achievement.image
    }
}