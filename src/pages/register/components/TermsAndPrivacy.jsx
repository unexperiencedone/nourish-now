import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const TermsAndPrivacy = ({ 
  termsAccepted, 
  privacyAccepted, 
  onTermsChange, 
  onPrivacyChange, 
  errors 
}) => {
  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
      <h3 className="text-lg font-heading font-semibold text-foreground">
        Legal Agreements
      </h3>
      <div className="space-y-3">
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 underline font-medium"
                onClick={() => window.open('/terms-of-service', '_blank')}
              >
                Terms of Service
              </button>
            </span>
          }
          description="By checking this box, you agree to our terms and conditions for using NourishNow"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e?.target?.checked)}
          error={errors?.terms}
          required
        />
        
        <Checkbox
          label={
            <span className="text-sm">
              I acknowledge the{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 underline font-medium"
                onClick={() => window.open('/privacy-policy', '_blank')}
              >
                Privacy Policy
              </button>
            </span>
          }
          description="We respect your privacy and will protect your personal information"
          checked={privacyAccepted}
          onChange={(e) => onPrivacyChange(e?.target?.checked)}
          error={errors?.privacy}
          required
        />
      </div>
      <div className="text-xs text-muted-foreground bg-card p-3 rounded border border-border">
        <p className="mb-2 font-medium">Important Information:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Your account will be verified within 24 hours</li>
          <li>Food safety guidelines must be followed by all users</li>
          <li>Donations are subject to local health regulations</li>
          <li>Users must be 18+ years old to create an account</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;