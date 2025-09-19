import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DonationCard = ({ donation, onViewDetails, className = "" }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'claimed':
        return 'text-muted-foreground bg-muted';
      case 'expired':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getUrgencyColor = (hoursLeft) => {
    if (hoursLeft <= 2) return 'text-error';
    if (hoursLeft <= 6) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffInHours = Math.ceil((deadlineDate - now) / (1000 * 60 * 60));
    
    if (diffInHours <= 0) return 'Expired';
    if (diffInHours < 24) return `${diffInHours}h left`;
    
    const days = Math.ceil(diffInHours / 24);
    return `${days}d left`;
  };

  const timeLeft = formatTimeLeft(donation?.pickupDeadline);
  const hoursLeft = Math.ceil((new Date(donation.pickupDeadline) - new Date()) / (1000 * 60 * 60));

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      {/* Donation Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={donation?.imageUrl || "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop"}
          alt={donation?.description}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(donation?.status)}`}>
            {donation?.status?.charAt(0)?.toUpperCase() + donation?.status?.slice(1)}
          </span>
        </div>

        {/* Distance Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-caption">
          {donation?.distance} km away
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Donor Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Store" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm">
              {donation?.donorName}
            </h3>
            <p className="text-xs text-muted-foreground font-caption">
              {donation?.donorType}
            </p>
          </div>
        </div>

        {/* Food Description */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-1">
            {donation?.foodType}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {donation?.description}
          </p>
        </div>

        {/* Quantity and Time Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Package" size={14} />
            <span className="font-caption">{donation?.quantity} servings</span>
          </div>
          
          <div className={`flex items-center space-x-1 ${getUrgencyColor(hoursLeft)}`}>
            <Icon name="Clock" size={14} />
            <span className="font-caption font-medium">{timeLeft}</span>
          </div>
        </div>

        {/* Location Info */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span className="font-caption">{donation?.location?.address}</span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant={donation?.status === 'available' ? 'default' : 'outline'}
            onClick={() => onViewDetails(donation)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            fullWidth
            disabled={donation?.status !== 'available'}
            className="justify-center"
          >
            {donation?.status === 'available' ? 'View Details' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;