import { History } from "@prisma/client";

export interface CreateHistoryRequest {
    user_id: number;
    distance: number;
    duration: number;
    achievement?: number;
    date: Date;
    calorie: number;
    run_id: number;
}

export interface HistoryResponse {
    history_id: number;
    user_id: number;
    distance: number;
    duration: number;
    achievement?: number | null;
    date: Date;
    calorie: number;
    run_id: number;
}

export function toHistoryResponse(history: History): HistoryResponse {
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