import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DonationHeader from './components/DonationHeader';
import DonationMap from './components/DonationMap';
import DonationDetails from './components/DonationDetails';
import DonationActions from './components/DonationActions';

const DonationDetailsModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const donationId = searchParams?.get('id');
  
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock current user (recipient)
  const currentUser = {
    id: 'recipient_001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'recipient',
    organization: 'Community Food Bank'
  };

  // Mock donation data
  const mockDonations = [
    {
      id: 'donation_001',
      donorId: 'donor_001',
      donorName: 'Green Valley Restaurant',
      description: 'Fresh Prepared Meals',
      fullDescription: `High-quality prepared meals including grilled chicken with vegetables, pasta primavera, and fresh garden salads. All meals were prepared today using organic ingredients and are perfect for immediate distribution. Each portion is individually packaged and labeled with ingredients for allergy considerations.`,
      quantity: 25,
      unit: 'meals',
      status: 'available',
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: '123 Green Valley Street, New York, NY 10001'
      },
      pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000)?.toISOString(), // 4 hours from now
      storageRequirements: 'Refrigerated (below 40°F)',
      specialInstructions: `Please bring insulated containers for transport. Meals should be distributed within 2 hours of pickup. Contact us 30 minutes before arrival for preparation.`,
      contactPhone: '+1 (555) 123-4567',
      contactEmail: 'donations@greenvalley.com',
      contactHours: '9:00 AM - 8:00 PM',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString(), // 2 hours ago
      claimedBy: null,
      claimedAt: null,
      claimedByName: null
    },
    {
      id: 'donation_002',
      donorId: 'donor_002',
      donorName: 'Sunrise Bakery',
      description: 'Assorted Fresh Pastries',
      fullDescription: `A variety of fresh pastries including croissants, muffins, Danish pastries, and artisan bread. All items were baked this morning and are still fresh. Perfect for breakfast distribution or community events. Items include both sweet and savory options.`,
      quantity: 40,
      unit: 'pieces',
      status: 'claimed',
      location: {
        latitude: 40.7589,
        longitude: -73.9851,
        address: '456 Sunrise Avenue, New York, NY 10019'
      },
      pickupDeadline: new Date(Date.now() + 6 * 60 * 60 * 1000)?.toISOString(), // 6 hours from now
      storageRequirements: 'Room temperature, dry place',
      specialInstructions: `Items are in bakery boxes. Please handle with care to maintain presentation. Best consumed within 24 hours.`,
      contactPhone: '+1 (555) 987-6543',
      contactEmail: 'info@sunrisebakery.com',
      contactHours: '6:00 AM - 6:00 PM',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)?.toISOString(), // 1 hour ago
      claimedBy: 'recipient_002',
      claimedAt: new Date(Date.now() - 30 * 60 * 1000)?.toISOString(), // 30 minutes ago
      claimedByName: 'Downtown Shelter'
    },
    {
      id: 'donation_003',
      donorId: 'donor_003',
      donorName: 'Metro Grocery Store',
      description: 'Fresh Produce & Dairy',
      fullDescription: `Fresh fruits and vegetables including apples, bananas, carrots, lettuce, and tomatoes. Also includes dairy products like milk, yogurt, and cheese that are approaching sell-by dates but still perfectly good for consumption. All items have been properly stored and maintained.`,
      quantity: 15,
      unit: 'boxes',
      status: 'available',
      location: {
        latitude: 40.7505,
        longitude: -73.9934,
        address: '789 Metro Plaza, New York, NY 10018'
      },
      pickupDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000)?.toISOString(), // 2 hours from now
      storageRequirements: 'Refrigerated immediately',
      specialInstructions: `Dairy products must be kept cold during transport. Produce should be sorted and distributed quickly. Loading dock access available at rear of building.`,
      contactPhone: '+1 (555) 456-7890',
      contactEmail: 'donations@metrogrocery.com',
      contactHours: '8:00 AM - 10:00 PM',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)?.toISOString(), // 3 hours ago
      claimedBy: null,
      claimedAt: null,
      claimedByName: null
    }
  ];

  useEffect(() => {
    // Simulate loading donation data
    const loadDonation = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundDonation = mockDonations?.find(d => d?.id === donationId);
      
      if (foundDonation) {
        setDonation(foundDonation);
      } else {
        // If donation not found, redirect back
        navigate('/recipient-dashboard');
        return;
      }
      
      setLoading(false);
    };

    if (donationId) {
      loadDonation();
    } else {
      navigate('/recipient-dashboard');
    }
  }, [donationId, navigate]);

  const handleClose = () => {
    navigate('/recipient-dashboard');
  };

  const handleClaimDonation = (updatedDonation) => {
    setDonation(updatedDonation);
    
    // In a real app, this would update the global state/database
    console.log('Donation claimed:', updatedDonation);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event?.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-card rounded-lg shadow-soft p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-foreground font-caption">
              Loading donation details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!donation) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-soft border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <DonationHeader 
          donation={donation} 
          onClose={handleClose} 
        />
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column - Map */}
            <div className="space-y-6">
              <DonationMap donation={donation} />
            </div>
            
            {/* Right Column - Details */}
            <div className="space-y-6">
              <DonationDetails donation={donation} />
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <DonationActions 
          donation={donation}
          onClaim={handleClaimDonation}
          onClose={handleClose}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default DonationDetailsModal;