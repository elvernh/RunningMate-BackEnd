import { NextFunction, Request, Response } from "express";
import { CreateRunRequest, RunResponse } from "../models/run-model";
import { RunService } from "../service/run-service";
import { RunRequest } from "../type/run-request";
import { User } from "@prisma/client";
import { UserRequest } from "../type/user-request";

export class RunController {
  static async addRun(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateRunRequest = req.body as CreateRunRequest;
      const response: RunResponse = await RunService.addRun(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRun(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Call the RunService to delete the run
      const response = await RunService.deleteRun(
        req.user!,
        Number(req.params.run_id)
      );

      // Send a success response to the client
      res.status(200).json(response);
    } catch (e) {
      // Pass the error to the error-handling middleware
      next(e);
    }
  }
}
