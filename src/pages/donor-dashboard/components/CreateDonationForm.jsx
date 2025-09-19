import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateDonationForm = ({ onDonationCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    quantityUnit: 'items',
    pickupDeadline: '',
    pickupTime: '',
    location: {
      address: '',
      lat: null,
      lng: null
    },
    contactPhone: '',
    specialInstructions: ''
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const quantityUnitOptions = [
    { value: 'items', label: 'Items' },
    { value: 'servings', label: 'Servings' },
    { value: 'lbs', label: 'Pounds (lbs)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'boxes', label: 'Boxes' },
    { value: 'bags', label: 'Bags' },
    { value: 'trays', label: 'Trays' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFormData(prev => ({
      ...prev,
      location: {
        address: location?.address,
        lat: location?.lat,
        lng: location?.lng
      }
    }));
    
    if (errors?.location) {
      setErrors(prev => ({
        ...prev,
        location: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.quantity?.trim()) {
      newErrors.quantity = 'Quantity is required';
    }

    if (!formData?.pickupDeadline) {
      newErrors.pickupDeadline = 'Pickup deadline is required';
    } else {
      const deadlineDate = new Date(`${formData.pickupDeadline}T${formData.pickupTime || '23:59'}`);
      if (deadlineDate <= new Date()) {
        newErrors.pickupDeadline = 'Pickup deadline must be in the future';
      }
    }

    if (!formData?.location?.address) {
      newErrors.location = 'Pickup location is required';
    }

    if (!formData?.contactPhone?.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to Firestore
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newDonation = {
        id: `donation_${Date.now()}`,
        ...formData,
        quantity: `${formData?.quantity} ${formData?.quantityUnit}`,
        pickupDeadline: new Date(`${formData.pickupDeadline}T${formData.pickupTime || '23:59'}`),
        status: 'available',
        createdAt: new Date(),
        donorName: 'Current User', // This would come from auth context
        claimedBy: null
      };

      // Call parent callback
      if (onDonationCreated) {
        onDonationCreated(newDonation);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        quantity: '',
        quantityUnit: 'items',
        pickupDeadline: '',
        pickupTime: '',
        location: {
          address: '',
          lat: null,
          lng: null
        },
        contactPhone: '',
        specialInstructions: ''
      });
      setSelectedLocation(null);

    } catch (error) {
      console.error('Error creating donation:', error);
      setErrors({ submit: 'Failed to create donation. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock location suggestions
  const locationSuggestions = [
    {
      address: "123 Main Street, Downtown",
      lat: 40.7128,
      lng: -74.0060
    },
    {
      address: "456 Oak Avenue, Midtown",
      lat: 40.7589,
      lng: -73.9851
    },
    {
      address: "789 Pine Street, Uptown",
      lat: 40.7831,
      lng: -73.9712
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-bold text-foreground flex items-center space-x-2">
          <Icon name="Plus" size={24} color="var(--color-primary)" />
          <span>Create New Donation</span>
        </h2>
        <p className="text-sm text-muted-foreground font-caption mt-1">
          Share your surplus food with those in need
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <Input
          label="Donation Title"
          type="text"
          placeholder="e.g., Fresh Bakery Items, Restaurant Surplus"
          value={formData?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
        />

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Description <span className="text-error">*</span>
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={4}
            placeholder="Describe the food items, their condition, and any special handling requirements..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
          {errors?.description && (
            <p className="text-sm text-error font-caption">{errors?.description}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Quantity"
            type="number"
            placeholder="e.g., 25, 50, 100"
            value={formData?.quantity}
            onChange={(e) => handleInputChange('quantity', e?.target?.value)}
            error={errors?.quantity}
            required
            min="1"
          />
          
          <Select
            label="Unit"
            options={quantityUnitOptions}
            value={formData?.quantityUnit}
            onChange={(value) => handleInputChange('quantityUnit', value)}
          />
        </div>

        {/* Pickup Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Pickup Deadline Date"
            type="date"
            value={formData?.pickupDeadline}
            onChange={(e) => handleInputChange('pickupDeadline', e?.target?.value)}
            error={errors?.pickupDeadline}
            required
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
          
          <Input
            label="Pickup Time (Optional)"
            type="time"
            value={formData?.pickupTime}
            onChange={(e) => handleInputChange('pickupTime', e?.target?.value)}
            description="Leave empty for end of day"
          />
        </div>

        {/* Location Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Pickup Location <span className="text-error">*</span>
          </label>
          
          {/* Quick Location Suggestions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-caption">Quick select:</p>
            <div className="flex flex-wrap gap-2">
              {locationSuggestions?.map((location, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleLocationSelect(location)}
                  className={selectedLocation?.address === location?.address ? 'border-primary bg-primary/5' : ''}
                >
                  {location?.address}
                </Button>
              ))}
            </div>
          </div>

          {/* Google Maps Integration */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="h-64 bg-muted flex items-center justify-center">
              {selectedLocation ? (
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Selected Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${selectedLocation?.lat},${selectedLocation?.lng}&z=15&output=embed`}
                />
              ) : (
                <div className="text-center">
                  <Icon name="MapPin" size={48} color="var(--color-muted-foreground)" />
                  <p className="text-muted-foreground font-caption mt-2">
                    Select a location above to view map
                  </p>
                </div>
              )}
            </div>
          </div>

          {selectedLocation && (
            <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm text-success font-caption">
                Location selected: {selectedLocation?.address}
              </span>
            </div>
          )}

          {errors?.location && (
            <p className="text-sm text-error font-caption">{errors?.location}</p>
          )}
        </div>

        {/* Contact Information */}
        <Input
          label="Contact Phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData?.contactPhone}
          onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
          error={errors?.contactPhone}
          required
          description="Recipients will use this to coordinate pickup"
        />

        {/* Special Instructions */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Special Instructions (Optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            placeholder="Any special pickup instructions, parking information, or handling requirements..."
            value={formData?.specialInstructions}
            onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error font-caption">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                quantity: '',
                quantityUnit: 'items',
                pickupDeadline: '',
                pickupTime: '',
                location: { address: '', lat: null, lng: null },
                contactPhone: '',
                specialInstructions: ''
              });
              setSelectedLocation(null);
              setErrors({});
            }}
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
          
          <Button
            type="submit"
            loading={isSubmitting}
            iconName="Plus"
            iconPosition="left"
            iconSize={18}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Donation...' : 'Post Donation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationForm;