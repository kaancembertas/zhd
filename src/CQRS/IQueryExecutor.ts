import IQuery from './IQuery';

export default interface IQueryExecutor<TQuery extends IQuery<TResult>, TResult> {
    readonly identifier: TQuery['identifier'];
    execute: (query: TQuery) => TResult;
}
