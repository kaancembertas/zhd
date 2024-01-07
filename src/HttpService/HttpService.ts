import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import IHttpService from './IHttpService';
import HttpResponse, { ErrorModel, HttpFailureResponse } from './HttpResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = { [key: string]: any };

type ConstructorProps = {
    baseUrl: string;
    debugLogEnabled?: boolean;
    additionalHeaders?: Obj;
};

export default class HttpService implements IHttpService {
    protected readonly axiosInstance: AxiosInstance;

    private readonly REQUEST_CONFIG: AxiosRequestConfig = {
        validateStatus: () => true,
    };

    constructor({ baseUrl, additionalHeaders }: ConstructorProps) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: additionalHeaders,
        });
    }

    protected processAxiosResponse = <T>(axiosResponse: AxiosResponse): HttpResponse<T> => {
        const isSuccessful = axiosResponse.status >= 200 && axiosResponse.status < 300;
        const { status: statusCode, data } = axiosResponse;

        if (isSuccessful) {
            return {
                isSuccessful,
                data,
                statusCode,
            } as HttpResponse<T>;
        }

        const error: ErrorModel = {
            errorCode: data?.errorCode ?? null,
            errorMessage: data?.errorMessage ?? data?.error_description ?? data ?? null,
            source: 'api',
        };

        return {
            isSuccessful,
            statusCode,
            error,
        } as HttpResponse<T>;
    };

    protected processClientError = async (error?: Error): Promise<HttpFailureResponse> => {
        let clientErrorJson: string | undefined;

        if (error) {
            try {
                clientErrorJson = JSON.stringify(error);
            } catch (err) {
                // Do nothing
            }
        }

        return {
            isSuccessful: false,
            statusCode: -1,
            error: {
                errorMessage: error?.message,
                errorDetail: {
                    clientErrorJson,
                },
                source: 'client',
            },
        };
    };

    protected setBearerToken = (token: string | null): void => {
        if (!token) {
            this.axiosInstance.defaults.headers.common.Authorization = '';
            return;
        }

        this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    };

    public post = async <T>(endpoint: string, body?: Obj | string, headers?: Obj): Promise<HttpResponse<T>> => {
        try {
            const response = await this.axiosInstance.post(endpoint, body, { ...this.REQUEST_CONFIG, headers });
            return this.processAxiosResponse<T>(response);
        } catch (err) {
            const processedError = await this.processClientError(err as Error);
            return processedError;
        }
    };

    public get = async <T>(endpoint: string, headers?: Obj): Promise<HttpResponse<T>> => {
        try {
            const response = await this.axiosInstance.get(endpoint, { ...this.REQUEST_CONFIG, headers });
            return this.processAxiosResponse<T>(response);
        } catch (err) {
            const processedError = await this.processClientError(err as Error);
            return processedError;
        }
    };

    public put = async <T>(endpoint: string, body?: Obj | string, headers?: Obj): Promise<HttpResponse<T>> => {
        try {
            const response = await this.axiosInstance.put(endpoint, body, { ...this.REQUEST_CONFIG, headers });
            return this.processAxiosResponse<T>(response);
        } catch (err) {
            const processedError = await this.processClientError(err as Error);
            return processedError;
        }
    };

    public delete = async <T>(endpoint: string, body?: Obj | string, headers?: Obj): Promise<HttpResponse<T>> => {
        try {
            const response = await this.axiosInstance.delete(endpoint, { ...this.REQUEST_CONFIG, data: body, headers });
            return this.processAxiosResponse<T>(response);
        } catch (err) {
            const processedError = await this.processClientError(err as Error);
            return processedError;
        }
    };

    public patch = async <T>(endpoint: string, body?: Obj | string, headers?: Obj): Promise<HttpResponse<T>> => {
        try {
            const response = await this.axiosInstance.patch(endpoint, { ...this.REQUEST_CONFIG, data: body, headers });
            return this.processAxiosResponse<T>(response);
        } catch (err) {
            const processedError = await this.processClientError(err as Error);
            return processedError;
        }
    };
}
