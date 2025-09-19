import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-soft">
          <Icon name="Leaf" size={28} color="white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          NourishNow
        </h1>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground font-caption max-w-md mx-auto">
          Sign in to your account to continue connecting food donors with recipients and reducing food waste in your community.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-lg mx-auto">
        <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-md">
          <div className="w-8 h-8 bg-secondary/10 rounded-md flex items-center justify-center">
            <Icon name="Package" size={16} color="var(--color-secondary)" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">For Donors</p>
            <p className="text-xs text-muted-foreground font-caption">Manage food listings</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-md">
          <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center">
            <Icon name="Search" size={16} color="var(--color-accent)" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">For Recipients</p>
            <p className="text-xs text-muted-foreground font-caption">Find available food</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;