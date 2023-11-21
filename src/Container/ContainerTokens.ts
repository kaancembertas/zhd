import {
    IAsyncCommand,
    IAsyncCommandHandler,
    IAsyncQuery,
    IAsyncQueryExecutor,
    ICommand,
    ICommandBus,
    ICommandHandler,
    IQuery,
    IQueryExecutor,
    IQueryProcessor,
} from '../CQRS';

export default interface ContainerTokens {
    ICommandBus: ICommandBus;
    ICommandHandler: ICommandHandler<ICommand>;
    IAsyncCommandHandler: IAsyncCommandHandler<IAsyncCommand>;
    IQueryProcessor: IQueryProcessor;
    IQueryExecutor: IQueryExecutor<IQuery<unknown>, unknown>;
    IAsyncQueryExecutor: IAsyncQueryExecutor<IAsyncQuery<unknown>, unknown>;
}
