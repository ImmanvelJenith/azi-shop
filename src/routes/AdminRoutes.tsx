
import type { RouteObject } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageOrders from '../pages/admin/ManageOrders';
import Reports from '../pages/admin/Reports';

const adminRoutes: RouteObject[] = [
  { index: true, element: <AdminDashboard /> },
  { path: 'products', element: <ManageProducts /> },
  { path: 'categories', element: <ManageCategories /> },
  { path: 'orders', element: <ManageOrders /> },
  { path: 'users', element: <ManageUsers /> },
  { path: 'reports', element: <Reports /> },
];

export default adminRoutes;
