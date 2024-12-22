import { ZodType, z } from "zod";

export class UserValidation{
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100).regex(/^\S+$/, "Username cannot contain spaces"),
        email: z.string().min(1).max(150),
        password: z.string().min(1).max(100),
    });
    
    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(150),
        password: z.string().min(1).max(100),
    });
}