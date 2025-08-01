import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { GroceryProvider } from './context/GroceryContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage'; // <-- Import your booking page
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSecurity from './pages/admin/AdminSecurity';
import AppLayout from './components/AppLayout';
import BookingsManagement from './pages/admin/BookingsManagement';
import UsersManagement from './pages/admin/UsersManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import MessagesManagement from './pages/admin/MessagesManagement';
import BookingsPage from './pages/BookingsPage'; // Import the enhanced bookings page
import BookingDetailPage from './pages/BookingDetailPage'; // Import the booking detail page
import AdminAnalytics from './pages/admin/AdminAnalytics';
import FoodDeliveryApp from './components/food-delivery/FoodDeliveryApp';
import CheckoutPage from './pages/food-delivery/CheckoutPage';
import OrderConfirmationPage from './pages/food-delivery/OrderConfirmationPage';
import OrdersPage from './pages/food-delivery/OrdersPage';
import RegisterRestaurant from './pages/restaurant/RegisterRestaurant';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import MenuItemForm from './pages/restaurant/MenuItemForm';
import RestaurantHome from './pages/restaurant/RestaurantHome';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import RestaurantMenu from './pages/food-delivery/RestaurantMenu';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import OutsourcingDetails from "./pages/services/OutSourcing";


// Import service page components
import ServiceDetails from './components/ServiceDetails';
import TechnicianLayout from './components/technicians/TechnicianLayout';
import Technicians from './pages/services/Technicians';
import Electrician from './pages/services/Electrician';
import Plumber from './pages/services/Plumber';
import Carpenter from './pages/services/Carpenter';
import ACTechnician from './pages/services/ACTechnician';
import ServicesPage from './pages/ServicesPage';
import YourCare from './pages/services/YourCare';

// Import grocery page components
import GroceryHome from './pages/grocery/index';
import GroceryProductDetail from './pages/grocery/products/[id]';
import GroceryCart from './pages/grocery/cart';
import GroceryCheckout from './pages/grocery/checkout';
import CategoriesPage from './pages/grocery/categories/index.jsx';
import GroceryCategoryDetail from './pages/grocery/categories/[id]';
import GrocerySearch from './pages/grocery/search';
import GroceryOrderConfirmation from './pages/grocery/orders/confirmation';
import GroceryOrderDetail from './pages/grocery/orders/[id]';
import GroceryOrders from './pages/grocery/orders';

// Import admin grocery dashboard components
import AddProduct from './pages/admin/grocery/products/AddProduct';
import EditProduct from './pages/admin/grocery/products/EditProduct';
import CategoriesList from './pages/admin/grocery/categories/CategoriesList';
import InventoryManagement from './pages/admin/grocery/inventory/InventoryManagement';
import GroceryAnalytics from './pages/admin/grocery/analytics/GroceryAnalytics';
import ProductsList from './pages/admin/grocery/products/ProductsList'; // <-- Import ProductsList
import GroceryDashboard from './pages/admin/grocery/GroceryDashboard';
import OrdersList from './pages/admin/grocery/orders/OrdersList';

