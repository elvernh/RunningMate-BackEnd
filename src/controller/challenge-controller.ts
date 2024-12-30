import { Request, Response, NextFunction } from 'express';
import { CreateChallengeRequest, ChallengeResponse, toChallengeResponse } from '../models/challenge-model';
import { ChallengeRequest } from '../type/challenge-request';
import { ChallengeService } from '../service/challenge-service';

export class ChallengeController {
    static async getChallenges(req: Request, res: Response, next: NextFunction) {
        try {
            const challenges: ChallengeResponse[] = await ChallengeService.getChallenges();
            res.status(200).json({
                data: challenges
            })
        } catch (error) {
            next(error)
        }
    }
}