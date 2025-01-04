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
exports.UserAchievementService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
class UserAchievementService {
    static getUserAchievement(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.userAchievement.findMany({
                where: {
                    user_id: user_id
                },
                include: {
                    achievement: true
                }
            });
        });
    }
    static unlockUserAchievement(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAchievement = yield database_1.prismaClient.userAchievement.findFirst({
                where: {
                    user_id: request.user_id,
                    achievement_id: request.achievement_id
                }
            });
            if (userAchievement) {
                throw new response_error_1.ResponseError(400, "Achievement already unlocked!");
            }
            return yield database_1.prismaClient.userAchievement.create({
                data: {
                    user_id: request.user_id,
                    achievement_id: request.achievement_id
                },
                include: {
                    achievement: true
                }
            });
        });
    }
}
exports.UserAchievementService = UserAchievementService;
