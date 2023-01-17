import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import EventEmitter from 'eventemitter3';

import styles from './dnd-group.module.scss';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { ItemTypes } from '../dnd-item/ItemTypes';
import { DragItem } from '../data';
import { adjust } from '../unit';

interface Props {
    text: string;
    id: number;
    index: number;
    type: 'dir';
    axisEvent: EventEmitter;
}

export const DndGroup: React.FC<PropsWithChildren<Props>> = (props) => {
    const { id, axisEvent, index, type } = props;
    const ref = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const [offsetX, setOffsetX] = useState(0);
    const [headerOffsetX, setHeaderOffsetX] = useState(0);
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index, type, dragRef: ref };
        },
        collect: (monitor: any) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    });
    const [{ dragging }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null; dragging: boolean }
    >({
        accept: ItemTypes.CARD,
        options: {
            offsetX: 0,
        },
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                xx: monitor,
                dragging: monitor.canDrop(),
            };
        },
    });
    useEffect(() => {
        const fn = (data: { item: DragItem; monitor: DropTargetMonitor }) => {
            if (data.item.id === id) {
                return;
            }
            if (data.item.type === 'item') {
                const y = adjust(
                    data.item.dragRef.current?.getBoundingClientRect(),
                    data.monitor.getClientOffset(),
                    headerRef.current?.getBoundingClientRect()
                );
                console.log(4444, y);
                setHeaderOffsetX(y);
            }
        };
        axisEvent.on('axis', fn);

        return () => {
            axisEvent.off('axis', fn);
        };
    }, []);
    useEffect(() => {
        if (!dragging) {
            setOffsetX(0);
            setHeaderOffsetX(0);
        }
    }, [dragging]);

    drag(drop(ref));
    const opacity = isDragging ? 0 : 1;

    const transformStyles =
        offsetX !== 0
            ? {
                  transform: `translate3d(0px,${offsetX}px,0px)`,
              }
            : {};
    const transformHeaderStyles =
        headerOffsetX !== 0
            ? {
                  transform: `translate3d(0px,${headerOffsetX}px,0px)`,
              }
            : {};
    return (
        <div
            ref={ref}
            style={{
                ...transformStyles,
                opacity,
                transitionDuration: '120ms',
            }}
            className={styles['container']}
        >
            <header
                ref={headerRef}
                style={{
                    transitionDuration: '120ms',
                    ...transformHeaderStyles,
                }}
            >
                {props.text}
            </header>
            <div>{props.children}</div>
        </div>
    );
};
