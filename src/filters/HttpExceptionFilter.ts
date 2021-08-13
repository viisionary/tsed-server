import {Catch, PlatformContext, ExceptionFilterMethods, ResponseErrorObject} from "@tsed/common";
import {Exception} from "@tsed/exceptions";

@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilterMethods {
    catch(exception: Exception, ctx: PlatformContext) {
        const {response, logger} = ctx;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);

        const {message, name} = error;
        response
            .setHeaders(headers)
            .status(error.status)
            .body({
                name, message
            });
    }

    mapError(error: any) {
        return {
            name: error.origin?.name || error.name,
            message: error.message,
            status: error.status || 500,
            errors: this.getErrors(error)
        };
    }

    protected getErrors(error: any) {
        return [error, error.origin].filter(Boolean).reduce((errs, {errors}: ResponseErrorObject) => {
            return [...errs, ...(errors || [])];
        }, []);
    }

    protected getHeaders(error: any) {
        return [error, error.origin].filter(Boolean).reduce((obj, {headers}: ResponseErrorObject) => {
            return {
                ...obj,
                ...(headers || {})
            };
        }, {});
    }
}
