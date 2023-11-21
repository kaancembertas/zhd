import { container, Lifecycle as TsyringeLifecycle } from 'tsyringe';
import { Constructor, Lifecycle, RegisterOptions } from './types';
import ContainerTokens from './ContainerTokens';
import ZhdBootstrapper from '../ZhdBootstrapper/ZhdBootstrapper';

export default class Container<T extends ContainerTokens> {
    private constructor() {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static instance: Container<any> | undefined;

    public static getInstance = <P extends ContainerTokens>(): Container<P> => {
        if (!this.instance) this.instance = new Container<P>();
        return this.instance;
    };

    public registerSingleton = <P extends keyof T>(token: P, provider: Constructor<T[P]>): void => {
        container.registerSingleton(token as string, provider);
    };

    public registerTransient = <P extends keyof T>(token: P, provider: Constructor<T[P]>): void => {
        container.register(token as string, provider);
    };

    public register = <P extends keyof T>(token: P, provider: Constructor<T[P]>, options?: RegisterOptions): void => {
        const lifecycle = options?.lifecycle ?? Lifecycle.Transient;
        const tsyringeLifecycle =
            lifecycle === Lifecycle.Transient ? TsyringeLifecycle.Transient : TsyringeLifecycle.Singleton;
        container.register(token as string, provider, { lifecycle: tsyringeLifecycle });
    };

    public resolve = <P extends keyof T>(token: P): T[P] => container.resolve(token as string);

    public resolveAll = <P extends keyof T>(token: P): Array<T[P]> => {
        /**
         * The try-catch block below allows to resolve an unregistered token as an empty array
         */
        try {
            return container.resolveAll(token as string);
        } catch (error) {
            return [];
        }
    };

    public reset = (): void => {
        container.reset();
        ZhdBootstrapper.registerDependencies();
    };
}
