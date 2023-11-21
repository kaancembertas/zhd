import ZhdBootstrapper from './ZhdBootstrapper/ZhdBootstrapper';
ZhdBootstrapper.registerDependencies();

// @index('./*', f => `export * from '${f.path}'`)
export * from './Container';
export * from './CQRS';
