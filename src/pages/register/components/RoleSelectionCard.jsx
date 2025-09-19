import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RoleSelectionCard = ({ 
  role, 
  title, 
  description, 
  features, 
  icon, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div 
      className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary bg-primary/5 shadow-soft' 
          : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
      }`}
      onClick={() => onSelect(role)}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={icon} size={24} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {title}
            </h3>
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect(role)}
              className="pointer-events-none"
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 font-caption">
            {description}
          </p>
          
          <ul className="space-y-2">
            {features?.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-foreground">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionCard;