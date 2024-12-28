import { prismaClient } from "../application/database";
import { CreateRunRequest, RunResponse, toRunResponse } from "../models/run-model";

export class RunService{
    static async addRun(req: CreateRunRequest): Promise<RunResponse> {
        // Check if the user exists
        const user = await prismaClient.user.findUnique({
          where: {
            user_id: req.user_id, // Ensure the user exists
          },
        });
    
        if (!user) {
          throw new Error("User not found"); // Throw an error if the user does not exist
        }
    
        // Create the run
        const run = await prismaClient.run.create({
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
        return toRunResponse(run);
      }
}