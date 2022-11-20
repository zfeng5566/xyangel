import React, { useRef } from 'react';
import update from 'immutability-helper';
import EventEmitter from 'eventemitter3';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { DndItem } from './dnd-item';
import { menuData, MenuElement, MenuList } from '../data';
import { DndGroup } from '../dnd-group/dnd-group';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
    width: 400,
};

export interface Item {
    id: number;
    text: string;
}

export interface ContainerState {
    cards: Item[];
}

export const Container: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [cards] = useState(() => {
        return menuData;
    });

    const [axisEvent] = useState(() => {
        return new EventEmitter();
    });

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            axisEvent.emit('axis', {
                item: item,
                monitor: monitor,
            });
        },
    });

    const renderCard = useCallback((card: MenuElement, index: number) => {
        if (card.type === 'dir') {
            return (
                <DndGroup
                    text={card.text}
                    id={card.id}
                    axisEvent={axisEvent}
                    index={index}
                    type={card.type}
                >
                    {card.subs.map((card, i) => {
                        return renderCard(card, i);
                    })}
                </DndGroup>
            );
        }
        return (
            <DndItem
                axisEvent={axisEvent}
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                type={card.type}
            />
        );
    }, []);

    drop(ref);
    return (
        <div ref={ref} style={style}>
            {cards.map((card, i) => renderCard(card, i))}
        </div>
    );
};
