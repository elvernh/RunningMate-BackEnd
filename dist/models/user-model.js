"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPublicUserResponse = toPublicUserResponse;
exports.toPublicUserResponseList = toPublicUserResponseList;
exports.toUserResponse = toUserResponse;
const database_1 = require("../application/database");
function toPublicUserResponse(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const totalFriends = yield database_1.prismaClient.friendlist.count({
            where: {
                user_id: user.user_id,
                status: "accepted",
            },
        });
        // Fetch the user's achievements, including details from the `Achievement` model
        const achievements = yield database_1.prismaClient.userAchievement.findMany({
            where: { user_id: user.user_id },
            include: {
                achievement: true, // Include the related achievement details
            },
        });
        // Map the fetched achievements to the `AchievementResponse` format
        const achievementResponses = achievements.map((userAchievement) => ({
            achievement_id: userAchievement.achievement.achievement_id,
            name: userAchievement.achievement.name,
            description: userAchievement.achievement.description,
            image: userAchievement.achievement.image
        }));
        // Return the public user response
        return {
            username: user.username,
            level: user.level,
            totalFriends,
            achievements: achievementResponses,
        };
    });
}
function toPublicUserResponseList(prismaUsers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use Promise.all to resolve all individual user responses in parallel
        return yield Promise.all(prismaUsers.map((user) => toPublicUserResponse(user)));
    });
}
// export function toUserList(prismaUser: User[]): 
function toUserResponse(user) {
    var _a;
    return {
        token: (_a = user.token) !== null && _a !== void 0 ? _a : "",
        username: user.username,
        email: user.email,
        password: user.password
    };
}
