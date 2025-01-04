import { run } from "node:test";
import { prismaClient } from "../application/database";
import {
  CreateRunRequest,
  RunResponse,
  toRunResponse,
} from "../models/run-model";
import { RunRequest } from "../type/run-request";
import { User } from "@prisma/client";

export class RunService {
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
        // runImage: req.runImage,
      },
    });

    // Convert the Prisma Run object to RunResponse
    return toRunResponse(run);
  }

  static async deleteRun(user: User, run_id: number): Promise<String>{
    await prismaClient.run.delete({
      where:{
        user_id: user.user_id,
        run_id: run_id
      }
    })

    return "Data has been removed successfully"
  }

  // static async deleteRun(req: CreateRunRequest): Promise<RunResponse> {
  //   const { run_id } = req.params;
  //   const { user_id } = req.params;
  //   // Validate that `run_id` is provided
  //   if (!run_id) {
  //     throw new Error("Run ID is required!");
  //   }
  //   if (!user_id) {
  //     throw new Error("User ID is required!");
  //   }

  //   try {
  //     // Delete the run by converting `run_id` to a number
  //     const run = await prismaClient.run.delete({
  //       where: { run_id: Number(run_id), user_id: Number(user_id) },
  //     });

  //     return run;
  //   } catch (error) {
  //     // Handle cases where the run is not found or deletion fails
  //     throw new Error(`Unable to delete run with ID ${run_id}: ${error}`);
  //   }
  // }
}
