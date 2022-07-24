// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Store } from './store/store';
import { Header } from '../components/header/header';

export function App() {
    return (
        <BrowserRouter>
            <Header />
            <Store />
            <Routes>
                <Route path="/store" element={<Store />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
