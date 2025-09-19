import React from 'react';
import Icon from '../../../components/AppIcon';

const DonationHeader = ({ donation, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'claimed':
        return 'text-warning bg-warning/10';
      case 'expired':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'claimed':
        return 'Clock';
      case 'expired':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <div className="flex items-start justify-between p-6 border-b border-border">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Store" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-heading font-semibold text-foreground truncate">
              {donation?.donorName}
            </h2>
            <p className="text-sm text-muted-foreground font-caption">
              Food Donor
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-heading font-bold text-foreground mb-2">
          {donation?.description}
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-caption font-medium ${getStatusColor(donation?.status)}`}>
            <Icon name={getStatusIcon(donation?.status)} size={12} />
            <span className="capitalize">{donation?.status}</span>
          </div>
          <div className="text-xs text-muted-foreground font-caption">
            Posted {new Date(donation.createdAt)?.toLocaleDateString()}
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
        aria-label="Close modal"
      >
        <Icon name="X" size={20} />
      </button>
    </div>
  );
};

export default DonationHeader;