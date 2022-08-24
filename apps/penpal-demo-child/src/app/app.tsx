// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';
import { connectToParent } from 'penpal';

export function App() {
    useEffect(() => {
        const connection = connectToParent({
            timeout: 200,
        });
        connection.promise
            .then((parent) => {
                console.log('parent ready', parent);
                setTimeout(() => {
                    (parent as any)
                        .add(3, 1)
                        .then((res: any) => {
                            console.log(res);
                        })
                        .catch((err: any) => {
                            console.log('child log: ', err);
                        });
                }, 1000);
            })
            .catch((err) => {
                console.warn('child log: 连接失败', err);
            });
    }, []);

    return (
        <>
            <div>child page</div>
            <div />
        </>
    );
}

export default App;
