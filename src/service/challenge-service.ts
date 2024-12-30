import { Challenge } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { CreateChallengeRequest, ChallengeResponse, toChallengeResponse } from "../models/challenge-model";
import { Validation } from "../validations/validations";

export class ChallengeService {
    static async getChallenges(): Promise<ChallengeResponse[]> {
        try {
            const challenges: Challenge[] = await prismaClient.challenge.findMany({})
            return challenges.map(toChallengeResponse)
        } catch (error) {
            throw new ResponseError(401, "Invalid token")
        }
    }
}