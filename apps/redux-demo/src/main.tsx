import React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import ReactContextDemo from './react-context-demo';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);

const root1 = ReactDOM.createRoot(
    document.getElementById('react-context-demo') as HTMLElement
);
root1.render(<ReactContextDemo />);
