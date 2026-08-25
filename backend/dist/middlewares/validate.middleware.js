"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const validateRequest = (schema) => {
    return async (req, _res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map(err => `${err.path.join(".")}: ${err.message}`);
                next(new ApiError_1.ApiError(400, "Validation Failed", errorMessages));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateRequest = validateRequest;
