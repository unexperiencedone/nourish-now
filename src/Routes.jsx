import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationWrapper from "./components/ui/AuthenticationWrapper";
import ModalOverlayManager from "./components/ui/ModalOverlayManager";
import NotFound from "pages/NotFound";
import DonorDashboard from './pages/donor-dashboard';
import LoginPage from './pages/login';
import DonationDetailsModal from './pages/donation-details-modal';
import RecipientDashboard from './pages/recipient-dashboard';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthenticationWrapper>
          <ModalOverlayManager>
            <ScrollToTop />
            <RouterRoutes>
              {/* Define your route here */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/donation-details-modal" element={<DonationDetailsModal />} />
              <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </ModalOverlayManager>
        </AuthenticationWrapper>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;