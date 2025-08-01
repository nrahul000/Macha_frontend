import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { FoodDeliveryProvider } from './context/FoodDeliveryContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <FoodDeliveryProvider>
            <App />
             <Toaster position="top-center" />
          </FoodDeliveryProvider>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
