import React from 'react';
import { todoAdded } from '../../store/features/todo';
import { useAppDispatch, useAppSelector } from './../../store/hooks';

export const TodoList = () => {
    const todoList = useAppSelector((state) => {
        return state.todo;
    });
    const dispatch = useAppDispatch();
    console.log('ToDoList render');
    return (
        <div>
            123
            {todoList.map((item) => {
                return (
                    <div key={item.id}>
                        {item.id}:{item.text}
                    </div>
                );
            })}
            <button
                onClick={() => {
                    dispatch(
                        todoAdded({
                            id: Math.random().toString(),
                            text: '3',
                            completed: true,
                        })
                    );
                }}
            >
                增加
            </button>
        </div>
    );
};
