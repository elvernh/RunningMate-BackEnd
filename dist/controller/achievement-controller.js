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
exports.AchievementController = void 0;
const achievement_service_1 = require("../service/achievement-service");
class AchievementController {
    static getAchievements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const achievements = yield achievement_service_1.AchievementService.getAchievements();
                res.status(200).json({ data: achievements });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AchievementController = AchievementController;
