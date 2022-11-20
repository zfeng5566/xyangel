import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './dnd-demo.module.scss';
import { Container } from './dnd-item/container';
import { DndItem } from './dnd-item/dnd-item';

/* eslint-disable-next-line */
export interface DndDemoProps {}

export function DndDemo(props: DndDemoProps) {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container />
        </DndProvider>
    );
}

export default DndDemo;
