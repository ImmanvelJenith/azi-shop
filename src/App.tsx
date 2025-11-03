import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './api/ProtectedRoute';
import AdminProtectedRoute from './api/AdminProtectedRoute';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/user/UserDashboard';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import Reports from './pages/admin/Reports';
import { ProductProvider } from './context/ProductContext';

import './App.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="category/:categoryName" element={<Category />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;

