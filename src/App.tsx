import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import SiteNavbar from './components/SiteNavbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ChatWidget from './components/ChatWidget';
import DashboardLayout from './components/DashboardLayout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Docs = lazy(() => import('./pages/Docs'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

// Dashboard pages
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const Documents = lazy(() => import('./pages/dashboard/Documents'));
const Inbox = lazy(() => import('./pages/dashboard/Inbox'));
const WidgetConfig = lazy(() => import('./pages/dashboard/WidgetConfig'));
const Analytics = lazy(() => import('./pages/dashboard/Analytics'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/sign-in" replace />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <ConditionalNavigation />
          <main className="flex-1">
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout children={<Overview />} />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/documents" element={
                  <ProtectedRoute>
                    <DashboardLayout children={<Documents />} />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/inbox" element={
                  <ProtectedRoute>
                    <DashboardLayout children={<Inbox />} />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/widget" element={
                  <ProtectedRoute>
                    <DashboardLayout children={<WidgetConfig />} />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/analytics" element={
                  <ProtectedRoute>
                    <DashboardLayout children={<Analytics />} />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <ConditionalFooter />
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

function ConditionalNavigation() {
  const isDashboard = window.location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;
  return <SiteNavbar />;
}

function ConditionalFooter() {
  const isDashboard = window.location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;
  return <Footer />;
}



