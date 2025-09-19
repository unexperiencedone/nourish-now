import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DonationDetailsModal = ({ donation, isOpen, onClose, onEdit, onMarkComplete }) => {
  if (!isOpen || !donation) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10 border-success/20';
      case 'claimed':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'completed':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'Clock';
      case 'claimed':
        return 'Package';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const formatDateTime = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeRemaining = (deadline) => {
    const now = new Date();
    const diff = deadline - now;
    
    if (diff < 0) {
      return 'Expired';
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-soft border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Donation Details
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            className="w-8 h-8"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            {/* Donation Image and Basic Info */}
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={donation?.image}
                  alt={donation?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {donation?.title}
                  </h3>
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-caption font-medium border ${getStatusColor(donation?.status)}`}>
                    <Icon name={getStatusIcon(donation?.status)} size={14} />
                    <span className="capitalize">{donation?.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-caption">
                  <span className="flex items-center space-x-1">
                    <Icon name="Package" size={14} />
                    <span>{donation?.quantity}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Created {formatDateTime(donation?.createdAt)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-heading font-semibold text-foreground">Description</h4>
              <p className="text-muted-foreground font-caption leading-relaxed">
                {donation?.description}
              </p>
            </div>

            {/* Pickup Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Deadline */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Pickup Deadline</span>
                </h4>
                <div className="space-y-1">
                  <p className="text-foreground font-caption">
                    {formatDateTime(donation?.pickupDeadline)}
                  </p>
                  <p className={`text-sm font-caption ${
                    new Date(donation.pickupDeadline) < new Date() 
                      ? 'text-error' :'text-muted-foreground'
                  }`}>
                    {formatTimeRemaining(donation?.pickupDeadline)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Pickup Location</span>
                </h4>
                <p className="text-muted-foreground font-caption">
                  {donation?.location?.address}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-2">
              <h4 className="font-heading font-semibold text-foreground">Location Map</h4>
              <div className="border border-border rounded-lg overflow-hidden h-64">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Donation Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${donation?.location?.lat},${donation?.location?.lng}&z=15&output=embed`}
                />
              </div>
            </div>

            {/* Contact Information */}
            {donation?.contactPhone && (
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>Contact Information</span>
                </h4>
                <p className="text-muted-foreground font-caption">
                  {donation?.contactPhone}
                </p>
              </div>
            )}

            {/* Special Instructions */}
            {donation?.specialInstructions && (
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="Info" size={16} />
                  <span>Special Instructions</span>
                </h4>
                <p className="text-muted-foreground font-caption leading-relaxed">
                  {donation?.specialInstructions}
                </p>
              </div>
            )}

            {/* Claim Information */}
            {donation?.claimedBy && (
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="User" size={16} />
                  <span>Claim Information</span>
                </h4>
                <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                  <p className="text-foreground font-caption">
                    <span className="font-medium">Claimed by:</span> {donation?.claimedBy}
                  </p>
                  {donation?.claimedAt && (
                    <p className="text-muted-foreground font-caption text-sm">
                      <span className="font-medium">Claimed on:</span> {formatDateTime(donation?.claimedAt)}
                    </p>
                  )}
                  {donation?.completedAt && (
                    <p className="text-muted-foreground font-caption text-sm">
                      <span className="font-medium">Completed on:</span> {formatDateTime(donation?.completedAt)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          
          {donation?.status === 'available' && onEdit && (
            <Button
              variant="outline"
              onClick={() => {
                onEdit(donation);
                onClose();
              }}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Edit Donation
            </Button>
          )}
          
          {donation?.status === 'claimed' && onMarkComplete && (
            <Button
              variant="default"
              onClick={() => {
                onMarkComplete(donation);
                onClose();
              }}
              iconName="CheckCircle"
              iconPosition="left"
              iconSize={16}
            >
              Mark as Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsModal;