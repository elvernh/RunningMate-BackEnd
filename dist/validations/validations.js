"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    //T tipe data dari schema
    static validate(schema, data) {
        return schema.parse(data);
    }
}
exports.Validation = Validation;
