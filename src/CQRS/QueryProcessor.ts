import { Container, ContainerTokens } from '../Container';
import IAsyncQuery from './IAsyncQuery';
import IAsyncQueryExecutor from './IAsyncQueryExecutor';
import IQuery from './IQuery';
import IQueryExecutor from './IQueryExecutor';
import IQueryProcessor from './IQueryProcessor';

type StringIndexedObject<T> = { [key in string]?: T };
type IndexedQueryExecutors = StringIndexedObject<IQueryExecutor<IQuery<unknown>, unknown>>;
type IndexedAsyncQueryExecutors = StringIndexedObject<IAsyncQueryExecutor<IAsyncQuery<unknown>, unknown>>;
export default class QueryProcessor implements IQueryProcessor {
    private static queryExecutors: IndexedQueryExecutors | undefined;
    private static asyncQueryExecutors: IndexedAsyncQueryExecutors | undefined;
    private static isInitialized = false;
    private container: Container<ContainerTokens>;

    constructor() {
        this.container = Container.getInstance();
    }

    private init = () => {
        if (!QueryProcessor.queryExecutors) {
            const executors = this.container.resolveAll('IQueryExecutor');
            QueryProcessor.queryExecutors = executors.reduce(
                (prev, current) => ({ ...prev, [current.identifier]: current }),
                {} as IndexedQueryExecutors,
            );
        }

        if (!QueryProcessor.asyncQueryExecutors) {
            const executors = this.container.resolveAll('IAsyncQueryExecutor');
            QueryProcessor.asyncQueryExecutors = executors.reduce(
                (prev, current) => ({ ...prev, [current.identifier]: current }),
                {} as IndexedAsyncQueryExecutors,
            );
        }

        QueryProcessor.isInitialized = true;
    };

    public process = <TResult>(query: IQuery<TResult>): TResult => {
        if (!QueryProcessor.isInitialized) {
            this.init();
        }

        const executor = QueryProcessor.queryExecutors?.[query.identifier];

        if (!executor) {
            throw new Error(`No IQueryExecutorExecutor found with id: ${query.identifier}`);
        }

        return executor.execute(query) as TResult;
    };

    public processAsync = <TResult>(query: IAsyncQuery<TResult>): Promise<TResult> => {
        if (!QueryProcessor.isInitialized) {
            this.init();
        }

        const executor = QueryProcessor.asyncQueryExecutors?.[query.identifier];

        if (!executor) {
            throw new Error(`No IAsyncQueryExecutor found with id: ${query.identifier}`);
        }

        return executor.executeAsync(query) as Promise<TResult>;
    };
}
