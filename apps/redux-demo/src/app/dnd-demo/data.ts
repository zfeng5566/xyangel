import React from 'react';
export interface MenuItem {
    id: number;
    text: string;
    type: 'item';
}
export interface MenuGroup {
    id: number;
    text: string;
    type: 'dir';
    subs: MenuList;
}
export type MenuElement = MenuGroup | MenuItem;
export type MenuList = Array<MenuElement>;
/**
 * 拖拽元素要收集的信息
 */
export interface DragItem {
    index: number;
    id: number;
    type: string;
    dragRef: React.RefObject<HTMLDivElement>;
}

export const menuData: MenuList = [
    {
        text: 'header 1',
        id: 111,
        type: 'dir',
        subs: [
            {
                id: 1,
                text: 'Write a cool JS library',
                type: 'item',
            },
            {
                id: 2,
                text: 'Make it generic enough',
                type: 'item',
            },
        ],
    },
    {
        text: 'header 2',
        id: 222,
        type: 'dir',

        subs: [
            {
                id: 3,
                text: 'Write README',
                type: 'item',
            },
            {
                id: 4,
                text: 'Create some examples',
                type: 'item',
            },
        ],
    },
    {
        text: 'header 3',
        id: 333,
        type: 'dir',
        subs: [
            {
                id: 5,
                text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
                type: 'item',
            },
            {
                id: 6,
                text: '???',
                type: 'item',
            },
            {
                id: 7,
                text: 'PROFIT',
                type: 'item',
            },
        ],
    },
];
