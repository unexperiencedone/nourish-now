import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TestCredentialsCard from './components/TestCredentialsCard';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - NourishNow | Food Donation Management</title>
        <meta name="description" content="Sign in to NourishNow to connect food donors with recipients and reduce food waste in your community." />
        <meta name="keywords" content="food donation, login, food waste reduction, community sharing" />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <LoginHeader />

          {/* Main Login Form */}
          <div className="bg-card border border-border rounded-lg shadow-soft p-6 mb-6">
            <LoginForm />
          </div>

          {/* Test Credentials Card */}
          <TestCredentialsCard />

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground font-caption">
              © {new Date()?.getFullYear()} NourishNow. Connecting communities through food sharing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;