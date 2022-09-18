import React from 'react';
import Content from './content';
import { BaseContextContainer } from './context';
import Header from './header';

/**
 * react 原生context 用法不会隔离渲染
 * @returns
 */
function ReactContextDemo() {
    return (
        <BaseContextContainer>
            ReactContextDemo
            <Header />
            <Content />
        </BaseContextContainer>
    );
}

export default ReactContextDemo;
