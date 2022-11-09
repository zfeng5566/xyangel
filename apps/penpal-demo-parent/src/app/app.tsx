// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import {
    usePenpalConnectToChild,
    ParentBridgeApi,
    ChildBridgeApi,
} from '@xyangel/penpal-bridge';

export function App() {
    const childIframeRef = useRef<HTMLIFrameElement>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const { childBridgeApi } = usePenpalConnectToChild<
        ParentBridgeApi,
        ChildBridgeApi
    >(
        {
            email: {
                getEmail() {
                    return inputValue;
                },
            },
            add(num1, num2) {
                return num1 + num2;
            },
        },
        childIframeRef
    );

    console.log('childBridgeApi: ', childBridgeApi);
    return (
        <div>
            <iframe
                title="child"
                src="http://localhost:4310"
                ref={childIframeRef}
            />

            <input
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            <button
                onClick={async () => {
                    const count = await childBridgeApi?.common.getCount();
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
