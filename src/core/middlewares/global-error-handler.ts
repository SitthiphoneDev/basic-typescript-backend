import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors";

export function globalErrorHandler(
    error: unknown,
    request: Request,
    response: Response,
    next: NextFunction,
) {
    let statusCode = 500;
    let message = "";

    if (error instanceof HttpError) {
        statusCode = error.statusCode;
    }

    if (error instanceof Error) {
        console.log(`${error.name}: ${error.message}`);
        message = error.message;
    } else {
        console.log('Unnknown error');
        message = `An unknown error occurred: ${String(error)}`;
    }

    response.status(statusCode).send({
        message,
        success: false,
        date: null,
        traceStack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    });
}
