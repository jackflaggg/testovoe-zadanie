import {MiddlewareInterface} from "../../models/middleware.interface";
import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/http-statuses.models";
import {ClassConstructor, plainToInstance} from "class-transformer";
import {validate} from "class-validator";

export class ValidateMiddleware implements MiddlewareInterface {
    constructor(private classToValidate: ClassConstructor<object>) {}

    execute(req: Request, res: Response, next: NextFunction): void {

        const instance = plainToInstance(this.classToValidate, req.body);

        validate(instance).then((err) => {
            if (err.length) {
                res.status(HTTP_STATUSES.NOT_HELP_CONTENT_422).send({errorsMessages: err});
                return;
            }
            next();
        })
    };
}