import { connectToParent as penpalConnectToParent, Methods } from 'penpal';

type Options = Parameters<typeof penpalConnectToParent>[0];

const rewriteMethods = (methods: Methods) => {
    const flattenedMethods: Methods = {};
    Object.keys(methods).forEach((key) => {
        const value = methods[key];
        if (typeof value === 'object') {
            // Recurse into any nested children.
            Object.assign(flattenedMethods, {
                [key]: rewriteMethods(value),
            });
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
/**
 * 把新的方法 复制到 baseMethods上。只修改方法的引用
 * @param baseMethods
 * @param newMethods
 */
const assignMethods = (baseMethods: Methods, newMethods: Methods) => {
    Object.keys(newMethods).forEach((key) => {
        const value = newMethods[key];
        if (typeof value === 'function') {
            baseMethods[key] = value;
        }
        if (typeof value === 'object') {
            assignMethods(baseMethods[key] as Methods, value);
        }
    });
};

/**
 * clone 对象
 * @param baseMethods
 * @returns
 */
const cloneMethods = (baseMethods: Methods) => {
    const flattenedMethods: Methods = {};

    Object.keys(baseMethods).forEach((key) => {
        const value = baseMethods[key];
        if (typeof value === 'function') {
            flattenedMethods[key] = value;
        }
        if (typeof value === 'object') {
            const subMethods = cloneMethods(baseMethods[key] as Methods);
            Object.assign(flattenedMethods, {
                [key]: subMethods,
            });
        }
    });
    return flattenedMethods;
};
/**
 * 从 baseMethods 检出 methods中同名方法
 * @param baseMethods
 * @param methods
 * @returns
 */
const pickMethods = (baseMethods: Methods, methods: Methods) => {
    const flattenedMethods: Methods = {};

    Object.keys(methods).forEach((key) => {
        const value = methods[key];
        if (typeof value === 'function') {
            flattenedMethods[key] = baseMethods[key];
        }
        if (typeof value === 'object') {
            const subMethods = pickMethods(baseMethods[key] as Methods, value);
            Object.assign(flattenedMethods, {
                [key]: subMethods,
            });
        }
    });
    return flattenedMethods;
};

class Connect<P extends object, C extends Methods> {
    penpalConnection;
    defaultMethodsBackup;
    constructor(private defaultMethods: C, private options: Options) {
        this.defaultMethodsBackup = cloneMethods(defaultMethods);
        this.penpalConnection = penpalConnectToParent<P>({
            ...options,
            methods: this.defaultMethods
                ? rewriteMethods(this.defaultMethods)
                : {},
        });
    }

    use(methods: Partial<C>) {
        if (this.defaultMethods) {
            assignMethods(this.defaultMethods, methods as unknown as Methods);
        }
        return () => {
            if (this.defaultMethods && methods) {
                assignMethods(
                    this.defaultMethods,
                    pickMethods(
                        this.defaultMethodsBackup,
                        methods as unknown as Methods
                    )
                );
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
