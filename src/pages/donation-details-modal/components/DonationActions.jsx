import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DonationActions = ({ donation, onClaim, onClose, currentUser }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClaimDonation = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update donation status
      const updatedDonation = {
        ...donation,
        status: 'claimed',
        claimedBy: currentUser?.id,
        claimedAt: new Date()?.toISOString(),
        claimedByName: currentUser?.name
      };
      
      onClaim(updatedDonation);
      
      // Show success message briefly before closing
      setTimeout(() => {
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error('Error claiming donation:', error);
      setIsProcessing(false);
      setShowConfirmation(false);
    }
  };

  const handleGetDirections = () => {
    const { latitude, longitude } = donation?.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const handleContactDonor = () => {
    const phone = donation?.contactPhone || '+1 (555) 123-4567';
    window.open(`tel:${phone}`);
  };

  const isAvailable = donation?.status === 'available';
  const isExpired = new Date(donation.pickupDeadline) < new Date();

  if (isProcessing) {
    return (
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-center space-x-3 py-4">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground font-caption">
            Processing your claim...
          </span>
        </div>
      </div>
    );
  }

  if (donation?.status === 'claimed' && donation?.claimedBy === currentUser?.id) {
    return (
      <div className="p-6 border-t border-border bg-success/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-success">
              Successfully Claimed!
            </h4>
            <p className="text-sm text-success/80 font-caption">
              You have claimed this donation. Please pick it up before the deadline.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={handleGetDirections}
            iconName="Navigation"
            iconPosition="left"
            className="flex-1"
          >
            Get Directions
          </Button>
          <Button
            variant="outline"
            onClick={handleContactDonor}
            iconName="Phone"
            iconPosition="left"
            className="flex-1"
          >
            Contact Donor
          </Button>
        </div>
      </div>
    );
  }

  if (!isAvailable || isExpired) {
    return (
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="text-center py-4">
          <Icon 
            name={isExpired ? "Clock" : "UserCheck"} 
            size={24} 
            color="var(--color-muted-foreground)" 
            className="mx-auto mb-2"
          />
          <h4 className="font-heading font-semibold text-muted-foreground mb-1">
            {isExpired ? 'Donation Expired' : 'Already Claimed'}
          </h4>
          <p className="text-sm text-muted-foreground font-caption">
            {isExpired 
              ? 'This donation has passed its pickup deadline.'
              : `This donation has been claimed by ${donation?.claimedByName || 'another recipient'}.`
            }
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onClose}
          fullWidth
          className="mt-4"
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 border-t border-border">
      {showConfirmation ? (
        <div className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div>
                <h5 className="font-heading font-medium text-warning mb-1">
                  Confirm Your Claim
                </h5>
                <p className="text-sm text-foreground font-caption">
                  By claiming this donation, you commit to picking it up before the deadline. 
                  Are you sure you want to proceed?
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={handleClaimDonation}
              iconName="Check"
              iconPosition="left"
              className="flex-1"
            >
              Yes, Claim Donation
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              iconName="X"
              iconPosition="left"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Primary Action */}
          <Button
            variant="default"
            onClick={handleClaimDonation}
            iconName="HandHeart"
            iconPosition="left"
            fullWidth
            className="h-12 text-base font-semibold"
          >
            Claim This Donation
          </Button>
          
          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleGetDirections}
              iconName="Navigation"
              iconPosition="left"
            >
              Directions
            </Button>
            <Button
              variant="outline"
              onClick={handleContactDonor}
              iconName="Phone"
              iconPosition="left"
            >
              Contact
            </Button>
          </div>
          
          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground font-caption text-center leading-relaxed">
            By claiming this donation, you agree to pick it up within the specified timeframe 
            and follow all food safety guidelines.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationActions;