"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAchievementResponse = toAchievementResponse;
function toAchievementResponse(achievement) {
    return {
        achievement_id: achievement.achievement_id,
        name: achievement.name,
        description: achievement.description,
        image: achievement.image
    };
}
