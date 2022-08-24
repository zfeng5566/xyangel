// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from 'react';
import { connectToChild } from 'penpal';

export function App() {
    const childIframeRef = useRef<HTMLIFrameElement>(null);
    const childIframeRef1 = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        console.log('parent log: ', 'ueeEffect');
        if (childIframeRef.current) {
            console.log('parent log: ', 1111);
            connectToChild({
                iframe: childIframeRef.current,
                methods: {
                    add(num1: number, num2: number) {
                        return num1 + num2;
                    },
                },
            });
        }

        console.log('parent log: ', 'ueeEffect');
        if (childIframeRef1.current) {
            console.log('parent log: ', 2222);
            connectToChild({
                iframe: childIframeRef1.current,
                methods: {
                    remove: () => {
                        console.log(11);
                    },
                },
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
            <iframe
                title="child"
                src="http://localhost:4310"
                ref={childIframeRef1}
            />
            <div />
        </div>
    );
}

export default App;
