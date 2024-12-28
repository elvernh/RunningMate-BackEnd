import { Run } from "@prisma/client";
import { Request } from "express";

export interface RunRequest extends Request{
    run?: Run
}