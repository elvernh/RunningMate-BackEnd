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
exports.ChallengeController = void 0;
const challenge_service_1 = require("../service/challenge-service");
class ChallengeController {
    static getChallenges(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const challenges = yield challenge_service_1.ChallengeService.getChallenges();
                res.status(200).json({
                    data: challenges
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ChallengeController = ChallengeController;
