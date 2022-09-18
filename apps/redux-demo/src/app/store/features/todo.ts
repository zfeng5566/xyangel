import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToDoItem = { id: string; text: string; completed: boolean };

const todosSlice = createSlice({
    name: 'todos',
    initialState: [{ id: '1', text: 'init', completed: true }] as ToDoItem[],
    reducers: {
        todoAdded(state, action: PayloadAction<ToDoItem>) {
            state.push({
                id: action.payload.id,
                text: action.payload.text,
                completed: false,
            });
        },
        todoToggled(state, action) {
            const todo = state.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
});

export const { todoAdded, todoToggled } = todosSlice.actions;
export default todosSlice.reducer;
