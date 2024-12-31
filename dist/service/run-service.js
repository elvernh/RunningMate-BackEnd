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
exports.RunService = void 0;
const database_1 = require("../application/database");
const run_model_1 = require("../models/run-model");
class RunService {
    static addRun(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    user_id: req.user_id, // Ensure the user exists
                },
            });
            if (!user) {
                throw new Error("User not found"); // Throw an error if the user does not exist
            }
            // Create the run
            const run = yield database_1.prismaClient.run.create({
                data: {
                    user_id: req.user_id,
                    start_time: req.start_time,
                    progress_distance: req.progress_distance,
                    progress_duration: req.progress_duration,
                    location: req.location,
                    challenge_id: req.challenge_id || null, // Optional challenge_id
                    timestamp: req.timestamp,
                    avgSpeedInKMH: req.avgSpeedInKMH,
                    caloriesBurned: req.caloriesBurned,
                    runImage: req.runImage,
                },
            });
            // Convert the Prisma Run object to RunResponse
            return (0, run_model_1.toRunResponse)(run);
        });
    }
    static deleteRun(user, run_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.run.delete({
                where: {
                    user_id: user.user_id,
                    run_id: run_id
                }
            });
            return "Data has been removed successfully";
        });
    }
}
exports.RunService = RunService;
