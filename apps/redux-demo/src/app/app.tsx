// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';

import { TodoList } from './components/todo/todo';
import { Count } from './components/count/count';
import DndDemo from './dnd-demo/dnd-demo';

export function App() {
    return (
        <Provider store={store}>
            <DndDemo />
            <TodoList />
            <Count />
        </Provider>
    );
}

export default App;
