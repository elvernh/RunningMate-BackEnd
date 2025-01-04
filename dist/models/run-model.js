"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRunResponse = toRunResponse;
function toRunResponse(run) {
    return {
        run_id: run.run_id,
        user_id: run.user_id,
        start_time: run.start_time,
        progress_distance: run.progress_distance,
        progress_duration: run.progress_duration,
        location: run.location,
        challenge_id: run.challenge_id,
        timestamp: run.timestamp,
        avgSpeedInKMH: run.avgSpeedInKMH,
        caloriesBurned: run.caloriesBurned,
        runImage: run.runImage
    };
}
