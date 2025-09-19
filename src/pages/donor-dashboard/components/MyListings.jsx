import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MyListings = ({ onEditDonation, onViewDetails }) => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for donor listings
  const mockListings = [
    {
      id: "donation_001",
      title: "Fresh Bakery Items",
      description: "Assorted fresh bread, pastries, and croissants from our morning batch. All items are still warm and perfect for immediate consumption.",
      quantity: "25 items",
      pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      location: {
        address: "123 Main Street, Downtown",
        lat: 40.7128,
        lng: -74.0060
      },
      status: "available",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      claimedBy: null,
      donorName: "Sunrise Bakery",
      image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
    },
    {
      id: "donation_002",
      title: "Restaurant Surplus Meals",
      description: "Pre-packaged meals including pasta dishes, salads, and sandwiches. All items are properly sealed and refrigerated.",
      quantity: "40 meals",
      pickupDeadline: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      location: {
        address: "456 Oak Avenue, Midtown",
        lat: 40.7589,
        lng: -73.9851
      },
      status: "claimed",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      claimedBy: "Community Food Bank",
      claimedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      donorName: "Green Garden Restaurant",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    },
    {
      id: "donation_003",
      title: "Grocery Store Produce",
      description: "Fresh fruits and vegetables that are approaching sell-by date but still perfectly good for consumption. Includes apples, bananas, lettuce, and tomatoes.",
      quantity: "60 lbs",
      pickupDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      location: {
        address: "789 Pine Street, Uptown",
        lat: 40.7831,
        lng: -73.9712
      },
      status: "available",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      claimedBy: null,
      donorName: "Fresh Market Plus",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg"
    },
    {
      id: "donation_004",
      title: "Catered Event Leftovers",
      description: "High-quality catered food from corporate event including sandwiches, fruit platters, and desserts. All items are fresh and untouched.",
      quantity: "80 servings",
      pickupDeadline: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago (expired)
      location: {
        address: "321 Business Plaza, Financial District",
        lat: 40.7074,
        lng: -74.0113
      },
      status: "completed",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      claimedBy: "Helping Hands Shelter",
      claimedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      donorName: "Elite Catering Services",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
    }
  ];

  useEffect(() => {
    // Simulate real-time Firestore listener
    const simulateFirestoreListener = () => {
      setLoading(true);
      setTimeout(() => {
        setListings(mockListings);
        setLoading(false);
      }, 1000);
    };

    simulateFirestoreListener();

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setListings(prevListings => 
        prevListings?.map(listing => ({
          ...listing,
          // Simulate random status updates
          status: Math.random() > 0.9 && listing?.status === 'available' ? 'claimed' : listing?.status
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredListings = () => {
    if (filter === 'all') return listings;
    return listings?.filter(listing => listing?.status === filter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'claimed':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
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

  const filteredListings = getFilteredListings();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-foreground">My Listings</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse-gentle">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-muted rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          My Listings ({filteredListings?.length})
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'available' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('available')}
            iconName="Clock"
            iconPosition="left"
            iconSize={16}
          >
            Available
          </Button>
          <Button
            variant={filter === 'claimed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('claimed')}
            iconName="Package"
            iconPosition="left"
            iconSize={16}
          >
            Claimed
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={16}
          >
            Completed
          </Button>
        </div>
      </div>
      {/* Listings Grid */}
      {filteredListings?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Package" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No {filter === 'all' ? '' : filter} listings found
          </h3>
          <p className="text-muted-foreground font-caption">
            {filter === 'all' 
              ? "Create your first donation to get started."
              : `You don't have any ${filter} donations at the moment.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredListings?.map((listing) => (
            <div key={listing?.id} className="bg-card border border-border rounded-lg shadow-soft hover:shadow-md transition-smooth">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Donation Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={listing?.image}
                      alt={listing?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Donation Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                          {listing?.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-caption">
                          <span className="flex items-center space-x-1">
                            <Icon name="Package" size={14} />
                            <span>{listing?.quantity}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="MapPin" size={14} />
                            <span>{listing?.location?.address}</span>
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(listing?.status)}`}>
                        <Icon name={getStatusIcon(listing?.status)} size={12} />
                        <span className="capitalize">{listing?.status}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground font-caption mb-4 line-clamp-2">
                      {listing?.description}
                    </p>

                    {/* Pickup Deadline */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`flex items-center space-x-1 ${
                          new Date(listing.pickupDeadline) < new Date() 
                            ? 'text-error' :'text-muted-foreground'
                        } font-caption`}>
                          <Icon name="Clock" size={14} />
                          <span>{formatTimeRemaining(listing?.pickupDeadline)}</span>
                        </span>
                        
                        {listing?.claimedBy && (
                          <span className="flex items-center space-x-1 text-muted-foreground font-caption">
                            <Icon name="User" size={14} />
                            <span>Claimed by {listing?.claimedBy}</span>
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(listing)}
                          iconName="Eye"
                          iconPosition="left"
                          iconSize={16}
                        >
                          View Details
                        </Button>
                        
                        {listing?.status === 'available' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditDonation(listing)}
                            iconName="Edit"
                            iconPosition="left"
                            iconSize={16}
                          >
                            Edit
                          </Button>
                        )}
                        
                        {listing?.status === 'claimed' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              // Mark as completed
                              setListings(prev => 
                                prev?.map(l => 
                                  l?.id === listing?.id 
                                    ? { ...l, status: 'completed', completedAt: new Date() }
                                    : l
                                )
                              );
                            }}
                            iconName="CheckCircle"
                            iconPosition="left"
                            iconSize={16}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;