// A component to handle auth redirects
const AuthRedirect = () => {
  const { currentUser, loading } = useAuth();
  console.log(currentUser);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is already logged in, redirect based on role
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    if (currentUser.role === 'restaurant_owner' && currentUser._id) {
      return <Navigate to={`/restaurant/dashboard/${currentUser._id}`} replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Otherwise, continue to auth page
  return <AuthPage />;
};

// User route that requires authentication and user role
const UserRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin trying to access user route
  if (currentUser.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// Admin route that requires authentication and admin role
const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // User without admin role
  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <RestaurantProvider>
      <AuthProvider>
        <GroceryProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
          <Route path="/login" element={<AuthRedirect />} />
          <Route path="/signup" element={<AuthRedirect />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Technician routes with specialized layout */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/technicians" element={<TechnicianLayout />}>
            <Route index element={<Technicians />} />
            <Route path="/services/technicians/electrician" element={<Electrician />} />
            <Route path="/services/technicians/plumber" element={<Plumber />} />
            <Route path="/services/technicians/carpenter" element={<Carpenter />} />
            <Route path="/services/technicians/ac-technician" element={<ACTechnician />} />
            
          </Route>
            <Route path="/services/your-care" element={<YourCare />} />
            <Route path="/services/outsourcing" element={<OutsourcingDetails />} />


          {/* Keep the old routes as well for backward compatibility */}
          <Route path="/services/:serviceType" element={
            <AppLayout>
              <ServiceDetails />
            </AppLayout>
          } />

          {/* User Routes */}
          <Route path="/profile" element={
            <UserRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </UserRoute>
          } />

          {/* Book Now Route */}
          <Route path="/book" element={
            <UserRoute>
              <AppLayout>
                <BookingPage />
              </AppLayout>
            </UserRoute>
          } />

          {/* Enhanced User Bookings Route */}
          <Route path="/bookings" element={
            <UserRoute>
              <AppLayout>
                <BookingsPage />
              </AppLayout>
            </UserRoute>
          } />

          {/* Add Single Booking Details Route */}
          <Route path="/bookings/:bookingId" element={
            <UserRoute>
              <AppLayout>
                <BookingDetailPage />
              </AppLayout>
            </UserRoute>
          } />

          {/* Admin Routes - Properly nested with index route */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }>
            {/* Index route - This will render when path is exactly "/admin" */}
            <Route index element={<AdminHome />} />

            {/* Nested routes */}
            <Route path="profile" element={<AdminProfile />} />
            <Route path="security" element={<AdminSecurity />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="messages" element={<MessagesManagement />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<div>Admin Settings</div>} />
            <Route path="/admin/restaurants" element={<AdminRestaurants />} />
            <Route path="grocery/dashboard" element={<GroceryDashboard />} />
            <Route path="grocery/products" element={<ProductsList />} />
            <Route path="grocery/products/add" element={<AddProduct />} />
            <Route path="grocery/products/edit/:id" element={<EditProduct />} />
            <Route path="grocery/products/view/:id" element={<div>View Product</div>} />
            <Route path="grocery/categories" element={<CategoriesList />} />
            <Route path="grocery/inventory" element={<InventoryManagement />} />
            <Route path="grocery/inventory/report" element={<div>Inventory Reports</div>} />
            <Route path="grocery/analytics" element={<GroceryAnalytics />} />
            <Route path="grocery/orders" element={<OrdersList />} />
          </Route>

          {/* Admin Grocery Dashboard Routes */}
            
            

          {/* Food Delivery Routes */}
          <Route path="/food-delivery" element={<FoodDeliveryApp />} />
          <Route path="/food-delivery/checkout" element={<CheckoutPage />} />
          <Route path="/food-delivery/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/food-delivery/orders" element={<OrdersPage />} />
          <Route path="/food-delivery/restaurant/:restaurantId" element={<RestaurantMenu />} />

          {/* Restaurant Routes */}
          <Route path="/restaurant" element={<RestaurantHome />} />
          <Route path="/restaurant/register" element={<RegisterRestaurant />} />
          <Route path="/restaurant/dashboard/:restaurantId" element={<RestaurantDashboard />} />
          <Route path="/restaurant/:restaurantId/add-menu-item" element={<MenuItemForm />} />
          <Route path="/restaurant/:restaurantId/edit-menu-item/:itemId" element={<MenuItemForm />} />

          {/* Grocery Routes */}
          <Route path="/grocery" element={<GroceryHome />} />
          <Route path="/grocery/products/:id" element={<GroceryProductDetail />} />
          <Route path="/grocery/cart" element={<GroceryCart />} />
          <Route path="/grocery/checkout" element={<GroceryCheckout />} />
          <Route path="/grocery/categories" element={<CategoriesPage />} />
          <Route path="/grocery/categories/:id" element={<GroceryCategoryDetail />} />
          <Route path="/grocery/search" element={<GrocerySearch />} />
          <Route path="/grocery/orders" element={<GroceryOrders />} />
          <Route path="/grocery/orders/confirmation" element={<GroceryOrderConfirmation />} />
          <Route path="/grocery/orders/:id" element={<GroceryOrderDetail />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </GroceryProvider>
      </AuthProvider>
    </RestaurantProvider>
  );
}

export default App;