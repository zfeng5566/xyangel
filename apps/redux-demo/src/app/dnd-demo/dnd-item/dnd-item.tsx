import React, { useEffect, useState } from 'react';
import EventEmitter from 'eventemitter3';

import type { Identifier } from 'dnd-core';
import type { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemTypes } from './ItemTypes';
import { DragItem, MenuItem } from '../data';
import { adjust } from '../unit';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    cursor: 'move',
};

export interface CardProps {
    id: any;
    text: string;
    index: number;
    axisEvent: EventEmitter;
}

export const DndItem: FC<CardProps & MenuItem> = ({
    id,
    text,
    type,
    index,
    axisEvent,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offsetX, setOffsetX] = useState(0);

    const [{ handlerId, dragging }, drop] = useDrop<
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

    const [{ isDragging }, drag, dragPreview] = useDrag({
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

    useEffect(() => {
        const fn = (data: { item: DragItem; monitor: DropTargetMonitor }) => {
            if (data.item.id === id) {
                return;
            }
            if (data.item.dragRef.current?.contains(ref.current)) {
                return;
            }
            if (data.item.type === 'dir') {
                return;
            }
            /**鼠标拖拽位置 */
            const clientOffset = data.monitor.getClientOffset();
            /**拖住元素的初始位置 */
            const initSourceOffset =
                data.monitor.getInitialSourceClientOffset();
            /**当前元素的位置 */
            const currentBoundingRectClient =
                ref.current?.getBoundingClientRect();
            if (
                !initSourceOffset ||
                !currentBoundingRectClient ||
                !clientOffset
            ) {
                return;
            }
            console.log('initSourceOffset', initSourceOffset);
            console.log('currentBoundingRectClient', currentBoundingRectClient);
            // 说明拖拽的元素位于当前元素的后面
            setOffsetX(
                adjust(
                    data.item.dragRef.current?.getBoundingClientRect(),
                    clientOffset,
                    currentBoundingRectClient
                )
            );
            // console.log('clientOffset: ', clientOffset);
            // console.log('currentBoundingRectClient', currentBoundingRectClient);

            // console.log(data, 22222);
        };
        axisEvent.on('axis', fn);

        return () => {
            axisEvent.off('axis', fn);
        };
    }, []);

    useEffect(() => {
        if (!dragging) {
            setOffsetX(0);
        }
    }, [dragging]);

    console.log('是否有元素正在拖拽：', dragging);
    const opacity = isDragging ? 0 : 1;
    dragPreview(drag(drop(ref)));
    const transformStyles =
        offsetX !== 0
            ? {
                  transform: `translate3d(0px,${offsetX}px,0px)`,
              }
            : {};

    return (
        <div
            ref={ref}
            style={{
                ...style,
                opacity,
                ...transformStyles,
                transitionDuration: '120ms',
            }}
            data-handler-id={handlerId}
        >
            {text}
        </div>
    );
};
