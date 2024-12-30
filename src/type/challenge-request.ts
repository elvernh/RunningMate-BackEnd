import { Challenge } from "@prisma/client";
import { Request } from 'express';

export interface ChallengeRequest extends Request {
    challenge?: Challenge
}