import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './security/auth';

// Import real layouts
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';

// Basic Loading Fallback
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: '#0a0a0f' }}>
    <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #00f0ff', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  </div>
);

// Lazy loaded public pages
const Landing = lazy(() => import('./pages/public/Landing'));
const About = lazy(() => import('./pages/public/About'));
const Features = lazy(() => import('./pages/public/Features'));
const Docs = lazy(() => import('./pages/public/Docs'));
const Pricing = lazy(() => import('./pages/public/Pricing'));
const Contact = lazy(() => import('./pages/public/Contact'));
const FAQ = lazy(() => import('./pages/public/FAQ'));
const Privacy = lazy(() => import('./pages/public/Privacy'));
const Terms = lazy(() => import('./pages/public/Terms'));
const CookiesPolicy = lazy(() => import('./pages/public/CookiesPolicy'));
const Legal = lazy(() => import('./pages/public/Legal'));

// Lazy loaded auth pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Lazy loaded protected pages - all files are directly in pages/app/
const Dashboard = lazy(() => import('./pages/app/Dashboard'));
const ScanHistory = lazy(() => import('./pages/app/ScanHistory'));
const NewScan = lazy(() => import('./pages/app/NewScan'));
const ScanDetail = lazy(() => import('./pages/app/ScanDetail'));
const ScanLive = lazy(() => import('./pages/app/ScanLive'));
const OsintModule = lazy(() => import('./pages/app/OsintModule'));
const OsintResults = lazy(() => import('./pages/app/OsintResults'));
const Targets = lazy(() => import('./pages/app/Targets'));
const Vulnerabilities = lazy(() => import('./pages/app/Vulnerabilities'));
const VulnDetail = lazy(() => import('./pages/app/VulnDetail'));
const Reports = lazy(() => import('./pages/app/Reports'));
const ReportGenerate = lazy(() => import('./pages/app/ReportGenerate'));
const ReportDetail = lazy(() => import('./pages/app/ReportDetail'));
const Settings = lazy(() => import('./pages/app/Settings'));

const App = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
          <Route path="/docs" element={<PublicLayout><Docs /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
          <Route path="/cookies" element={<PublicLayout><CookiesPolicy /></PublicLayout>} />
          <Route path="/legal" element={<PublicLayout><Legal /></PublicLayout>} />

          {/* Auth Routes */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

          {/* Protected Routes */}
          <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/app/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/app/scans" element={<ProtectedRoute><AppLayout><ScanHistory /></AppLayout></ProtectedRoute>} />
          <Route path="/app/scans/new" element={<ProtectedRoute><AppLayout><NewScan /></AppLayout></ProtectedRoute>} />
          <Route path="/app/scans/:id" element={<ProtectedRoute><AppLayout><ScanDetail /></AppLayout></ProtectedRoute>} />
          <Route path="/app/scans/:id/live" element={<ProtectedRoute><AppLayout><ScanLive /></AppLayout></ProtectedRoute>} />
          <Route path="/app/osint" element={<ProtectedRoute><AppLayout><OsintModule /></AppLayout></ProtectedRoute>} />
          <Route path="/app/osint/:id" element={<ProtectedRoute><AppLayout><OsintResults /></AppLayout></ProtectedRoute>} />
          <Route path="/app/targets" element={<ProtectedRoute><AppLayout><Targets /></AppLayout></ProtectedRoute>} />
          <Route path="/app/vulnerabilities" element={<ProtectedRoute><AppLayout><Vulnerabilities /></AppLayout></ProtectedRoute>} />
          <Route path="/app/vulnerabilities/:id" element={<ProtectedRoute><AppLayout><VulnDetail /></AppLayout></ProtectedRoute>} />
          <Route path="/app/reports" element={<ProtectedRoute><AppLayout><Reports /></AppLayout></ProtectedRoute>} />
          <Route path="/app/reports/generate" element={<ProtectedRoute><AppLayout><ReportGenerate /></AppLayout></ProtectedRoute>} />
          <Route path="/app/reports/:id" element={<ProtectedRoute><AppLayout><ReportDetail /></AppLayout></ProtectedRoute>} />
          <Route path="/app/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
