import React from 'react';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import AppRouter from './router';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
