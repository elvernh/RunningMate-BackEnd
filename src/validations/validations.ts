import { ZodType } from "zod";

export class Validation{
    //T tipe data dari schema
    static validate<T>(schema: ZodType, data: T): T{
        return schema.parse(data)
    }
}