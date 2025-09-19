import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationWrapper');
  }
  return context;
};

const AuthenticationWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Protected routes that require authentication
  const protectedRoutes = ['/donor-dashboard', '/recipient-dashboard'];
  
  // Public routes that should redirect if authenticated
  const publicRoutes = ['/login', '/register'];

  useEffect(() => {
    // Check for existing authentication state
    const checkAuthState = () => {
      try {
        const savedAuth = localStorage.getItem('nourishnow_auth');
        const savedUser = localStorage.getItem('nourishnow_user');
        
        if (savedAuth && savedUser) {
          const authData = JSON.parse(savedAuth);
          const userData = JSON.parse(savedUser);
          
          if (authData?.isAuthenticated && userData?.role) {
            setIsAuthenticated(true);
            setUserRole(userData?.role);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        // Clear corrupted data
        localStorage.removeItem('nourishnow_auth');
        localStorage.removeItem('nourishnow_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  useEffect(() => {
    if (loading) return;

    const currentPath = location?.pathname;
    
    // Redirect logic
    if (isAuthenticated && publicRoutes?.includes(currentPath)) {
      // Redirect authenticated users away from login/register
      const dashboardPath = userRole === 'donor' ? '/donor-dashboard' : '/recipient-dashboard';
      navigate(dashboardPath, { replace: true });
    } else if (!isAuthenticated && protectedRoutes?.includes(currentPath)) {
      // Redirect unauthenticated users to login
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, userRole, location?.pathname, loading, navigate]);

  const login = (userData) => {
    try {
      const authData = { isAuthenticated: true, timestamp: Date.now() };
      
      localStorage.setItem('nourishnow_auth', JSON.stringify(authData));
      localStorage.setItem('nourishnow_user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUserRole(userData?.role);
      setUser(userData);
      
      // Navigate to appropriate dashboard
      const dashboardPath = userData?.role === 'donor' ? '/donor-dashboard' : '/recipient-dashboard';
      navigate(dashboardPath, { replace: true });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('nourishnow_auth');
      localStorage.removeItem('nourishnow_user');
      
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
      
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const register = (userData) => {
    // Registration logic - for now, same as login
    login(userData);
  };

  const updateUser = (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      localStorage.setItem('nourishnow_user', JSON.stringify(newUserData));
      setUser(newUserData);
      
      // Update role if it changed
      if (updatedUserData?.role && updatedUserData?.role !== userRole) {
        setUserRole(updatedUserData?.role);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const contextValue = {
    isAuthenticated,
    userRole,
    user,
    loading,
    login,
    logout,
    register,
    updateUser,
    // Helper methods
    isDonor: userRole === 'donor',
    isRecipient: userRole === 'recipient',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center animate-pulse-gentle">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="text-lg font-heading font-semibold text-foreground">
            Loading NourishNow...
          </span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationWrapper;