import { Achievement } from "@prisma/client";

export interface CreateAchievementRequest {
    name: string;
    description: string;
    image: string;
}

export interface AchievementResponse {
    achievement_id: number;
    name: string;
    description: string;
    image: string;
}

export function toAchievementResponse(achievement: Achievement): AchievementResponse {
    return {
        achievement_id: achievement.achievement_id,
        name: achievement.name,
        description: achievement.description,
        image: achievement.image
    }
}
