import {
    connectToChild as penpalConnectToChild,
    Methods,
    AsyncMethodReturns,
} from 'penpal';
import { useRef, useEffect, RefObject, useState } from 'react';
import {
    assignMethods,
    cloneMethods,
    pickMethods,
    rewriteMethods,
} from './utils';

type ConnectToChildOptions = Parameters<typeof penpalConnectToChild>[0];

class ChildConnect<P extends object, C> {
    penpalConnection;
    defaultMethodsBackup;

    constructor(
        private defaultMethods: C,
        private options: ConnectToChildOptions
    ) {
        this.defaultMethodsBackup = cloneMethods(this.defaultMethods as any);
        this.penpalConnection = penpalConnectToChild<P>({
            ...this.options,
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
 * 链接子iframe
 * @param defaultMethods
 * @param options
 * @returns
 */
const connectToChild = <ChildMethods extends object, SelfMethods>(
    defaultMethods: SelfMethods,
    options: ConnectToChildOptions
) => {
    return new ChildConnect<ChildMethods, SelfMethods>(defaultMethods, options);
};

export const usePenpalConnectToChild = <
    CurrentMethods,
    ChildMethods extends object
>(
    methods: CurrentMethods,
    iframeRef: RefObject<HTMLIFrameElement>
) => {
    const [childConnection, setChildConnection] = useState<
        | ReturnType<typeof connectToChild<ChildMethods, CurrentMethods>>
        | undefined
    >(undefined);
    const [childBridgeApi, setChildBridgeApi] = useState<
        AsyncMethodReturns<ChildMethods> | undefined
    >(undefined);

    const ref = useRef<ReturnType<
        typeof connectToChild<ChildMethods, CurrentMethods>
    > | null>(null);
    useEffect(() => {
        if (iframeRef.current) {
            const childConnection = (ref.current = connectToChild<
                ChildMethods,
                CurrentMethods
            >(methods, {
                iframe: iframeRef.current,
                debug: true,
            }));
            childConnection.penpalConnection.promise.then((child) => {
                setChildBridgeApi(child);
            });
            setChildConnection(childConnection);
        }

        return () => {
            ref.current?.penpalConnection.destroy();
        };
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current?.use(methods);
        }
    }, [methods]);
    return {
        childBridgeApi,
        childConnection,
    };
};
