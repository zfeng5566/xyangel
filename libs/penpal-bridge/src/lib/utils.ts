import { Methods } from 'penpal';
export const rewriteMethods = (methods: any) => {
    const flattenedMethods: Methods = {};
    Object.keys(methods).forEach((key) => {
        const value = methods[key];
        if (typeof value === 'object') {
            // Recurse into any nested children.
            Object.assign(flattenedMethods, {
                [key]: rewriteMethods(value as any),
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
export const assignMethods = (baseMethods: any, newMethods: any) => {
    Object.keys(newMethods).forEach((key) => {
        const value = newMethods[key];
        if (typeof value === 'function') {
            baseMethods[key] = value;
        }
        if (typeof value === 'object') {
            assignMethods(baseMethods[key] as Methods, value as unknown as any);
        }
    });
};

/**
 * clone 对象
 * @param baseMethods
 * @returns
 */
export const cloneMethods = (baseMethods: any) => {
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
export const pickMethods = (baseMethods: Methods, methods: Methods) => {
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
