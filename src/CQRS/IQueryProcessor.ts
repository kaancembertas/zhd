import IAsyncQuery from './IAsyncQuery';
import IQuery from './IQuery';

export default interface IQueryProcessor {
    process: <TResult>(query: IQuery<TResult>) => TResult;
    processAsync: <TResult>(query: IAsyncQuery<TResult>) => Promise<TResult>;
}
