"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHistoryResponse = toHistoryResponse;
function toHistoryResponse(history) {
    return {
        history_id: history.history_id,
        user_id: history.user_id,
        distance: history.distance,
        duration: history.duration,
        achievement: history.achievement,
        date: history.date,
        calorie: history.calorie,
        run_id: history.run_id,
    };
}
