import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TestCredentialsCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Food Donor',
      email: 'donor@nourishnow.com',
      password: 'donor123',
      icon: 'Package',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/5',
      description: 'Access donor dashboard to create and manage food donation listings'
    },
    {
      role: 'Recipient',
      email: 'recipient@nourishnow.com',
      password: 'recipient123',
      icon: 'Search',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/5',
      description: 'Browse and claim available food donations in your area'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // Could add a toast notification here
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-muted/30 border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between text-left transition-smooth hover:bg-muted/50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
              <Icon name="Key" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Test Credentials</p>
              <p className="text-xs text-muted-foreground font-caption">Demo login information</p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            color="var(--color-muted-foreground)" 
          />
        </button>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="border-t border-border">
            <div className="p-4 space-y-4">
              {credentials?.map((cred, index) => (
                <div key={index} className={`p-3 ${cred?.bgColor} rounded-md`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={cred?.icon} size={16} color={cred?.color} />
                      <span className="text-sm font-medium text-foreground">{cred?.role}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground font-caption mb-3">
                    {cred?.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">Email:</span>
                      <div className="flex items-center space-x-1">
                        <code className="text-xs bg-background px-2 py-1 rounded font-mono">
                          {cred?.email}
                        </code>
                        <button
                          onClick={() => copyToClipboard(cred?.email)}
                          className="p-1 hover:bg-background/50 rounded transition-smooth"
                        >
                          <Icon name="Copy" size={12} color="var(--color-muted-foreground)" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">Password:</span>
                      <div className="flex items-center space-x-1">
                        <code className="text-xs bg-background px-2 py-1 rounded font-mono">
                          {cred?.password}
                        </code>
                        <button
                          onClick={() => copyToClipboard(cred?.password)}
                          className="p-1 hover:bg-background/50 rounded transition-smooth"
                        >
                          <Icon name="Copy" size={12} color="var(--color-muted-foreground)" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground font-caption text-center">
                  Use these credentials to test different user roles and functionalities
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCredentialsCard;