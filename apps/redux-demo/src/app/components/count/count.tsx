import React from 'react';
import { increment } from '../../store/features/count';
import { useAppDispatch, useAppSelector } from './../../store/hooks';

export const Count = () => {
    const count = useAppSelector((state) => {
        return state.count.value;
    });
    const dispatch = useAppDispatch();

    return (
        <div>
            <h3>
                当前数字为：<span>{count}</span>
            </h3>
            <button
                onClick={() => {
                    dispatch(increment());
                }}
            >
                增加
            </button>
        </div>
    );
};
