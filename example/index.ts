import 'reflect-metadata';
import { Container, ContainerTokens, IAsyncCommand, IAsyncCommandHandler, IAsyncQuery, IAsyncQueryExecutor } from 'zhd';

interface ApplicationContainerTokens extends ContainerTokens {}

const container = Container.getInstance<ApplicationContainerTokens>();

class DisplayNameCommand implements IAsyncCommand {
    readonly identifier = 'DisplayNameCommand';
    result?: boolean;
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class DisplayNameCommandHandler implements IAsyncCommandHandler<DisplayNameCommand> {
    public readonly identifier = 'DisplayNameCommand';

    public handleAsync = async (command: DisplayNameCommand): Promise<void> => {
        console.log(command.name);
        command.result = true;
    };
}

class GetNameQuery implements IAsyncQuery<string> {
    public readonly identifier = 'GetNameQuery';
}

class GetNameQueryExecutor implements IAsyncQueryExecutor<GetNameQuery, string> {
    public readonly identifier = 'GetNameQuery';

    public executeAsync = async (query: GetNameQuery): Promise<string> => {
        return 'KAAN';
    };
}

container.register('IAsyncCommandHandler', DisplayNameCommandHandler);
container.register('IAsyncQueryExecutor', GetNameQueryExecutor);

const main = async () => {
    const query: IAsyncQuery<string> = new GetNameQuery();
    const queryProcessor = container.resolve('IQueryProcessor');
    const result = await queryProcessor.processAsync(query);

    console.log('QUERY RESULT', result);

    const command = new DisplayNameCommand(result);
    const commandBus = container.resolve('ICommandBus');
    await commandBus.sendAsync(command);
    console.log('Command Result', command.result);
};

main();
