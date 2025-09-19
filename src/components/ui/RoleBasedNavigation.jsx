import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavigation = ({ userRole, isAuthenticated = false, className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getDashboardConfig = () => {
    if (!isAuthenticated) return null;

    if (userRole === 'donor') {
      return {
        title: 'Donor Dashboard',
        path: '/donor-dashboard',
        icon: 'Package',
        description: 'Manage your food donations'
      };
    }

    if (userRole === 'recipient') {
      return {
        title: 'Recipient Dashboard',
        path: '/recipient-dashboard',
        icon: 'Search',
        description: 'Find available food donations'
      };
    }

    return null;
  };

  const dashboardConfig = getDashboardConfig();
  const isCurrentPath = (path) => location?.pathname === path;

  if (!dashboardConfig) {
    return null;
  }

  return (
    <div className={`bg-card border border-border rounded-md shadow-soft p-4 ${className}`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
          <Icon name={dashboardConfig?.icon} size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            {dashboardConfig?.title}
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            {dashboardConfig?.description}
          </p>
        </div>
      </div>
      <Button
        variant={isCurrentPath(dashboardConfig?.path) ? "default" : "outline"}
        onClick={() => handleNavigation(dashboardConfig?.path)}
        iconName={dashboardConfig?.icon}
        iconPosition="left"
        iconSize={18}
        fullWidth
        className="justify-start"
      >
        Go to Dashboard
      </Button>
      {/* Role Indicator */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            userRole === 'donor' ? 'bg-secondary' : 'bg-accent'
          }`} />
          <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
            {userRole} Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNavigation;