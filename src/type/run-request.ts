import { Run } from "@prisma/client";
import { Request } from "express";

export interface RunRequest extends Request{
    run?: Run
}

export interface RunParams {
    run_id: number; // Adjust the type if needed, e.g., `number` if it's numeric
}