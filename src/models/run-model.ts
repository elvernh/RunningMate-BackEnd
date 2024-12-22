import { Run } from "@prisma/client";

export interface CreateRunRequest {
    user_id: number,
    start_time: Date;
    progress_distance: number;
    progress_duration: number;
    location: string;
    challenge_id?: number;
}

export interface RunResponse {
    run_id: number;
    user_id: number;
    start_time: Date;
    progress_distance: number;
    progress_duration: number;
    location: string;
    challenge_id?: number | null;
}

export function toRunResponse(run: Run): RunResponse {
    return {
        run_id: run.run_id,
        user_id: run.user_id,
        start_time: run.start_time,
        progress_distance: run.progress_distance,
        progress_duration: run.progress_duration,
        location: run.location,
        challenge_id: run.challenge_id
    }
}