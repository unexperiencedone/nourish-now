import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationWrapper';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'donor',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    donor: {
      email: "donor@nourishnow.com",
      password: "donor123",
      userData: {
        id: "donor_001",
        name: "Sarah Johnson",
        email: "donor@nourishnow.com",
        role: "donor",
        organization: "Green Valley Restaurant",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, Downtown, CA 90210"
      }
    },
    recipient: {
      email: "recipient@nourishnow.com",
      password: "recipient123",
      userData: {
        id: "recipient_001",
        name: "Michael Chen",
        email: "recipient@nourishnow.com",
        role: "recipient",
        organization: "Community Food Bank",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Avenue, Riverside, CA 90211"
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      role: e?.target?.value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCred = mockCredentials?.[formData?.role];
      
      if (formData?.email === mockCred?.email && formData?.password === mockCred?.password) {
        // Successful login
        login(mockCred?.userData);
      } else {
        // Invalid credentials
        setErrors({
          general: `Invalid credentials. Use ${mockCred?.email} / ${mockCred?.password} for ${formData?.role} login.`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error font-caption">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Role Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            I am a <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 p-4 border border-border rounded-md cursor-pointer transition-smooth hover:border-primary/50">
              <input
                type="radio"
                name="role"
                value="donor"
                checked={formData?.role === 'donor'}
                onChange={handleRoleChange}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={18} color="var(--color-secondary)" />
                <span className="text-sm font-caption text-foreground">Food Donor</span>
              </div>
            </label>
            
            <label className="flex items-center space-x-3 p-4 border border-border rounded-md cursor-pointer transition-smooth hover:border-primary/50">
              <input
                type="radio"
                name="role"
                value="recipient"
                checked={formData?.role === 'recipient'}
                onChange={handleRoleChange}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Search" size={18} color="var(--color-accent)" />
                <span className="text-sm font-caption text-foreground">Recipient</span>
              </div>
            </label>
          </div>
        </div>

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-smooth font-caption"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          iconSize={20}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Create Account Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground font-caption">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:text-primary/80 transition-smooth font-medium"
              disabled={isLoading}
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;