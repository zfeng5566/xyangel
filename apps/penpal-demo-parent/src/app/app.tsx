// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from 'react';
import { connectToChild } from 'penpal';

export function App() {
    const childIframeRef = useRef<HTMLIFrameElement>(null);
    const childBridgeApi = useRef<any>(null);
    useEffect(() => {
        console.log('parent log: ', 'ueeEffect');
        if (childIframeRef.current) {
            console.log('parent log: ', 1111);
            connectToChild({
                iframe: childIframeRef.current,
                debug: true,

                methods: {
                    email: {
                        getEmail() {
                            return 'iwang5566@126.com';
                        },
                    },
                    add(num1: number, num2: number) {
                        console.log('第一个iframe 执行');
                        return num1 + num2;
                    },
                },
            }).promise.then((child) => {
                (childBridgeApi as any).current = child;
            });
        }
    }, []);

    return (
        <div>
            <iframe
                title="child"
                src="http://localhost:4310"
                ref={childIframeRef}
            />

            <button
                onClick={async () => {
                    const count = await childBridgeApi.current?.getChildName();
                    if (count) {
                        console.log('2222222: ', count);
                    }
                }}
            >
                获取iframe点击次数
            </button>
        </div>
    );
}

export default App;
