import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import RoleSelectionCard from './components/RoleSelectionCard';
import ConditionalFields from './components/ConditionalFields';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import TermsAndPrivacy from './components/TermsAndPrivacy';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    organizationName: '',
    role: '',
    // Donor specific fields
    businessType: '',
    operatingHours: '',
    businessAddress: '',
    averageSurplus: '',
    // Recipient specific fields
    organizationType: '',
    servingCapacity: '',
    serviceArea: '',
    transportationMethod: '',
    // Legal agreements
    termsAccepted: false,
    privacyAccepted: false
  });
  
  const [errors, setErrors] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    donor: {
      email: "donor@nourishnow.com",
      password: "Donor123!",
      fullName: "Green Valley Restaurant",
      organizationName: "Green Valley Restaurant",
      phoneNumber: "+1 (555) 123-4567"
    },
    recipient: {
      email: "recipient@nourishnow.com", 
      password: "Recipient123!",
      fullName: "Community Food Bank",
      organizationName: "Downtown Community Food Bank",
      phoneNumber: "+1 (555) 987-6543"
    }
  };

  const roleOptions = [
    {
      role: 'donor',
      title: 'Food Donor',
      description: 'I have surplus food to donate and want to help reduce waste while supporting my community.',
      features: [
        'Create and manage donation listings',
        'Set pickup times and locations',
        'Track donation history and impact',
        'Connect with local recipients'
      ],
      icon: 'Package'
    },
    {
      role: 'recipient',
      title: 'Food Recipient',
      description: 'I represent an organization that can use donated food to serve people in need.',
      features: [
        'Browse available food donations',
        'Claim donations for pickup',
        'View donation locations on map',
        'Manage pickup schedules'
      ],
      icon: 'Heart'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!formData?.organizationName?.trim()) newErrors.organizationName = 'Organization name is required';
    }
    
    if (step === 2) {
      if (!formData?.role) newErrors.role = 'Please select your role';
      
      if (formData?.role === 'donor') {
        if (!formData?.businessType) newErrors.businessType = 'Business type is required';
        if (!formData?.operatingHours) newErrors.operatingHours = 'Operating hours are required';
        if (!formData?.businessAddress?.trim()) newErrors.businessAddress = 'Business address is required';
      }
      
      if (formData?.role === 'recipient') {
        if (!formData?.organizationType) newErrors.organizationType = 'Organization type is required';
        if (!formData?.servingCapacity) newErrors.servingCapacity = 'Serving capacity is required';
        if (!formData?.serviceArea?.trim()) newErrors.serviceArea = 'Service area is required';
      }
    }
    
    if (step === 3) {
      if (!formData?.termsAccepted) newErrors.terms = 'You must accept the Terms of Service';
      if (!formData?.privacyAccepted) newErrors.privacy = 'You must acknowledge the Privacy Policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(3)) return;
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object for authentication
      const userData = {
        id: Date.now()?.toString(),
        fullName: formData?.fullName,
        email: formData?.email,
        phoneNumber: formData?.phoneNumber,
        organizationName: formData?.organizationName,
        role: formData?.role,
        createdAt: new Date()?.toISOString(),
        isVerified: true,
        // Include role-specific data
        ...(formData?.role === 'donor' && {
          businessType: formData?.businessType,
          operatingHours: formData?.operatingHours,
          businessAddress: formData?.businessAddress,
          averageSurplus: formData?.averageSurplus
        }),
        ...(formData?.role === 'recipient' && {
          organizationType: formData?.organizationType,
          servingCapacity: formData?.servingCapacity,
          serviceArea: formData?.serviceArea,
          transportationMethod: formData?.transportationMethod
        })
      };
      
      // Register user through auth context
      register(userData);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const fillMockData = (role) => {
    const mockData = mockCredentials?.[role];
    setFormData(prev => ({
      ...prev,
      ...mockData,
      confirmPassword: mockData?.password,
      role: role,
      // Add role-specific mock data
      ...(role === 'donor' && {
        businessType: 'restaurant',
        operatingHours: 'evening',
        businessAddress: '123 Main Street, Downtown, NY 10001',
        averageSurplus: '30-40 meals per day'
      }),
      ...(role === 'recipient' && {
        organizationType: 'food_bank',
        servingCapacity: '150',
        serviceArea: 'Downtown and surrounding neighborhoods',
        transportationMethod: 'Van with refrigeration unit'
      }),
      termsAccepted: true,
      privacyAccepted: true
    }));
    setCurrentStep(3); // Skip to final step for demo
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3]?.map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            step === currentStep 
              ? 'bg-primary text-white' 
              : step < currentStep 
                ? 'bg-success text-white' :'bg-muted text-muted-foreground'
          }`}>
            {step < currentStep ? (
              <Icon name="Check" size={16} />
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-success' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Basic Information
        </h2>
        <p className="text-muted-foreground font-caption">
          Let's start with your basic details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          description="Your name or organization contact person"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          description="We'll use this for account verification"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <PasswordStrengthIndicator password={formData?.password} />
        </div>
        
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          description="For coordination and verification"
          value={formData?.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
          error={errors?.phoneNumber}
          required
        />
        
        <Input
          label="Organization Name"
          type="text"
          placeholder="Enter organization name"
          description="Business or organization you represent"
          value={formData?.organizationName}
          onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
          error={errors?.organizationName}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Choose Your Role
        </h2>
        <p className="text-muted-foreground font-caption">
          Select how you'll participate in the NourishNow community
        </p>
      </div>

      {/* Mock Data Buttons */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border mb-6">
        <p className="text-sm font-caption text-muted-foreground mb-3">
          Quick Demo Setup (Use mock credentials):
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillMockData('donor')}
            iconName="Package"
            iconPosition="left"
          >
            Fill Donor Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillMockData('recipient')}
            iconName="Heart"
            iconPosition="left"
          >
            Fill Recipient Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roleOptions?.map((option) => (
          <RoleSelectionCard
            key={option?.role}
            {...option}
            isSelected={formData?.role === option?.role}
            onSelect={(role) => handleInputChange('role', role)}
          />
        ))}
      </div>

      {errors?.role && (
        <p className="text-error text-sm font-caption text-center">
          {errors?.role}
        </p>
      )}

      {formData?.role && (
        <ConditionalFields
          role={formData?.role}
          formData={formData}
          onChange={handleInputChange}
          errors={errors}
        />
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Final Step
        </h2>
        <p className="text-muted-foreground font-caption">
          Review and accept our terms to complete registration
        </p>
      </div>

      {/* Account Summary */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Account Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>
            <span className="ml-2 font-medium">{formData?.fullName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <span className="ml-2 font-medium">{formData?.email}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Organization:</span>
            <span className="ml-2 font-medium">{formData?.organizationName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Role:</span>
            <span className={`ml-2 font-medium capitalize ${
              formData?.role === 'donor' ? 'text-secondary' : 'text-accent'
            }`}>
              {formData?.role === 'donor' ? 'Food Donor' : 'Food Recipient'}
            </span>
          </div>
        </div>
      </div>

      <TermsAndPrivacy
        termsAccepted={formData?.termsAccepted}
        privacyAccepted={formData?.privacyAccepted}
        onTermsChange={(checked) => handleInputChange('termsAccepted', checked)}
        onPrivacyChange={(checked) => handleInputChange('privacyAccepted', checked)}
        errors={errors}
      />

      {errors?.submit && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <p className="text-error text-sm font-caption">{errors?.submit}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={() => {}} />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="UserPlus" size={24} color="white" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Join NourishNow
              </h1>
            </div>
            <p className="text-lg text-muted-foreground font-caption max-w-2xl mx-auto">
              Create your account to start connecting surplus food with those who need it most
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg shadow-soft p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!formData?.termsAccepted || !formData?.privacyAccepted}
                    iconName="UserPlus"
                    iconPosition="left"
                    className="px-8"
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground font-caption">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary hover:text-primary/80 font-medium underline transition-smooth"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;