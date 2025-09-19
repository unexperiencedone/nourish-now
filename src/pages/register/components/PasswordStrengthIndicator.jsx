import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    score = Object.values(checks)?.filter(Boolean)?.length;
    
    if (score < 2) return { score, label: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score < 4) return { score, label: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    if (score < 5) return { score, label: 'Good', color: 'text-success', bgColor: 'bg-success' };
    return { score, label: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const strength = getPasswordStrength(password);
  
  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              level <= strength?.score 
                ? strength?.bgColor 
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {/* Strength Label */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-caption font-medium ${strength?.color}`}>
          Password Strength: {strength?.label}
        </span>
        {strength?.score >= 4 && (
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
        )}
      </div>
      {/* Requirements Checklist */}
      {strength?.score < 5 && (
        <div className="text-xs text-muted-foreground space-y-1 mt-2">
          <p className="font-medium">Password should include:</p>
          <ul className="space-y-1 ml-2">
            <li className={`flex items-center space-x-2 ${
              password?.length >= 8 ? 'text-success' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={password?.length >= 8 ? "Check" : "X"} 
                size={12} 
                color={password?.length >= 8 ? "var(--color-success)" : "currentColor"}
              />
              <span>At least 8 characters</span>
            </li>
            <li className={`flex items-center space-x-2 ${
              /[a-z]/?.test(password) ? 'text-success' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={/[a-z]/?.test(password) ? "Check" : "X"} 
                size={12} 
                color={/[a-z]/?.test(password) ? "var(--color-success)" : "currentColor"}
              />
              <span>Lowercase letter</span>
            </li>
            <li className={`flex items-center space-x-2 ${
              /[A-Z]/?.test(password) ? 'text-success' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={/[A-Z]/?.test(password) ? "Check" : "X"} 
                size={12} 
                color={/[A-Z]/?.test(password) ? "var(--color-success)" : "currentColor"}
              />
              <span>Uppercase letter</span>
            </li>
            <li className={`flex items-center space-x-2 ${
              /\d/?.test(password) ? 'text-success' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={/\d/?.test(password) ? "Check" : "X"} 
                size={12} 
                color={/\d/?.test(password) ? "var(--color-success)" : "currentColor"}
              />
              <span>Number</span>
            </li>
            <li className={`flex items-center space-x-2 ${
              /[!@#$%^&*(),.?":{}|<>]/?.test(password) ? 'text-success' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={/[!@#$%^&*(),.?":{}|<>]/?.test(password) ? "Check" : "X"} 
                size={12} 
                color={/[!@#$%^&*(),.?":{}|<>]/?.test(password) ? "var(--color-success)" : "currentColor"}
              />
              <span>Special character</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;