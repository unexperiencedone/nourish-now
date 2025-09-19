import React from 'react';

const DonationMap = ({ donation }) => {
  const { latitude, longitude, address } = donation?.location;
  
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h4 className="font-heading font-semibold text-foreground mb-1">
          Pickup Location
        </h4>
        <p className="text-sm text-muted-foreground font-caption">
          {address}
        </p>
      </div>
      <div className="relative h-64 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`${donation?.donorName} Pickup Location`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          className="border-0"
        />
        
        {/* Overlay for better mobile interaction */}
        <div className="absolute inset-0 pointer-events-none bg-transparent" />
      </div>
      <div className="p-3 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
          <span>Coordinates: {latitude?.toFixed(6)}, {longitude?.toFixed(6)}</span>
          <span>Zoom: 15x</span>
        </div>
      </div>
    </div>
  );
};

export default DonationMap;