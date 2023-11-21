import ICommand from './ICommand';

export default interface ICommandHandler<TCommand extends ICommand> {
    readonly identifier: TCommand['identifier'];
    handle: (command: TCommand) => void;
}
