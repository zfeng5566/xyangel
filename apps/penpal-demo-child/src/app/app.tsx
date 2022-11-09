// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import {
    connectToParent,
    ParentBridgeApi,
    ChildBridgeApi,
} from '@xyangel/penpal-bridge';

const parentConnection = connectToParent<ParentBridgeApi, ChildBridgeApi>(
    {
        common: {
            getCount() {
                throw new Error('1');
            },
        },
        getText() {
            throw new Error('没有实现');
        },
    },
    {
        debug: true,
    }
);
export function App() {
    const [count, setCount] = useState(0);
    console.log('child App render');

    useEffect(() => {
        return ((window as any).offUse = parentConnection.use({
            common: {
                getCount() {
                    return count;
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

            <button
                onClick={() => {
                    parentConnection.penpalConnection.promise.then(
                        (parentApi) => {
                            console.log('父窗口暴露的方法：', parentApi);

                            parentApi.email.getEmail().then((value) => {
                                console.log(
                                    'parentApi email.getEmail return value: ',
                                    value
                                );
                            });
                        }
                    );
                }}
            >
                调用父窗口接口
            </button>
            <div>
                <button
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    刷新页面
                </button>
            </div>
        </>
    );
}

export default App;
