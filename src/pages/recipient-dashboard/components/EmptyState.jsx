import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-donations', 
  onRefresh, 
  onClearFilters, 
  hasActiveFilters = false,
  className = "" 
}) => {
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'no-donations':
        return {
          icon: 'Package',
          title: 'No donations available',
          description: 'There are currently no food donations in your area. Check back later or expand your search radius.',
          actionLabel: 'Refresh',
          actionIcon: 'RefreshCw',
          onAction: onRefresh
        };
      
      case 'no-results':
        return {
          icon: 'Search',
          title: 'No matching donations',
          description: 'No donations match your current filters. Try adjusting your search criteria.',
          actionLabel: 'Clear Filters',
          actionIcon: 'X',
          onAction: onClearFilters
        };
      
      case 'loading-error':
        return {
          icon: 'AlertCircle',
          title: 'Unable to load donations',
          description: 'There was an error loading available donations. Please check your connection and try again.',
          actionLabel: 'Try Again',
          actionIcon: 'RefreshCw',
          onAction: onRefresh
        };
      
      case 'location-error':
        return {
          icon: 'MapPin',
          title: 'Location access needed',
          description: 'To show nearby donations, please enable location access in your browser settings.',
          actionLabel: 'Retry Location',
          actionIcon: 'Navigation',
          onAction: onRefresh
        };
      
      default:
        return {
          icon: 'Package',
          title: 'No content available',
          description: 'There is no content to display at the moment.',
          actionLabel: 'Refresh',
          actionIcon: 'RefreshCw',
          onAction: onRefresh
        };
    }
  };

  const config = getEmptyStateConfig();

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft p-8 text-center ${className}`}>
      <div className="max-w-md mx-auto space-y-4">
        {/* Icon */}
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
          <Icon 
            name={config?.icon} 
            size={32} 
            color="var(--color-muted-foreground)" 
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {config?.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground font-caption leading-relaxed">
          {config?.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
          {config?.onAction && (
            <Button
              variant="default"
              onClick={config?.onAction}
              iconName={config?.actionIcon}
              iconPosition="left"
              iconSize={16}
              className="px-6"
            >
              {config?.actionLabel}
            </Button>
          )}

          {/* Secondary action for filtered results */}
          {type === 'no-results' && hasActiveFilters && onRefresh && (
            <Button
              variant="outline"
              onClick={onRefresh}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              className="px-6"
            >
              Refresh
            </Button>
          )}
        </div>

        {/* Additional Help Text */}
        {type === 'no-donations' && (
          <div className="pt-4 border-t border-border mt-6">
            <p className="text-xs text-muted-foreground font-caption">
              New donations are posted throughout the day. Consider setting up notifications to be alerted when new food becomes available in your area.
            </p>
          </div>
        )}

        {type === 'location-error' && (
          <div className="pt-4 border-t border-border mt-6">
            <p className="text-xs text-muted-foreground font-caption">
              You can still browse donations without location access, but distance calculations and nearby sorting won't be available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;