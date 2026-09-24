import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  MapPin, 
  Sun, 
  Moon, 
  Globe, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  ArrowRight,
  Pill,
  CheckCircle2
} from 'lucide-react';
import { useStore, AppView } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/i18n';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setView, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    cart, 
    wishlist, 
    user, 
    toggleCartDrawer, 
    setAuthModalOpen,
    pincode,
    setPincode,
    pincodeStatus
  } = useStore();

  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cart item count calculation
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Smart search filter (matches name, genericName/salt, brand, uses, category)
  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.genericName.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.uses.some((u) => u.toLowerCase().includes(query))
        );
      }).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setView('product', { productId: product.id });
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPincode(tempPincode);
    setIsPincodeModalOpen(false);
  };

  const navLinks: { label: string; view: AppView; highlight?: boolean }[] = [
    { label: t.navHome, view: 'home' },
    { label: t.navShop, view: 'shop' },
    { label: t.navPrescription, view: 'prescription', highlight: true },
    { label: t.navLabTests, view: 'lab-tests' },
    { label: t.navDoctor, view: 'doctor-consult' },
    { label: t.navHealthTools, view: 'health-tools' },
    { label: t.navOffers, view: 'offers' },
    { label: t.navBlog, view: 'blog' },
    { label: t.navAbout, view: 'about' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-[#FAF7F0]/95 dark:bg-[#0C1716]/95 backdrop-blur-md border-b border-[#E6DFD3] dark:border-[#23423F]">
      {/* Top Demo Store & Compliance Ribbon */}
      <div className="bg-[#0B5D57] text-[#DFF5EC] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="font-semibold text-white tracking-wide uppercase text-[11px] bg-white/15 px-2 py-0.5 rounded">
              Demo Pharmacy
            </span>
            <span className="hidden sm:inline text-white/90">{t.demoRibbon}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#DFF5EC]/90">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#34D399]" />
              <span className="font-medium text-white">{t.openStatus}</span>
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline font-mono">Lic: MH-PZ1-149204</span>
            <button 
              onClick={() => setView('admin')}
              className="text-[#FF7A59] hover:text-white font-semibold flex items-center gap-1 bg-black/20 hover:bg-black/40 px-2 py-0.5 rounded transition"
            >
              <span>{t.navAdmin}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-6">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('home')} 
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B5D57] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Pill className="w-5 h-5 text-[#DFF5EC]" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#0B5D57] dark:text-[#A8D5BA] leading-none block">
                Sanjivani
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#5C6E6B] dark:text-[#9BB3AF] block mt-0.5">
                Apothecary & Chemist • Pune
              </span>
            </div>
          </button>

          {/* Delivery Pincode Quick Selector */}
          <button
            onClick={() => setIsPincodeModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFE6] dark:bg-[#1A302E] border border-[#E6DFD3] dark:border-[#23423F] text-xs font-medium text-[#10201F] dark:text-[#F3F8F7] hover:border-[#0B5D57] transition"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>Pune {pincode}</span>
            <span className="text-[10px] text-[#0B5D57] dark:text-[#A8D5BA] font-semibold bg-[#DFF5EC] dark:bg-[#0B5D57]/40 px-1.5 py-0.5 rounded-full">
              90 Min Delivery
            </span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Smart Search Bar with Autocomplete */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#5C6E6B] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-[#FFFFFF] dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] text-[#10201F] dark:text-[#F3F8F7] placeholder-[#5C6E6B] focus:outline-none focus:ring-2 focus:ring-[#0B5D57] transition shadow-xs"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#132422] rounded-2xl shadow-xl border border-[#E6DFD3] dark:border-[#23423F] overflow-hidden z-50">
              <div className="p-2 border-b border-[#E6DFD3] dark:border-[#23423F] text-[11px] font-semibold uppercase tracking-wider text-[#5C6E6B] px-3">
                Matching Medicines & Active Salts
              </div>
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="w-full text-left p-3 hover:bg-[#F3EFE6] dark:hover:bg-[#1A302E] flex items-center justify-between gap-3 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#10201F] dark:text-white">
                          {product.name}
                        </span>
                        {product.schedule === 'Schedule H' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 font-bold">
                            Rx
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#5C6E6B] dark:text-stone-400 mt-0.5">
                        {product.genericName} • <span className="font-medium text-[#0B5D57] dark:text-[#A8D5BA]">{product.brand}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold tabular-nums text-sm text-[#0B5D57] dark:text-[#A8D5BA]">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-stone-400 line-through">
                        MRP ₹{product.mrp.toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Navigation & Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-[#F3EFE6] dark:hover:bg-[#1A302E] text-[#10201F] dark:text-[#F3F8F7] transition flex items-center gap-1 text-xs font-semibold">
              <Globe className="w-4 h-4 text-[#0B5D57] dark:text-[#A8D5BA]" />
              <span className="uppercase text-[11px]">{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-32 py-1 bg-white dark:bg-[#132422] rounded-xl shadow-lg border border-[#E6DFD3] dark:border-[#23423F] hidden group-hover:block z-50">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium ${language === 'en' ? 'text-[#0B5D57] font-bold bg-[#DFF5EC] dark:bg-[#0B5D57]/30' : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('hi')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium ${language === 'hi' ? 'text-[#0B5D57] font-bold bg-[#DFF5EC] dark:bg-[#0B5D57]/30' : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
              >
                हिंदी (Hindi)
              </button>
              <button 
                onClick={() => setLanguage('mr')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium ${language === 'mr' ? 'text-[#0B5D57] font-bold bg-[#DFF5EC] dark:bg-[#0B5D57]/30' : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
              >
                मराठी (Marathi)
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full hover:bg-[#F3EFE6] dark:hover:bg-[#1A302E] text-[#10201F] dark:text-[#F3F8F7] transition"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => {
              if (user) {
                setView('account');
              } else {
                setAuthModalOpen(true);
              }
            }}
            className="relative p-2 rounded-full hover:bg-[#F3EFE6] dark:hover:bg-[#1A302E] text-[#10201F] dark:text-[#F3F8F7] transition hidden sm:flex items-center"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7A59] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Customer Account Button */}
          <button
            onClick={() => {
              if (user) {
                setView('account');
              } else {
                setAuthModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#F3EFE6] dark:hover:bg-[#1A302E] text-xs font-semibold text-[#10201F] dark:text-[#F3F8F7] border border-[#E6DFD3] dark:border-[#23423F] transition"
          >
            <User className="w-4 h-4 text-[#0B5D57] dark:text-[#A8D5BA]" />
            <span className="hidden sm:inline">
              {user ? user.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => toggleCartDrawer(true)}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B5D57] hover:bg-[#073B37] text-white text-xs font-bold shadow-sm transition group"
          >
            <ShoppingBag className="w-4 h-4 text-[#DFF5EC] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartItems > 0 && (
              <span className="w-5 h-5 bg-[#FF7A59] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-lg text-[#10201F] dark:text-[#F3F8F7]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Secondary Category / Page Nav Bar (Desktop) */}
      <nav className="hidden md:block bg-white dark:bg-[#10201F] border-t border-[#E6DFD3] dark:border-[#23423F]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto py-2 scrollbar-none">
          <div className="flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => setView(link.view)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0B5D57] text-white'
                      : link.highlight
                      ? 'bg-[#DFF5EC] dark:bg-[#0B5D57]/40 text-[#0B5D57] dark:text-[#A8D5BA] hover:bg-[#A8D5BA]/40'
                      : 'text-[#10201F] dark:text-stone-300 hover:text-[#0B5D57] dark:hover:text-[#A8D5BA] hover:bg-[#F3EFE6] dark:hover:bg-[#1A302E]'
                  }`}
                >
                  {link.highlight && <FileText className="w-3.5 h-3.5" />}
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-[#5C6E6B] dark:text-[#9BB3AF]">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              PCI Verified Chemist
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#132422] border-b border-[#E6DFD3] dark:border-[#23423F] p-4 space-y-3">
          {/* Mobile search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#5C6E6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines or salt..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-[#F3EFE6] dark:bg-[#1A302E] border-none text-stone-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setView(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentView === link.view
                    ? 'bg-[#0B5D57] text-white'
                    : 'bg-[#FAF7F0] dark:bg-[#1A302E] text-[#10201F] dark:text-stone-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Pincode mobile info */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#5C6E6B] border-t border-stone-200 dark:border-stone-800">
            <span>Delivering to Pune: <strong className="text-[#0B5D57] dark:text-[#A8D5BA]">{pincode}</strong></span>
            <button 
              onClick={() => {
                setIsPincodeModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-[#FF7A59] font-bold"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Pincode Change Modal */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#E6DFD3] dark:border-[#23423F]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#0B5D57] dark:text-[#A8D5BA]">
                <MapPin className="w-5 h-5 text-[#FF7A59]" />
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">Delivery Pincode</h3>
              </div>
              <button 
                onClick={() => setIsPincodeModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-[#5C6E6B] dark:text-stone-400 mb-4 leading-relaxed">
              Enter your 6-digit postal code to check 90-minute express delivery availability in Pune.
            </p>

            <form onSubmit={handlePincodeSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 411005"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-[#0B5D57] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 text-[11px] text-[#5C6E6B] dark:text-stone-400">
                <div className="flex items-center gap-1 text-[#0B5D57] dark:text-[#A8D5BA]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Express 90-min delivery: 411001 to 411058</span>
                </div>
                <div>Standard same-day delivery: Rest of Pune District</div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm transition"
              >
                Confirm Pincode
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
