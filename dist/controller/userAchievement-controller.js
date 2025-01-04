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
exports.UserAchievementController = void 0;
const userAchievement_service_1 = require("../service/userAchievement-service");
class UserAchievementController {
    static getUserAchievement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = Number(req.params.user_id);
                const userAchievements = yield userAchievement_service_1.UserAchievementService.getUserAchievement(user_id);
                res.status(200).json({ data: userAchievements });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static unlockUserAchievement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const unlockAchievement = yield userAchievement_service_1.UserAchievementService.unlockUserAchievement(request);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserAchievementController = UserAchievementController;
