import CommandBus from '../CQRS/CommandBus';
import QueryProcessor from '../CQRS/QueryProcessor';
import { Container } from '../Container';

export default class ZhdBootstrapper {
    public static registerDependencies = () => {
        const container = Container.getInstance();

        container.registerSingleton('ICommandBus', CommandBus);
        container.registerSingleton('IQueryProcessor', QueryProcessor);
    };
}
