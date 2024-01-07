import type HttpStatusCode from './HttpStatusCode';

export type ErrorModel = {
    errorCode?: string;
    errorMessage?: string;
    errorDetail?: Record<string, unknown>;
    source: 'api' | 'client';
};

export type HttpSuccessResponse<T = undefined> = {
    isSuccessful: true;
    data: T;
    statusCode: HttpStatusCode;
    error: never;
};

export type HttpFailureResponse = {
    isSuccessful: false;
    data?: undefined;
    /** @param -1 means that client error  */
    statusCode: HttpStatusCode | -1;
    error: ErrorModel;
};

export type HttpResponse<T = undefined> = HttpSuccessResponse<T> | HttpFailureResponse;

export default HttpResponse;
