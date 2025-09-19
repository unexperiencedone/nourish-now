import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ type = 'donations', className = "" }) => {
  const getLoadingConfig = () => {
    switch (type) {
      case 'donations':
        return {
          title: 'Loading donations...',
          description: 'Finding available food donations in your area'
        };
      case 'map':
        return {
          title: 'Loading map...',
          description: 'Preparing donation locations'
        };
      case 'claiming':
        return {
          title: 'Claiming donation...',
          description: 'Processing your request'
        };
      default:
        return {
          title: 'Loading...',
          description: 'Please wait'
        };
    }
  };

  const config = getLoadingConfig();

  // Card skeleton for donation loading
  const DonationCardSkeleton = () => (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-muted"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Donor info skeleton */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full"></div>
          <div className="space-y-1 flex-1">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-3 bg-muted rounded w-16"></div>
          </div>
        </div>
        
        {/* Food description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-32"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-3/4"></div>
        </div>
        
        {/* Info row skeleton */}
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded w-20"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
        
        {/* Location skeleton */}
        <div className="h-3 bg-muted rounded w-40"></div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-muted rounded"></div>
      </div>
    </div>
  );

  if (type === 'donations') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Loading header */}
        <div className="text-center py-4">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mx-auto mb-3 animate-pulse-gentle">
            <Icon name="Leaf" size={20} color="white" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-1">
            {config?.title}
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            {config?.description}
          </p>
        </div>
        {/* Card skeletons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)]?.map((_, index) => (
            <DonationCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'map') {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-soft overflow-hidden ${className}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="h-96 lg:h-[500px] bg-muted animate-pulse flex items-center justify-center">
          <div className="text-center">
            <Icon name="Map" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-caption">
              {config?.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default loading state
  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft p-8 text-center ${className}`}>
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse-gentle">
          <Icon name="Loader2" size={32} color="var(--color-primary)" className="animate-spin" />
        </div>
        
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {config?.title}
        </h3>
        
        <p className="text-muted-foreground font-caption">
          {config?.description}
        </p>
        
        <div className="flex justify-center space-x-1 pt-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;