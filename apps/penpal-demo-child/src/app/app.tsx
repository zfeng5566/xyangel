// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { connectToParent } from '@xyangel/penpal-bridge';

const parentConnection = connectToParent<
    any,
    {
        commonApi: {
            getChildName(): string;
        };
        runDemo(): string;
    }
>(
    {
        commonApi: {
            getChildName() {
                return '1111';
            },
        },
        runDemo() {
            return 'demo';
        },
    },
    {}
);
export function App() {
    const [count, setCount] = useState(0);
    console.log('child App render');

    useEffect(() => {
        return ((window as any).offUse = parentConnection.use({
            commonApi: {
                getChildName() {
                    return `${count}`;
                },
            },
        }));
    }, [count]);

    return (
        <>
            <div>child page</div>
            <div />

            <h5>当前点击次数: {count}</h5>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                +1
            </button>
        </>
    );
}

export default App;
