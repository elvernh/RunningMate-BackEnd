import { NextFunction, Request, Response } from "express";
import { CreateRunRequest, RunResponse } from "../models/run-model";
import { RunService } from "../service/run-service";

export class RunController{
    static async addRun(req: Request, res: Response, next: NextFunction){
        try{
            const request: CreateRunRequest = req.body as CreateRunRequest
            const response: RunResponse = await RunService.addRun(request)

            res.status(200).json({
                data: response
            })
        }catch(error){
            next(error)
        }
    }
}