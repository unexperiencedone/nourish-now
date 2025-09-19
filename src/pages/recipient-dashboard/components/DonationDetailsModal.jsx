import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DonationDetailsModal = ({ donation, isOpen, onClose, onClaimDonation }) => {
  const [isClaimingDonation, setIsClaimingDonation] = useState(false);

  if (!isOpen || !donation) return null;

  const handleClaimDonation = async () => {
    setIsClaimingDonation(true);
    try {
      await onClaimDonation(donation?.id);
      onClose();
    } catch (error) {
      console.error('Error claiming donation:', error);
    } finally {
      setIsClaimingDonation(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUrgency = () => {
    const now = new Date();
    const deadline = new Date(donation.pickupDeadline);
    const hoursLeft = Math.ceil((deadline - now) / (1000 * 60 * 60));
    
    if (hoursLeft <= 2) return { color: 'text-error', urgency: 'Very Urgent' };
    if (hoursLeft <= 6) return { color: 'text-warning', urgency: 'Urgent' };
    return { color: 'text-success', urgency: 'Available' };
  };

  const timeUrgency = getTimeUrgency();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-soft border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
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
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            {/* Donation Image */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={donation?.imageUrl || "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop"}
                alt={donation?.description}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-caption font-medium ${timeUrgency?.color} bg-card/90 backdrop-blur-sm`}>
                  {timeUrgency?.urgency}
                </span>
              </div>
            </div>

            {/* Donor Information */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Store" size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">
                    {donation?.donorName}
                  </h3>
                  <p className="text-sm text-muted-foreground font-caption">
                    {donation?.donorType} • {donation?.distance} km away
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Star" size={14} color="var(--color-warning)" />
                    <span className="text-sm font-caption text-muted-foreground">
                      4.8 rating • 127 donations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Details */}
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {donation?.foodType}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {donation?.description}
                </p>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Package" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-caption font-medium text-foreground">
                      Quantity
                    </span>
                  </div>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    {donation?.quantity} servings
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Clock" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-caption font-medium text-foreground">
                      Pickup By
                    </span>
                  </div>
                  <p className="text-sm font-heading font-semibold text-foreground">
                    {formatDateTime(donation?.pickupDeadline)}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                <Icon name="MapPin" size={18} color="var(--color-primary)" />
                <span>Pickup Location</span>
              </h4>
              
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-foreground font-medium mb-1">
                  {donation?.location?.address}
                </p>
                <p className="text-xs text-muted-foreground font-caption">
                  {donation?.location?.city}, {donation?.location?.state} {donation?.location?.zipCode}
                </p>
              </div>

              {/* Embedded Map */}
              <div className="h-48 rounded-lg overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={`${donation?.donorName} Location`}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${donation?.location?.latitude},${donation?.location?.longitude}&z=15&output=embed`}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Special Instructions */}
            {donation?.specialInstructions && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} color="var(--color-accent)" className="mt-0.5" />
                  <div>
                    <h5 className="font-caption font-medium text-foreground mb-1">
                      Special Instructions
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {donation?.specialInstructions}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} />
              <span className="font-caption">3 other recipients viewing</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              
              <Button
                variant="default"
                onClick={handleClaimDonation}
                loading={isClaimingDonation}
                iconName="Heart"
                iconPosition="left"
                iconSize={16}
                disabled={donation?.status !== 'available'}
                className="px-6"
              >
                {isClaimingDonation ? 'Claiming...' : 'Claim Donation'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsModal;