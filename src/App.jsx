
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import AppRouters from './Routers/AppRouters';

export default function App() {
  return (

    <>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>


        <AppRouters/>

        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
    </>

  );
}