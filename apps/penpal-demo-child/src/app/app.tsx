// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { connectToParent } from '@xyangel/penpal-bridge';

const parentConnection = connectToParent<
    any,
    {
        getChildName(): string;
    }
>(
    {
        getChildName() {
            return '1111';
        },
    },
    {}
);
export function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        return parentConnection.use({
            getChildName() {
                return `${count}`;
            },
        });
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
