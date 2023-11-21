import { Container, ContainerTokens } from '../Container';
import IAsyncCommand from './IAsyncCommand';
import IAsyncCommandHandler from './IAsyncCommandHandler';
import ICommand from './ICommand';
import ICommandBus from './ICommandBus';
import ICommandHandler from './ICommandHandler';

type StringIndexedObject<T> = { [key in string]?: T };
type IndexedCommandHandlers = StringIndexedObject<ICommandHandler<ICommand>>;
type IndexedAsyncCommandHandlers = StringIndexedObject<IAsyncCommandHandler<IAsyncCommand>>;

export default class CommandBus implements ICommandBus {
    private commandHandlers: IndexedCommandHandlers | undefined;
    private asyncCommandHandlers: IndexedAsyncCommandHandlers | undefined;
    private isInitialized = false;
    private container: Container<ContainerTokens>;

    constructor() {
        this.container = Container.getInstance();
    }
    private init = () => {
        if (!this.commandHandlers) {
            const handlers = this.container.resolveAll('ICommandHandler');
            this.commandHandlers = handlers.reduce(
                (prev, current) => ({ ...prev, [current.identifier]: current }),
                {} as IndexedCommandHandlers,
            );
        }

        if (!this.asyncCommandHandlers) {
            const handlers = this.container.resolveAll('IAsyncCommandHandler');
            this.asyncCommandHandlers = handlers.reduce(
                (prev, current) => ({ ...prev, [current.identifier]: current }),
                {} as IndexedAsyncCommandHandlers,
            );
        }

        this.isInitialized = true;
    };

    public send = (command: ICommand): void => {
        if (!this.isInitialized) {
            this.init();
        }

        const handler = this.commandHandlers?.[command.identifier];

        if (!handler) {
            throw new Error(`No ICommandHandler found with id: ${command.identifier}`);
        }

        return handler.handle(command);
    };

    public sendAsync = (command: IAsyncCommand): Promise<void> => {
        if (!this.isInitialized) {
            this.init();
        }

        const handler = this.asyncCommandHandlers?.[command.identifier];

        if (!handler) {
            throw new Error(`No IAsyncCommandHandler found with id: ${command.identifier}`);
        }

        return handler.handleAsync(command);
    };
}
