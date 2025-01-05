import { Request, Response, NextFunction } from 'express';
import { PublicUserService } from '../service/public-user-service';
import { UserRequest } from '../type/user-request';
import { PublicUserResponse } from '../models/user-model';

export class PublicUserController {
    static async getAllUsers(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const users: PublicUserResponse[] = await PublicUserService.getAllUsers();
            res.status(200).json({ data: users });
        } catch (error: unknown) {
            // Handle errors by forwarding to error handler
            if (error instanceof Error) {
                return next(new Error(`Failed to retrieve users: ${error.message}`));
            } else {
                return next(new Error('An unknown error occurred.'));
            }
        }
    }
}
