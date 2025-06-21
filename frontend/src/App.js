// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// // Contexts
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Pages
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import ParkingSlots from './pages/ParkingSlots';
// import Bookings from './pages/Bookings';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminParkingSlots from './pages/admin/AdminParkingSlots';
// import AdminBookings from './pages/admin/AdminBookings';
// import AdminUsers from './pages/admin/AdminUsers';
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// // Components
// import Layout from './components/Layout';

// // Protected Route Component
// const ProtectedRoute = ({ children, requiredRoles = [] }) => {
//   const { isAuthenticated, user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   // Check if user has required role
//   if (requiredRoles.length > 0) {
//     const hasRequiredRole = user.roles.some(role => 
//       requiredRoles.includes(role.replace('ROLE_', '').toLowerCase())
//     );
    
//     if (!hasRequiredRole) {
//       return <Navigate to="/dashboard" />;
//     }
//   }

//   return children;
// };

// // Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//              <Route path="/forgot-password" element={<ForgotPassword />} />
//              <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <Layout />
//               </ProtectedRoute>
//             }>
//               <Route index element={<Navigate to="/dashboard" />} />
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="parking-slots" element={<ParkingSlots />} />
//               <Route path="bookings" element={<Bookings />} />
              
//               {/* Admin Routes */}
//               <Route path="admin" element={
//                 <ProtectedRoute requiredRoles={['admin']}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               } />
//               <Route path="admin/parking-slots" element={
//                 <ProtectedRoute requiredRoles={['admin']}>
//                   <AdminParkingSlots />
//                 </ProtectedRoute>
//               } />
//               <Route path="admin/bookings" element={
//                 <ProtectedRoute requiredRoles={['admin']}>
//                   <AdminBookings />
//                 </ProtectedRoute>
//               } />
//               <Route path="admin/users" element={
//                 <ProtectedRoute requiredRoles={['admin']}>
//                   <AdminUsers />
//                 </ProtectedRoute>
//               } />
//             </Route>
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ParkingSlots from './pages/ParkingSlots';
import Bookings from './pages/Bookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminParkingSlots from './pages/admin/AdminParkingSlots';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from './pages/AboutUs';

// Components
import Layout from './components/Layout';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if user has required role
  if (requiredRoles.length > 0) {
    const hasRequiredRole = user.roles.some(role =>
      requiredRoles.includes(role.replace('ROLE_', '').toLowerCase())
    );

    if (!hasRequiredRole) {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

// Public Route: Prevent authenticated users from accessing landing, login, or register
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public pages with only login/register/about/landing */}
            
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />

            {/* Protected routes: Only for authenticated users */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="parking-slots" element={<ParkingSlots />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="about-us" element={<AboutUs />} />

              {/* Admin Routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/parking-slots"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AdminParkingSlots />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/bookings"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AdminBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/users"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              {/* Default redirect for authenticated users */}
              <Route index element={<Navigate to="/dashboard" />} />
            </Route>

            {/* Fallback for any undefined routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;