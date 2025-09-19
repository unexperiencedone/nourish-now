import React, { useState } from 'react';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import Header from '../../components/ui/Header';
import { DonorDashboardLayout, DonorMainPanel, DonorSidePanel } from '../../components/ui/DashboardLayoutContainer';
import MyListings from './components/MyListings';
import CreateDonationForm from './components/CreateDonationForm';
import DonationDetailsModal from './components/DonationDetailsModal';
import MobileTabbedView from './components/MobileTabbedView';
import Icon from '../../components/AppIcon';

const DonorDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [refreshListings, setRefreshListings] = useState(0);

  const handleDonationCreated = (newDonation) => {
    // Trigger refresh of listings
    setRefreshListings(prev => prev + 1);
    
    // Show success feedback
    console.log('New donation created:', newDonation);
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setIsDetailsModalOpen(true);
  };

  const handleEditDonation = (donation) => {
    // In a real app, this would populate the form with existing data
    console.log('Edit donation:', donation);
  };

  const handleMarkComplete = (donation) => {
    // In a real app, this would update the donation status in Firestore
    console.log('Mark complete:', donation);
    setRefreshListings(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedDonation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        userRole="donor"
        isAuthenticated={true}
        onLogout={logout}
      />

      {/* Main Content */}
      <DonorDashboardLayout>
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Welcome back, {user?.name || 'Donor'}!
                </h1>
                <p className="text-muted-foreground font-caption">
                  Thank you for helping reduce food waste and feeding those in need.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Two-Panel Layout */}
        <div className="hidden md:grid md:grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Main Panel - My Listings */}
          <DonorMainPanel>
            <MyListings
              key={refreshListings} // Force re-render when new donation is created
              onEditDonation={handleEditDonation}
              onViewDetails={handleViewDetails}
            />
          </DonorMainPanel>

          {/* Side Panel - Create Donation Form */}
          <DonorSidePanel>
            <CreateDonationForm
              onDonationCreated={handleDonationCreated}
            />
          </DonorSidePanel>
        </div>

        {/* Mobile Tabbed Interface */}
        <div className="md:hidden">
          <MobileTabbedView
            myListingsComponent={
              <MyListings
                key={refreshListings}
                onEditDonation={handleEditDonation}
                onViewDetails={handleViewDetails}
              />
            }
            createDonationComponent={
              <CreateDonationForm
                onDonationCreated={handleDonationCreated}
              />
            }
          />
        </div>
      </DonorDashboardLayout>

      {/* Donation Details Modal */}
      <DonationDetailsModal
        donation={selectedDonation}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditDonation}
        onMarkComplete={handleMarkComplete}
      />
    </div>
  );
};

export default DonorDashboard;