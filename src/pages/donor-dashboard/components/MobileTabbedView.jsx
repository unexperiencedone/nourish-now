import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileTabbedView = ({ 
  myListingsComponent, 
  createDonationComponent, 
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState('listings');

  const tabs = [
    {
      id: 'listings',
      label: 'My Listings',
      icon: 'List',
      component: myListingsComponent
    },
    {
      id: 'create',
      label: 'Create Donation',
      icon: 'Plus',
      component: createDonationComponent
    }
  ];

  return (
    <div className={`md:hidden ${className}`}>
      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-6 bg-card rounded-t-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-4 text-sm font-caption font-medium border-b-2 transition-smooth ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-6">
        {tabs?.find(tab => tab?.id === activeTab)?.component}
      </div>
      {/* Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant={activeTab === 'create' ? 'outline' : 'default'}
          size="lg"
          onClick={() => setActiveTab(activeTab === 'create' ? 'listings' : 'create')}
          iconName={activeTab === 'create' ? 'List' : 'Plus'}
          className="rounded-full shadow-lg w-14 h-14"
        />
      </div>
    </div>
  );
};

export default MobileTabbedView;