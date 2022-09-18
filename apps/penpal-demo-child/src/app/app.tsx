// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from 'react';
import { connectToParent } from 'penpal';
let num1 = 1;
export function App() {
    const connectRef = useRef<ReturnType<typeof connectToParent>>(null);
    const connectParent = () => {
        num1++;
        console.log(2222222222222);
        const connection = connectToParent({
            timeout: 200,
            debug: true,
            methods: {
                getChildName() {
                    return '内嵌ifrme' + num1;
                },
            },
        });

        (connectRef as any).current = connection;
    };
    useEffect(() => {
        connectParent();
    }, []);

    return (
        <>
            <div>child page</div>
            <div />
            <button
                onClick={() => {
                    connectRef.current?.promise.then((parent) => {
                        (parent as any).add(3, 3).then((r: any) => {
                            console.log(r);
                        });
                    });
                }}
            >
                请求
            </button>
            <button
                onClick={() => {
                    connectRef.current?.destroy();
                }}
            >
                {' '}
                断开连接
            </button>
            <button
                onClick={() => {
                    connectParent();
                }}
            >
                重新连接
            </button>
        </>
    );
}

export default App;
