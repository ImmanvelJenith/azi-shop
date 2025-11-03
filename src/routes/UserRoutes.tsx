
import type { RouteObject } from 'react-router-dom';
import UserDashboard from '../pages/user/UserDashboard';
import Profile from '../pages/user/Profile';
import Settings from '../pages/user/Settings';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import SearchResults from '../pages/SearchResults';
import Category from '../pages/Category';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

const userRoutes: RouteObject[] = [
  { path: '/products', element: <Products /> },
  { path: '/products/:id', element: <ProductDetail /> },
  { path: '/search', element: <SearchResults /> },
  { path: '/category/:categoryName', element: <Category /> },
  { path: '/cart', element: <Cart /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/dashboard', element: <UserDashboard /> },
  { path: '/profile', element: <Profile /> },
  { path: '/settings', element: <Settings /> },
];

export default userRoutes;
