import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isMapView, 
  onToggleView,
  className = "" 
}) => {
  const foodTypeOptions = [
    { value: 'all', label: 'All Food Types' },
    { value: 'prepared_meals', label: 'Prepared Meals' },
    { value: 'fresh_produce', label: 'Fresh Produce' },
    { value: 'baked_goods', label: 'Baked Goods' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'packaged_food', label: 'Packaged Food' },
    { value: 'beverages', label: 'Beverages' }
  ];

  const distanceOptions = [
    { value: 'all', label: 'Any Distance' },
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
    { value: '25', label: 'Within 25 km' },
    { value: '50', label: 'Within 50 km' }
  ];

  const timeOptions = [
    { value: 'all', label: 'Any Time' },
    { value: '2', label: 'Next 2 hours' },
    { value: '6', label: 'Next 6 hours' },
    { value: '24', label: 'Today' },
    { value: '72', label: 'Next 3 days' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== 'all' && value !== '' && value !== null
  );

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground">Filters</h3>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
          <Button
            variant={!isMapView ? "default" : "ghost"}
            size="xs"
            onClick={() => onToggleView(false)}
            iconName="List"
            iconSize={14}
            className="px-2 py-1"
          >
            List
          </Button>
          <Button
            variant={isMapView ? "default" : "ghost"}
            size="xs"
            onClick={() => onToggleView(true)}
            iconName="Map"
            iconSize={14}
            className="px-2 py-1"
          >
            Map
          </Button>
        </div>
      </div>
      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="Search donations..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Food Type Filter */}
      <div>
        <Select
          label="Food Type"
          options={foodTypeOptions}
          value={filters?.foodType || 'all'}
          onChange={(value) => handleFilterChange('foodType', value)}
          className="w-full"
        />
      </div>
      {/* Distance Filter */}
      <div>
        <Select
          label="Distance"
          options={distanceOptions}
          value={filters?.distance || 'all'}
          onChange={(value) => handleFilterChange('distance', value)}
          className="w-full"
        />
      </div>
      {/* Pickup Time Filter */}
      <div>
        <Select
          label="Pickup Time"
          options={timeOptions}
          value={filters?.pickupTime || 'all'}
          onChange={(value) => handleFilterChange('pickupTime', value)}
          className="w-full"
        />
      </div>
      {/* Quantity Range */}
      <div className="space-y-2">
        <label className="text-sm font-caption font-medium text-foreground">
          Minimum Servings
        </label>
        <Input
          type="number"
          placeholder="Min servings"
          value={filters?.minQuantity || ''}
          onChange={(e) => handleFilterChange('minQuantity', e?.target?.value)}
          min="1"
          className="w-full"
        />
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-border">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
            fullWidth
            className="justify-center text-muted-foreground hover:text-foreground"
          >
            Clear All Filters
          </Button>
        </div>
      )}
      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="text-xs text-muted-foreground font-caption text-center">
          {Object.values(filters)?.filter(value => value !== 'all' && value !== '' && value !== null)?.length} active filters
        </div>
      )}
    </div>
  );
};

export default FilterPanel;