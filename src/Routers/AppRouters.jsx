import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'; 
import Signup from '../Pages/Signup';
import About from '../Pages/About';
import ForgetPassword from '../Pages/ForgetPassword';
import AddCode from '../Pages/AddCode';
import BookPage from '../Pages/BookPage';
import SingleBook from '../Pages/SingleBook';
import Cart from '../Pages/Cart';
import Wishlist from '../Pages/WishList';
import Checkout from '../Pages/CheckOut';
import Profile from '../Pages/Profile';
import Order from '../Pages/Order';
import Reset from '../Pages/Reset';
import ProtectedRoute from '../Routers/ProtectedRoute';

export default function AppRouters() {
  return (
    <>
    
        <BrowserRouter>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={ <About />} />
        
        <Route path="/ForgetPassword" element={<ProtectedRoute> <ForgetPassword/>  </ProtectedRoute>} />
        <Route path="/AddCode" element={<ProtectedRoute> <AddCode />  </ProtectedRoute>} />
        <Route path="/Books" element={<ProtectedRoute> <BookPage />  </ProtectedRoute>} />
        <Route path="/Single/:id" element={<ProtectedRoute> <SingleBook />  </ProtectedRoute>}/>
        <Route path="/Cart" element={ <ProtectedRoute> <Cart />  </ProtectedRoute>}/>
        <Route path="/Wish" element={ <ProtectedRoute> <Wishlist />  </ProtectedRoute>}/>
        <Route path="/Check" element={<ProtectedRoute> <Checkout />  </ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute> <Profile />  </ProtectedRoute>}/>
        <Route path="/order" element={<ProtectedRoute> <Order />  </ProtectedRoute>}/>
        <Route path="/Reset" element={<ProtectedRoute> <Reset />  </ProtectedRoute>}/>
        
      
        <Route path="/" element={<Home />} />
      </Routes>
      
    </BrowserRouter>
    </>
  )
}
