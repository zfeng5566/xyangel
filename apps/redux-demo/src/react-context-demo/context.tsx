/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, PropsWithChildren } from 'react';
interface BaseContextValues {
    count: number;
    content: string;
    setCount: (c: number) => void;
    setContent: (c: string) => void;
}
export const BaseContext = React.createContext<BaseContextValues>({
    count: 1,
    content: '',
    setContent(c) {},
    setCount(c) {},
});

export const BaseContextContainer: React.FC<PropsWithChildren<unknown>> = (
    props
) => {
    const [count, setcount] = useState(1);
    const [content, setcontent] = useState('');
    const setCount = React.useCallback((c: number) => {
        setcount(c);
    }, []);
    const setContent = React.useCallback((c: string) => {
        setcontent(c);
    }, []);

    return (
        <BaseContext.Provider value={{ count, setCount, content, setContent }}>
            {props.children}
        </BaseContext.Provider>
    );
};
