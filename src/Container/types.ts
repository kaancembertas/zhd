/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T> = {
    new (...args: any[]): T;
};

export enum Lifecycle {
    Transient,
    Singleton,
}

export type RegisterOptions = {
    /**
     * @default Lifecycle.Transient
     */
    lifecycle?: Lifecycle;
};
