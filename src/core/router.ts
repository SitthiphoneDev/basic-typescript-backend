import { Request, Response, NextFunction, Handler } from "express";
import express from "express";
import { MaybePromise } from "./type";
import { BaseResponse } from "./response";
import { HandlerMetadata } from "./typed-routes";

export type RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => MaybePromise<void | BaseResponse>;

export const catchAsync =
    (fn: RequestHandler): express.RequestHandler =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };

export class Router {
    constructor(public readonly instance: express.Router = express.Router()) { }

    private extractHandlers(handlers: RequestHandler[]): {
        handler: RequestHandler;
        middlewares: express.RequestHandler[];
    } {
        const handler = handlers[handlers.length - 1];
        const middlewares = handlers
            .slice(0, handlers.length - 1)
            .map(catchAsync);
        return { handler, middlewares };
    }

    private preRequest(handler: RequestHandler): express.RequestHandler {
        return catchAsync(async (req, res, next) => {
            const result = await handler(req, res, next);
            if (result) {
                res.send({
                    success: true,
                    message: "Request processed successfully",
                    ...result,
                } as BaseResponse);
            }
        });
    }

    get(path: string, ...handlers: RequestHandler[]): void {
        const { handler, middlewares } = this.extractHandlers(handlers);
        this.instance.get(path, ...middlewares, this.preRequest(handler));
    }

    post(path: string, ...handlers: RequestHandler[]) {
        const { handler, middlewares } = this.extractHandlers(handlers);
        this.instance.post(path, middlewares, this.preRequest(handler));
    }

    put(path: string, ...handlers: RequestHandler[]) {
        const { handler, middlewares } = this.extractHandlers(handlers);
        this.instance.put(path, middlewares, this.preRequest(handler));
    }

    delete(path: string, ...handlers: RequestHandler[]) {
        const { handler, middlewares } = this.extractHandlers(handlers);
        this.instance.delete(path, middlewares, this.preRequest(handler));
    }

    registerClassRoutes(classInstance: object) {
        const fields = Object.values(classInstance);
        fields.forEach((field) => {
            const route = field as HandlerMetadata;
            if (route.__handlerMetadata) {
                const { path, handler } = route;
                const method = route.method.toLowerCase();
                console.log('Register route', path, method);
                (this.instance.route(path) as any)[method](this.preRequest(handler));
            }
        });
        return this;
    }
}
