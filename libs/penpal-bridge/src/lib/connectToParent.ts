import { connectToParent as penpalConnectToParent, Methods } from 'penpal';
import {
    assignMethods,
    cloneMethods,
    pickMethods,
    rewriteMethods,
} from './utils';

type ConnectToParentOptions = Parameters<typeof penpalConnectToParent>[0];

class ParentConnect<P extends object, C> {
    penpalConnection;
    defaultMethodsBackup;
    constructor(
        private defaultMethods: C,
        private options?: ConnectToParentOptions
    ) {
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

/**
 * 链接父iframe
 * @param defaultMethods
 * @param options
 * @returns
 */
export const connectToParent = <P extends object, C>(
    defaultMethods: C,
    options?: ConnectToParentOptions
) => {
    return new ParentConnect<P, C>(defaultMethods, options);
};
