import React from 'react';
import router from './router';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from '@tanstack/react-router';
import './main.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
