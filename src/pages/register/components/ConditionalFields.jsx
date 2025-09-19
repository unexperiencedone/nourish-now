import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConditionalFields = ({ role, formData, onChange, errors }) => {
  const businessTypeOptions = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'cafe', label: 'Cafe/Coffee Shop' },
    { value: 'grocery', label: 'Grocery Store' },
    { value: 'catering', label: 'Catering Service' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'food_truck', label: 'Food Truck' },
    { value: 'hotel', label: 'Hotel/Resort' },
    { value: 'other', label: 'Other Food Business' }
  ];

  const organizationTypeOptions = [
    { value: 'food_bank', label: 'Food Bank' },
    { value: 'shelter', label: 'Homeless Shelter' },
    { value: 'community_center', label: 'Community Center' },
    { value: 'charity', label: 'Charitable Organization' },
    { value: 'religious', label: 'Religious Organization' },
    { value: 'school', label: 'School/Educational Institution' },
    { value: 'senior_center', label: 'Senior Center' },
    { value: 'other', label: 'Other Non-Profit' }
  ];

  const operatingHoursOptions = [
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 10 PM)' },
    { value: 'late_night', label: 'Late Night (10 PM - 2 AM)' },
    { value: '24_hours', label: '24 Hours' }
  ];

  if (role === 'donor') {
    return (
      <div className="space-y-6">
        <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Donor Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Business Type"
              description="Select your business category"
              options={businessTypeOptions}
              value={formData?.businessType}
              onChange={(value) => onChange('businessType', value)}
              error={errors?.businessType}
              required
              placeholder="Choose business type"
            />
            
            <Select
              label="Operating Hours"
              description="When do you typically operate?"
              options={operatingHoursOptions}
              value={formData?.operatingHours}
              onChange={(value) => onChange('operatingHours', value)}
              error={errors?.operatingHours}
              required
              placeholder="Select operating hours"
            />
          </div>
          
          <div className="mt-4">
            <Input
              label="Business Address"
              type="text"
              placeholder="Enter your business address"
              description="This helps recipients locate your donations"
              value={formData?.businessAddress}
              onChange={(e) => onChange('businessAddress', e?.target?.value)}
              error={errors?.businessAddress}
              required
            />
          </div>
          
          <div className="mt-4">
            <Input
              label="Average Weekly Surplus"
              type="text"
              placeholder="e.g., 50 meals, 20 lbs of produce"
              description="Estimate your typical food surplus per week"
              value={formData?.averageSurplus}
              onChange={(e) => onChange('averageSurplus', e?.target?.value)}
              error={errors?.averageSurplus}
            />
          </div>
        </div>
      </div>
    );
  }

  if (role === 'recipient') {
    return (
      <div className="space-y-6">
        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Recipient Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Organization Type"
              description="Select your organization category"
              options={organizationTypeOptions}
              value={formData?.organizationType}
              onChange={(value) => onChange('organizationType', value)}
              error={errors?.organizationType}
              required
              placeholder="Choose organization type"
            />
            
            <Input
              label="Serving Capacity"
              type="number"
              placeholder="e.g., 100"
              description="How many people do you typically serve?"
              value={formData?.servingCapacity}
              onChange={(e) => onChange('servingCapacity', e?.target?.value)}
              error={errors?.servingCapacity}
              required
            />
          </div>
          
          <div className="mt-4">
            <Input
              label="Service Area"
              type="text"
              placeholder="e.g., Downtown, North Side, City-wide"
              description="Geographic area you serve"
              value={formData?.serviceArea}
              onChange={(e) => onChange('serviceArea', e?.target?.value)}
              error={errors?.serviceArea}
              required
            />
          </div>
          
          <div className="mt-4">
            <Input
              label="Transportation Method"
              type="text"
              placeholder="e.g., Van, Pickup truck, Walking"
              description="How do you typically collect donations?"
              value={formData?.transportationMethod}
              onChange={(e) => onChange('transportationMethod', e?.target?.value)}
              error={errors?.transportationMethod}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ConditionalFields;