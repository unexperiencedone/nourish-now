import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import { useModal } from '../../components/ui/ModalOverlayManager';
import Header from '../../components/ui/Header';
import { RecipientDashboardLayout, RecipientCardGrid } from '../../components/ui/DashboardLayoutContainer';
import DonationCard from './components/DonationCard';
import FilterPanel from './components/FilterPanel';
import DonationDetailsModal from './components/DonationDetailsModal';
import DonationMapView from './components/DonationMapView';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';

import Button from '../../components/ui/Button';

const RecipientDashboard = () => {
  const { user, userRole, logout } = useAuth();
  const { openModal, closeModal } = useModal();
  
  // State management
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMapView, setIsMapView] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    foodType: 'all',
    distance: 'all',
    pickupTime: 'all',
    minQuantity: ''
  });

  // Mock recipient user data
  const mockRecipient = {
    id: 'recipient_001',
    name: 'Community Food Bank',
    email: 'contact@communityfoodbank.org',
    phone: '+1 (555) 123-4567',
    organizationType: 'Food Bank',
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: '123 Community Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    verificationStatus: 'verified',
    joinedDate: '2024-01-15'
  };

  // Mock donations data with real-time simulation
  const mockDonations = [
    {
      id: 'donation_001',
      donorId: 'donor_001',
      donorName: 'Green Leaf Restaurant',
      donorType: 'Restaurant',
      foodType: 'Prepared Meals',
      description: `Fresh vegetarian meals including quinoa bowls, roasted vegetable wraps, and seasonal salads.\nAll items prepared today and safe for immediate consumption.\nPerfect for community meal programs.`,
      quantity: 25,
      status: 'available',
      pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000)?.toISOString(), // 4 hours from now
      location: {
        latitude: 40.7505,
        longitude: -73.9934,
        address: '456 Restaurant Row',
        city: 'New York',
        state: 'NY',
        zipCode: '10018'
      },
      distance: 2.3,
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      specialInstructions: 'Please bring insulated containers. Use staff entrance on the side of the building.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 'donation_002',
      donorId: 'donor_002',
      donorName: 'Fresh Market Grocery',
      donorType: 'Grocery Store',
      foodType: 'Fresh Produce',
      description: `Assorted fresh fruits and vegetables including apples, bananas, carrots, and leafy greens.\nAll items are cosmetically imperfect but perfectly edible.\nGreat for food distribution programs.`,
      quantity: 50,
      status: 'available',
      pickupDeadline: new Date(Date.now() + 8 * 60 * 60 * 1000)?.toISOString(), // 8 hours from now
      location: {
        latitude: 40.7614,
        longitude: -73.9776,
        address: '789 Market Avenue',
        city: 'New York',
        state: 'NY',
        zipCode: '10019'
      },
      distance: 1.8,
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      specialInstructions: 'Pickup available at loading dock. Ring bell for assistance.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 'donation_003',
      donorId: 'donor_003',
      donorName: 'Sunrise Bakery',
      donorType: 'Bakery',
      foodType: 'Baked Goods',
      description: `Day-old artisan breads, pastries, and muffins.\nAll items baked fresh yesterday and still delicious.\nIncludes whole grain breads and assorted breakfast pastries.`,
      quantity: 15,
      status: 'available',
      pickupDeadline: new Date(Date.now() + 1.5 * 60 * 60 * 1000)?.toISOString(), // 1.5 hours from now
      location: {
        latitude: 40.7648,
        longitude: -73.9808,
        address: '321 Bakery Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '10025'
      },
      distance: 3.1,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      specialInstructions: 'Items are in boxes ready for pickup. Please arrive before 6 PM.',
      createdAt: new Date(Date.now() - 30 * 60 * 1000)?.toISOString()
    },
    {
      id: 'donation_004',
      donorId: 'donor_004',
      donorName: 'Campus Dining Hall',
      donorType: 'Institution',
      foodType: 'Prepared Meals',
      description: `Surplus meals from university dining including pasta dishes, grilled chicken, and side vegetables.\nAll items prepared under strict food safety guidelines.\nSuitable for immediate distribution.`,
      quantity: 40,
      status: 'available',
      pickupDeadline: new Date(Date.now() + 6 * 60 * 60 * 1000)?.toISOString(), // 6 hours from now
      location: {
        latitude: 40.7282,
        longitude: -73.9942,
        address: '555 University Plaza',
        city: 'New York',
        state: 'NY',
        zipCode: '10003'
      },
      distance: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      specialInstructions: 'Contact dining services manager upon arrival. Parking available in visitor lot.',
      createdAt: new Date(Date.now() - 45 * 60 * 1000)?.toISOString()
    },
    {
      id: 'donation_005',
      donorId: 'donor_005',
      donorName: 'Corner Deli',
      donorType: 'Deli',
      foodType: 'Packaged Food',
      description: `Pre-packaged sandwiches, salads, and snacks approaching sell-by date.\nAll items properly refrigerated and safe for consumption.\nIncludes variety of dietary options.`,
      quantity: 20,
      status: 'available',
      pickupDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000)?.toISOString(), // 12 hours from now
      location: {
        latitude: 40.7831,
        longitude: -73.9712,
        address: '888 Corner Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10024'
      },
      distance: 5.2,
      imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
      specialInstructions: 'Items are in refrigerated display case. Staff will assist with selection.',
      createdAt: new Date(Date.now() - 15 * 60 * 1000)?.toISOString()
    },
    {
      id: 'donation_006',
      donorId: 'donor_006',
      donorName: 'Healthy Juice Bar',
      donorType: 'Juice Bar',
      foodType: 'Beverages',
      description: `Fresh pressed juices and smoothies from today's production.\nAll natural ingredients with no preservatives.\nMust be consumed within 24 hours.`,
      quantity: 12,
      status: 'available',
      pickupDeadline: new Date(Date.now() + 3 * 60 * 60 * 1000)?.toISOString(), // 3 hours from now
      location: {
        latitude: 40.7419,
        longitude: -74.0049,
        address: '777 Wellness Way',
        city: 'New York',
        state: 'NY',
        zipCode: '10014'
      },
      distance: 2.9,
      imageUrl: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
      specialInstructions: 'Juices are in refrigerated containers. Please bring cooler bags.',
      createdAt: new Date(Date.now() - 20 * 60 * 1000)?.toISOString()
    }
  ];

  // Simulate real-time data loading
  useEffect(() => {
    const loadDonations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Filter only available donations
        const availableDonations = mockDonations?.filter(donation => donation?.status === 'available');
        setDonations(availableDonations);
        setFilteredDonations(availableDonations);
      } catch (err) {
        setError('Failed to load donations');
        console.error('Error loading donations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDonations();

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update donation statuses or add new ones
      setDonations(prevDonations => {
        const updated = [...prevDonations];
        // Simulate occasional status changes
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
          const randomIndex = Math.floor(Math.random() * updated?.length);
          if (updated?.[randomIndex] && Math.random() < 0.3) {
            updated[randomIndex] = { ...updated?.[randomIndex], status: 'claimed' };
          }
        }
        return updated?.filter(donation => donation?.status === 'available');
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Apply filters whenever filters or donations change
  useEffect(() => {
    let filtered = [...donations];

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(donation =>
        donation?.foodType?.toLowerCase()?.includes(searchTerm) ||
        donation?.description?.toLowerCase()?.includes(searchTerm) ||
        donation?.donorName?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Food type filter
    if (filters?.foodType && filters?.foodType !== 'all') {
      filtered = filtered?.filter(donation =>
        donation?.foodType?.toLowerCase()?.replace(/\s+/g, '_') === filters?.foodType
      );
    }

    // Distance filter
    if (filters?.distance && filters?.distance !== 'all') {
      const maxDistance = parseInt(filters?.distance);
      filtered = filtered?.filter(donation => donation?.distance <= maxDistance);
    }

    // Pickup time filter
    if (filters?.pickupTime && filters?.pickupTime !== 'all') {
      const maxHours = parseInt(filters?.pickupTime);
      const now = new Date();
      filtered = filtered?.filter(donation => {
        const deadline = new Date(donation.pickupDeadline);
        const hoursLeft = (deadline - now) / (1000 * 60 * 60);
        return hoursLeft <= maxHours;
      });
    }

    // Minimum quantity filter
    if (filters?.minQuantity) {
      const minQty = parseInt(filters?.minQuantity);
      filtered = filtered?.filter(donation => donation?.quantity >= minQty);
    }

    // Sort by urgency (closest deadline first) and then by distance
    filtered?.sort((a, b) => {
      const deadlineA = new Date(a.pickupDeadline);
      const deadlineB = new Date(b.pickupDeadline);
      const urgencyDiff = deadlineA - deadlineB;
      
      if (urgencyDiff !== 0) return urgencyDiff;
      return a?.distance - b?.distance;
    });

    setFilteredDonations(filtered);
  }, [donations, filters]);

  // Handle donation claiming
  const handleClaimDonation = async (donationId) => {
    try {
      // Simulate API call to claim donation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update donation status
      setDonations(prevDonations =>
        prevDonations?.map(donation =>
          donation?.id === donationId
            ? { ...donation, status: 'claimed', claimedBy: mockRecipient?.id, claimedAt: new Date()?.toISOString() }
            : donation
        )
      );

      // Show success message (could use toast notification)
      console.log('Donation claimed successfully!');
      
    } catch (error) {
      console.error('Error claiming donation:', error);
      throw error;
    }
  };

  // Handle donation selection for details modal
  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    
    const modalId = openModal({
      title: 'Donation Details',
      size: 'lg',
      content: (
        <DonationDetailsModal
          donation={donation}
          isOpen={true}
          onClose={() => closeModal(modalId)}
          onClaimDonation={handleClaimDonation}
        />
      )
    });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      foodType: 'all',
      distance: 'all',
      pickupTime: 'all',
      minQuantity: ''
    });
  };

  // Handle view toggle
  const handleToggleView = (mapView) => {
    setIsMapView(mapView);
  };

  // Handle refresh
  const handleRefresh = () => {
    window.location?.reload();
  };

  // Check if filters are active
  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== 'all' && value !== '' && value !== null
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        isAuthenticated={true}
        onLogout={logout}
      />
      <RecipientDashboardLayout
        filters={
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMapView={isMapView}
            onToggleView={handleToggleView}
          />
        }
      >
        {/* Dashboard Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Available Donations
              </h1>
              <p className="text-muted-foreground font-caption">
                Discover and claim food donations in your area
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              <Button
                variant="outline"
                onClick={handleRefresh}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
                className="hidden sm:flex"
              >
                Refresh
              </Button>
              
              {/* Results Count */}
              <div className="text-sm text-muted-foreground font-caption">
                {isLoading ? 'Loading...' : `${filteredDonations?.length} donations found`}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {!isLoading && donations?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="text-lg font-heading font-bold text-primary">
                  {donations?.length}
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  Total Available
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="text-lg font-heading font-bold text-success">
                  {donations?.filter(d => {
                    const hoursLeft = (new Date(d.pickupDeadline) - new Date()) / (1000 * 60 * 60);
                    return hoursLeft <= 6;
                  })?.length}
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  Urgent Pickup
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="text-lg font-heading font-bold text-accent">
                  {donations?.reduce((sum, d) => sum + d?.quantity, 0)}
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  Total Servings
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="text-lg font-heading font-bold text-secondary">
                  {Math.round(donations?.reduce((sum, d) => sum + d?.distance, 0) / donations?.length * 10) / 10 || 0}
                </div>
                <div className="text-xs text-muted-foreground font-caption">
                  Avg Distance (km)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {isLoading ? (
          <LoadingState type="donations" />
        ) : error ? (
          <EmptyState 
            type="loading-error" 
            onRefresh={handleRefresh}
          />
        ) : filteredDonations?.length === 0 ? (
          <EmptyState 
            type={hasActiveFilters ? "no-results" : "no-donations"}
            onRefresh={handleRefresh}
            onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
            hasActiveFilters={hasActiveFilters}
          />
        ) : isMapView ? (
          <DonationMapView
            donations={filteredDonations}
            onDonationSelect={handleViewDetails}
            selectedDonation={selectedDonation}
          />
        ) : (
          <RecipientCardGrid>
            {filteredDonations?.map((donation) => (
              <DonationCard
                key={donation?.id}
                donation={donation}
                onViewDetails={handleViewDetails}
              />
            ))}
          </RecipientCardGrid>
        )}

        {/* Mobile View Toggle (shown only on mobile when filters are hidden) */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <div className="flex flex-col space-y-2">
            <Button
              variant={isMapView ? "default" : "outline"}
              size="icon"
              onClick={() => handleToggleView(!isMapView)}
              iconName={isMapView ? "List" : "Map"}
              className="w-12 h-12 rounded-full shadow-lg"
            />
          </div>
        </div>
      </RecipientDashboardLayout>
    </div>
  );
};

export default RecipientDashboard;