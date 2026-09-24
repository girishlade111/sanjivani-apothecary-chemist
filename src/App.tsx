import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { CompareModal } from './components/product/CompareModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { PrescriptionUploadView } from './views/PrescriptionUploadView';
import { CheckoutView } from './views/CheckoutView';
import { CheckoutSuccessView } from './views/CheckoutSuccessView';
import { AccountView } from './views/AccountView';
import { HealthToolsView } from './views/HealthToolsView';
import { LabTestsView } from './views/LabTestsView';
import { DoctorConsultView } from './views/DoctorConsultView';
import { BlogView } from './views/BlogView';
import { AboutView } from './views/AboutView';
import { AdminView } from './views/AdminView';
import { WhatsAppView } from './views/WhatsAppView';

export default function App() {
  const { currentView, theme } = useStore();

  // Handle dark mode html class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] dark:bg-[#0C1716] text-[#10201F] dark:text-stone-100 font-sans transition-colors selection:bg-[#A8D5BA] selection:text-[#0B5D57]">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'prescription' && <PrescriptionUploadView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'checkout-success' && <CheckoutSuccessView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'health-tools' && <HealthToolsView />}
        {currentView === 'lab-tests' && <LabTestsView />}
        {currentView === 'doctor-consult' && <DoctorConsultView />}
        {currentView === 'blog' && <BlogView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'admin' && <AdminView />}
        {currentView === 'whatsapp' && <WhatsAppView />}
      </main>

      {/* Global Regulatory & Statutory Footer */}
      <Footer />

      {/* Global Floating Components & Modals */}
      <CartDrawer />
      <AuthModal />
      <QuickViewModal />
      <CompareModal />
      <ToastContainer />
    </div>
  );
}
