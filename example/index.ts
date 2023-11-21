import 'reflect-metadata';
import { Container, ContainerTokens } from 'zhd';

interface ITest {
    test: () => void;
}

class TestInstance1 implements ITest {
    test = () => {
        console.log('TestInstanceI');
    };
}

interface ITest2 {
    test2: () => void;
}

class Test2Instance implements ITest2 {
    test2 = () => {
        console.log('Test2Instance');
    };
}

interface ApplicationContainerTokens extends ContainerTokens {
    ITest: ITest;
    ITest2: ITest2;
}

const container = Container.getInstance<ApplicationContainerTokens>();

container.registerSingleton('ITest', TestInstance1);
container.registerSingleton('ITest', TestInstance1);
container.registerSingleton('ITest', TestInstance1);
container.registerSingleton('ITest', TestInstance1);
container.registerSingleton('ITest', TestInstance1);
container.registerSingleton('ITest2', Test2Instance);

console.log('=== ITEST Resolve ===');
container.resolveAll('ITest').forEach((i) => i.test());

console.log('=== ITEST2 Resolve ===');
container.resolveAll('ITest2').forEach((i) => i.test2());
