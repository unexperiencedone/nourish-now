import React from 'react';

const DashboardLayoutContainer = ({ 
  children, 
  userRole, 
  className = "",
  showSidebar = false,
  sidebarContent = null 
}) => {
  const getLayoutClasses = () => {
    if (userRole === 'donor') {
      // Two-panel layout for donors (MyListings + CreateDonationForm)
      return showSidebar 
        ? "grid grid-cols-1 lg:grid-cols-3 gap-6" :"grid grid-cols-1 xl:grid-cols-2 gap-6";
    }
    
    if (userRole === 'recipient') {
      // Card-based browsing layout for recipients
      return showSidebar
        ? "grid grid-cols-1 lg:grid-cols-4 gap-6" :"flex flex-col space-y-6";
    }
    
    // Default single column layout
    return "flex flex-col space-y-6";
  };

  const getContentAreaClasses = () => {
    if (userRole === 'donor' && showSidebar) {
      return "lg:col-span-2";
    }
    
    if (userRole === 'recipient' && showSidebar) {
      return "lg:col-span-3";
    }
    
    return "";
  };

  return (
    <div className={`min-h-screen bg-background pt-16 ${className}`}>
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={getLayoutClasses()}>
          {/* Sidebar (if provided) */}
          {showSidebar && sidebarContent && (
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {sidebarContent}
              </div>
            </aside>
          )}
          
          {/* Main Content */}
          <div className={getContentAreaClasses()}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

// Specialized layout components for specific use cases
export const DonorDashboardLayout = ({ children, className = "" }) => (
  <DashboardLayoutContainer 
    userRole="donor" 
    className={className}
  >
    {children}
  </DashboardLayoutContainer>
);

export const RecipientDashboardLayout = ({ children, filters = null, className = "" }) => (
  <DashboardLayoutContainer 
    userRole="recipient" 
    showSidebar={!!filters}
    sidebarContent={filters}
    className={className}
  >
    {children}
  </DashboardLayoutContainer>
);

// Content sections for donor two-panel layout
export const DonorMainPanel = ({ children, className = "" }) => (
  <div className={`space-y-6 ${className}`}>
    {children}
  </div>
);

export const DonorSidePanel = ({ children, className = "" }) => (
  <div className={`xl:sticky xl:top-24 space-y-6 ${className}`}>
    {children}
  </div>
);

// Card grid for recipient browsing
export const RecipientCardGrid = ({ children, className = "" }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {children}
  </div>
);

// Mobile-optimized tabbed interface
export const MobileTabbedInterface = ({ tabs, activeTab, onTabChange, children, className = "" }) => (
  <div className={`md:hidden ${className}`}>
    {/* Tab Navigation */}
    <div className="flex border-b border-border mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 py-3 px-4 text-sm font-caption font-medium border-b-2 transition-smooth ${
            activeTab === tab?.id
              ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
          }`}
        >
          {tab?.label}
        </button>
      ))}
    </div>
    
    {/* Tab Content */}
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export default DashboardLayoutContainer;