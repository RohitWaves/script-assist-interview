import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuthStore from './store/authStore';
import LoginPage from './Pages/LoginPage';
import ResourceListPage from './Pages/ResourceListPage';
import ResourceDetailPage from './Pages/ResourceDetailPage';
import Navbar from './Pages/Navbar'; // Assuming you've added the Navbar component
import PrivateRoute from './Protected/PrivateRoute';  // PrivateRoute component to protect routes
import { theme } from './themes/theme';
import './styles/global.css';

const queryClient = new QueryClient();

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Router>
          <RoutesWithNavbar />
        </Router>
      </QueryClientProvider>
    </MantineProvider>
  );
}

// This component will be inside the Router context
function RoutesWithNavbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {/* Only show the Navbar on non-login pages */}
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/resources" 
          element={<PrivateRoute element={<ResourceListPage />} />} 
        />
        <Route 
          path="/resources/:id" 
          element={<PrivateRoute element={<ResourceDetailPage />} />} 
        />
      </Routes>
    </>
  );
}

export default App;
