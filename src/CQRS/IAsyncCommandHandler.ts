import IAsyncCommand from './IAsyncCommand';

export default interface IAsyncCommandHandler<TAsyncCommand extends IAsyncCommand> {
    readonly identifier: TAsyncCommand['identifier'];
    handleAsync: (command: TAsyncCommand) => Promise<void>;
}
