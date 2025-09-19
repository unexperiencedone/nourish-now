import React from 'react';
import Icon from '../../../components/AppIcon';

const DonationDetails = ({ donation }) => {
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;
    
    if (timeDiff <= 0) {
      return { expired: true, text: 'Expired' };
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return { expired: false, text: `${days} day${days > 1 ? 's' : ''} remaining` };
    }
    
    if (hours > 0) {
      return { expired: false, text: `${hours}h ${minutes}m remaining` };
    }
    
    return { expired: false, text: `${minutes} minutes remaining` };
  };

  const timeRemaining = getTimeRemaining(donation?.pickupDeadline);

  const detailItems = [
    {
      icon: 'Package',
      label: 'Quantity Available',
      value: `${donation?.quantity} ${donation?.unit || 'portions'}`,
      color: 'text-primary'
    },
    {
      icon: 'Clock',
      label: 'Pickup Deadline',
      value: new Date(donation.pickupDeadline)?.toLocaleString(),
      color: timeRemaining?.expired ? 'text-error' : 'text-warning'
    },
    {
      icon: 'Calendar',
      label: 'Time Remaining',
      value: timeRemaining?.text,
      color: timeRemaining?.expired ? 'text-error' : 'text-success'
    },
    {
      icon: 'Thermometer',
      label: 'Storage Requirements',
      value: donation?.storageRequirements || 'Room temperature',
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h4 className="font-heading font-semibold text-foreground mb-2">
          Food Description
        </h4>
        <p className="text-muted-foreground font-caption leading-relaxed">
          {donation?.fullDescription || donation?.description}
        </p>
      </div>
      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {detailItems?.map((item, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-md bg-background flex items-center justify-center ${item?.color}`}>
                <Icon name={item?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-caption uppercase tracking-wide">
                  {item?.label}
                </p>
                <p className={`text-sm font-medium ${item?.color}`}>
                  {item?.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Special Instructions */}
      {donation?.specialInstructions && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <h5 className="font-heading font-medium text-accent mb-1">
                Special Instructions
              </h5>
              <p className="text-sm text-foreground font-caption">
                {donation?.specialInstructions}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="font-heading font-semibold text-foreground mb-3">
          Donor Contact
        </h5>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground font-caption">
              {donation?.contactPhone || '+1 (555) 123-4567'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground font-caption">
              {donation?.contactEmail || 'contact@donor.com'}
            </span>
          </div>
          {donation?.contactHours && (
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground font-caption">
                Available: {donation?.contactHours}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;