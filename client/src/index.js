import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './providers/userContext';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<UserProvider>
		<BrowserRouter>
			<Toaster />
			<App />
		</BrowserRouter>
	</UserProvider>
);
