import IAsyncQuery from './IAsyncQuery';

export default interface IAsyncQueryExecutor<TQuery extends IAsyncQuery<TResult>, TResult> {
    readonly identifier: TQuery['identifier'];
    executeAsync: (query: TQuery) => Promise<TResult>;
}
