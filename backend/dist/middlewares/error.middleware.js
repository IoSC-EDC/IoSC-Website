"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
        });
        return;
    }
    console.error("Unhandled Error:", err);
    res.status(500).json({
        success: false,
        statusCode: 500,
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
