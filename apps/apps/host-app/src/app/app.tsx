import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
const res = import('remote-app/Module');

const RemoteApp = React.lazy(() => res);

export function App() {
    return (
        <React.Suspense fallback={null}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/" element={<div title="">apps-host-app</div>} />
            </Routes>
            <RemoteApp />
        </React.Suspense>
    );
}

export default App;
