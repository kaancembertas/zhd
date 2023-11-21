import IAsyncCommand from './IAsyncCommand';
import ICommand from './ICommand';

export default interface ICommandBus {
    send: (command: ICommand) => void;
    sendAsync: (command: IAsyncCommand) => Promise<void>;
}
