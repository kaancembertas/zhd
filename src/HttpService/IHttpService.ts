import HttpResponse from './HttpResponse';
type Obj = Record<string, unknown>;

export default interface IHttpService {
    post: <T>(endpoint: string, body?: Obj | string, headers?: Obj) => Promise<HttpResponse<T>>;
    get: <T>(endpoint: string, headers?: Obj) => Promise<HttpResponse<T>>;
    put: <T>(endpoint: string, body?: Obj | string, headers?: Obj) => Promise<HttpResponse<T>>;
    delete: <T>(endpoint: string, body?: Obj | string, headers?: Obj) => Promise<HttpResponse<T>>;
    patch: <T>(endpoint: string, body?: Obj | string, headers?: Obj) => Promise<HttpResponse<T>>;
}
