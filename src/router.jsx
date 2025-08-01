import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { FoodDeliveryProvider } from './context/FoodDeliveryContext'; // <-- Import provider

// Pages
import App from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import RestaurantMenu from './pages/food-delivery/RestaurantMenu';

// Admin imports
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import OrdersManagement from './pages/admin/OrdersManagement';
import MessagesManagement from './pages/admin/MessagesManagement';
import UsersManagement from './pages/admin/UsersManagement';
import Analytics from './pages/admin/AdminAnalytics';
import RestaurantHome from './pages/restaurant/RestaurantHome';

// Lazy-loaded pages
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const FoodDelivery = lazy(() => import('./components/fooddelivery'));

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-t-[#4dc8e7] border-slate-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 dark:text-slate-400">Loading...</p>
    </div>
  </div>
);

export function createAppRouter() {
  return createBrowserRouter([
    // Auth Routes
    { 
      path: '/login', 
      element: <AuthPage mode="login" />
    },
    { 
      path: '/signup', 
      element: <AuthPage mode="signup" />
    },
    { 
      path: '/forgot-password', 
      element: <ForgotPasswordPage />
    },
    {
      path: '/restaurant/home',
      element: (
        <ProtectedRoute>
          <RestaurantHome />
        </ProtectedRoute>
      )
    },
    
    // App Routes with Layout
    {
      path: '/',
      element: <AppLayout><HomePage /></AppLayout>,
      errorElement: <AppLayout><NotFoundPage /></AppLayout>
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <AppLayout><ProfilePage /></AppLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/food-delivery',
      element: (
        <AppLayout>
          <Suspense fallback={<LoadingFallback />}>
            <FoodDelivery />
          </Suspense>
        </AppLayout>
      )
    },
    {
      path: '/food-delivery/restaurant/:restaurantId',
      element: (
        <FoodDeliveryProvider>
          <AppLayout>
            <RestaurantMenu />
          </AppLayout>
        </FoodDeliveryProvider>
      )
    },
    {
      path: '/book',
      element: (
        <AppLayout>
          <Suspense fallback={<LoadingFallback />}>
            <BookingPage />
          </Suspense>
        </AppLayout>
      )
    },
    {
      path: '/terms',
      element: (
        <AppLayout>
          <Suspense fallback={<LoadingFallback />}>
            <TermsPage />
          </Suspense>
        </AppLayout>
      )
    },
    {
      path: '/privacy',
      element: (
        <AppLayout>
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPage />
          </Suspense>
        </AppLayout>
      )
    },
    {
      path: '/404',
      element: <AppLayout><NotFoundPage /></AppLayout>
    },
    {
      path: '*',
      element: <Navigate replace to="/404" />
    },
    {
      path: '/admin',
      element: <AdminDashboard />,
      children: [
        { index: true, element: <AdminHome /> },
        { path: 'orders', element: <OrdersManagement /> },
        { path: 'messages', element: <MessagesManagement /> },
        { path: 'users', element: <UsersManagement /> },
        { path: 'analytics', element: <Analytics /> },
        // Add more admin routes as needed
      ]
    }
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  });
};
