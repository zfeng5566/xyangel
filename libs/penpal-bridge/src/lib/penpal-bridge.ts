import { connectToParent as penpalConnectToParent, Methods } from 'penpal';

type Options = Parameters<typeof penpalConnectToParent>[0];

const rewriteMethods = (methods: Methods) => {
    const flattenedMethods: Methods = {};
    Object.keys(methods).forEach((key) => {
        const value = methods[key];
        if (typeof value === 'object') {
            // Recurse into any nested children.
            Object.assign(flattenedMethods, rewriteMethods(value));
        }

        if (typeof value === 'function') {
            // If we've found a method, expose it.
            flattenedMethods[key] = (...args: any[]) => {
                return (methods as any)[key](...args);
            };
        }
    });
    return flattenedMethods;
};

const resetMethods = (baseMethods: Methods, newMethods: Methods) => {
    const flattenedMethods: Methods = {};

    Object.keys(newMethods).forEach((key) => {
        const value = newMethods[key];
        if (typeof value === 'function') {
            baseMethods[key] = value;
        }
        if (typeof value === 'object') {
            const subMethods = resetMethods(baseMethods[key] as Methods, value);
            Object.assign(flattenedMethods, subMethods);
        }
    });
    return flattenedMethods;
};

class Connect<P extends object, C extends Methods> {
    penpalConnection;
    constructor(private defaultMethods: C, private options: Options) {
        this.penpalConnection = penpalConnectToParent<P>({
            ...options,
            methods: this.defaultMethods
                ? rewriteMethods(this.defaultMethods)
                : {},
        });
    }

    use(methods: C) {
        let initMethods: Methods | undefined;
        if (this.defaultMethods) {
            initMethods = resetMethods(
                this.defaultMethods,
                methods as unknown as Methods
            );
        }
        return () => {
            if (this.defaultMethods && initMethods) {
                resetMethods(this.defaultMethods, initMethods);
            }
        };
    }
}

export const connectToParent = <P extends object, C extends Methods>(
    defaultMethods: C,
    options: Options
) => {
    return new Connect<P, C>(defaultMethods, options);
};
