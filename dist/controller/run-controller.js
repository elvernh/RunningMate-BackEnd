"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunController = void 0;
const run_service_1 = require("../service/run-service");
class RunController {
    static addRun(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield run_service_1.RunService.addRun(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteRun(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the RunService to delete the run
                const response = yield run_service_1.RunService.deleteRun(req.user, Number(req.params.run_id));
                // Send a success response to the client
                res.status(200).json(response);
            }
            catch (e) {
                // Pass the error to the error-handling middleware
                next(e);
            }
        });
    }
}
exports.RunController = RunController;
