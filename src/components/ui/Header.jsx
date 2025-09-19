import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = null, isAuthenticated = false, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return [
        { path: '/login', label: 'Login', icon: 'LogIn' },
        { path: '/register', label: 'Register', icon: 'UserPlus' }
      ];
    }

    if (userRole === 'donor') {
      return [
        { path: '/donor-dashboard', label: 'My Donations', icon: 'Package' }
      ];
    }

    if (userRole === 'recipient') {
      return [
        { path: '/recipient-dashboard', label: 'Find Food', icon: 'Search' }
      ];
    }

    return [];
  };

  const navigationItems = getNavigationItems();
  const isCurrentPath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation(isAuthenticated ? (userRole === 'donor' ? '/donor-dashboard' : '/recipient-dashboard') : '/')}
              className="flex items-center space-x-3 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                NourishNow
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isCurrentPath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                className="px-4 py-2"
              >
                {item?.label}
              </Button>
            ))}
            
            {isAuthenticated && (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={18}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground"
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              size="icon"
              className="w-10 h-10"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isCurrentPath(item?.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  className="justify-start px-3 py-2"
                >
                  {item?.label}
                </Button>
              ))}
              
              {isAuthenticated && (
                <div className="pt-2 mt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={18}
                    fullWidth
                    className="justify-start px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;