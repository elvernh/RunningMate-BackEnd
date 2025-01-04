"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserAchievementResponse = toUserAchievementResponse;
function toUserAchievementResponse(userAchievement) {
    return {
        user_achievement_id: userAchievement.user_achievement_id,
        user_id: userAchievement.user_id,
        achievement_id: userAchievement.achievement_id,
        achievement_name: userAchievement.achievement.name,
        achievement_description: userAchievement.achievement.description,
        achievement_image: userAchievement.achievement.image
    };
}
