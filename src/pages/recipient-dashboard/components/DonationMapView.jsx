import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DonationMapView = ({ donations, onDonationSelect, selectedDonation, className = "" }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const location = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  const handleMarkerClick = (donation) => {
    onDonationSelect(donation);
  };

  const getMarkerColor = (donation) => {
    if (selectedDonation?.id === donation?.id) return '#2D5A27'; // Primary color
    
    const now = new Date();
    const deadline = new Date(donation.pickupDeadline);
    const hoursLeft = Math.ceil((deadline - now) / (1000 * 60 * 60));
    
    if (hoursLeft <= 2) return '#C0392B'; // Error color
    if (hoursLeft <= 6) return '#F39C12'; // Warning color
    return '#27AE60'; // Success color
  };

  const generateMapUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // This would be from environment variables
    
    // For demo purposes, we'll use the iframe embed without API key
    const markers = donations?.map(donation => 
      `${donation?.location?.latitude},${donation?.location?.longitude}`
    )?.join('|');
    
    return `https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={18} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-foreground">
              Donation Locations
            </h3>
            <span className="text-sm text-muted-foreground font-caption">
              ({donations?.length} available)
            </span>
          </div>
          
          {userLocation && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMapCenter(userLocation)}
              iconName="Navigation"
              iconPosition="left"
              iconSize={14}
              className="text-xs"
            >
              My Location
            </Button>
          )}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 lg:h-[500px]">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Donation Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapUrl()}
          className="w-full h-full"
        />
        
        {/* Map Overlay with Donation Markers (Simulated) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This would typically be handled by Google Maps API with actual markers */}
          {/* For demo purposes, we show a legend instead */}
        </div>
      </div>
      {/* Map Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="font-caption text-muted-foreground">Available (6+ hours)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="font-caption text-muted-foreground">Urgent (2-6 hours)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="font-caption text-muted-foreground">Very Urgent (&lt;2 hours)</span>
            </div>
          </div>
          
          {selectedDonation && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="font-caption text-foreground font-medium">Selected</span>
            </div>
          )}
        </div>
      </div>
      {/* Selected Donation Info */}
      {selectedDonation && (
        <div className="p-4 border-t border-border bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-heading font-medium text-foreground">
                {selectedDonation?.foodType}
              </h4>
              <p className="text-sm text-muted-foreground font-caption">
                {selectedDonation?.donorName} • {selectedDonation?.quantity} servings
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {selectedDonation?.distance} km away
              </p>
            </div>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onDonationSelect(selectedDonation)}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              View Details
            </Button>
          </div>
        </div>
      )}
      {/* No Donations Message */}
      {donations?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="MapPin" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
          <h4 className="font-heading font-medium text-foreground mb-2">
            No donations in this area
          </h4>
          <p className="text-sm text-muted-foreground font-caption">
            Try adjusting your filters or expanding your search radius
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationMapView;