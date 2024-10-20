import { Request, Response } from "express";
import z from "zod";
import { BaseResponse } from "./response";
import { MaybePromise } from "./type";
import { RequestHandler } from "./router";
import { ValidationError } from "./errors";

export class TypedRoute {
    post(path: string) {
        return new TypedRouteHandler(path, 'post');
    }
    get(path: string) {
        return new TypedRouteHandler(path, 'get');
    }
    put(path: string) {
        return new TypedRouteHandler(path, 'put');
    }
    delete(path: string) {
        return new TypedRouteHandler(path, 'delete');
    }
}

export type TypedHandler<
    TParams extends z.ZodTypeAny,
    TBody extends z.ZodTypeAny,
    TQuery extends z.ZodTypeAny,
    TResponse extends BaseResponse = BaseResponse
> = (context: {
    query: z.infer<TQuery>;
    body: z.infer<TBody>;
    param: z.infer<TParams>;
    req: Request<z.infer<TParams>, any, z.infer<TBody>, z.infer<TQuery>>;
    res: Response<TResponse>;
}) => MaybePromise<TResponse>;

export interface HandlerMetadata {
    __handlerMetadata: true;
    method: string;
    path: string;
    handler: RequestHandler;
}

export class TypedRouteHandler<
    RouteQuery extends z.ZodTypeAny,
    RouteBody extends z.ZodTypeAny,
    RouteParam extends z.ZodTypeAny
> {
    schema: {
        query?: z.ZodTypeAny;
        body?: z.ZodTypeAny;
        params?: z.ZodTypeAny;
    } = {};

    constructor(private readonly path: string, private readonly method: string) { }

    query<Query extends z.ZodTypeAny>(schema: Query) {
        this.schema.query = schema;
        return this as unknown as TypedRouteHandler<RouteQuery, RouteBody, RouteParam>;
    } body<Body extends z.ZodTypeAny>(schema: Body) {
        this.schema.body = schema;
        return this as unknown as TypedRouteHandler<RouteQuery, RouteBody, RouteParam>;
    }
    param<Param extends z.ZodTypeAny>(schema: Param) {
        this.schema.params = schema;
        return this as unknown as TypedRouteHandler<RouteQuery, RouteBody, RouteParam>;
    }
    handler(handler: TypedHandler<RouteQuery, RouteBody, RouteParam>) {
        const invokeHandler = async (req: Request, res: Response) => {
            let message = '';
            let query;
            let body;
            let params;
            try {
                message: 'Query';
                query = this.schema.query ? this.schema.query.parse(req.query) : undefined;
                message = 'Params';
                params = this.schema.params ? this.schema.params.parse(req.params) : undefined;
                message = 'Body';
                body = this.schema.body ? this.schema.body.parse(req.body) : undefined;
            } catch (error: unknown) {
                if (error instanceof z.ZodError) {
                    throw new ValidationError(message.toString());
                }
            }
            return handler({ query, body, param: params, req, res });
        }
        return {
            method: this.method,
            path: this.path,
            handler: invokeHandler,
            __handlerMetadata: true,
        };
    }
}
