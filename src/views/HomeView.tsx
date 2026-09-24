import React from 'react';
import { 
  ArrowRight, 
  UploadCloud, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Sparkles, 
  Pill, 
  Activity, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  FileText, 
  ChevronRight,
  Star,
  MapPin,
  PhoneCall,
  Percent,
  Stethoscope
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { TRANSLATIONS } from '../data/i18n';
import { CATEGORIES, HEALTH_CONCERNS } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { BLOGS } from '../data/blogs';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/product/ProductCard';
import { ProductArt } from '../components/common/ProductArt';

export const HomeView: React.FC = () => {
  const { setView, language, setQuickViewProduct } = useStore();
  const t = TRANSLATIONS[language];

  const featuredProducts = PRODUCTS.slice(0, 8);
  const chronicCareProducts = PRODUCTS.filter((p) => p.category === 'Cardiac & Blood Pressure' || p.category === 'Diabetes Care').slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DFF5EC]/50 via-[#FAF7F0] to-[#FAF7F0] dark:from-[#0B5D57]/20 dark:via-[#0C1716] dark:to-[#0C1716] pt-10 pb-16 border-b border-[#E6DFD3] dark:border-[#23423F]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#132422] border border-[#A8D5BA] dark:border-[#0B5D57] shadow-xs text-xs font-semibold text-[#0B5D57] dark:text-[#A8D5BA]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#10201F] dark:text-white leading-[1.12]">
              {t.heroTitlePrefix}{' '}
              <span className="text-[#0B5D57] dark:text-[#A8D5BA] italic font-normal">
                {t.heroTitleEmphasis}
              </span>{' '}
              <br />
              {t.heroTitleSuffix}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#5C6E6B] dark:text-stone-300 max-w-xl leading-relaxed">
              {t.heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setView('prescription')}
                className="px-6 py-3.5 rounded-2xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 group"
              >
                <UploadCloud className="w-4 h-4 text-[#DFF5EC] group-hover:scale-110 transition-transform" />
                <span>{t.ctaUploadRx}</span>
                <ArrowRight className="w-4 h-4 text-[#A8D5BA]" />
              </button>

              <button
                onClick={() => setView('shop')}
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-[#1A302E] hover:bg-[#F3EFE6] dark:hover:bg-[#23423F] text-[#10201F] dark:text-white font-bold text-sm border border-[#E6DFD3] dark:border-[#23423F] transition shadow-xs"
              >
                {t.ctaOrderNow}
              </button>

              <button
                onClick={() => setView('whatsapp')}
                className="px-5 py-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-bold text-sm border border-[#25D366]/30 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            {/* Mini Trust Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E6DFD3] dark:border-[#23423F] text-xs">
              <div>
                <strong className="block font-serif text-lg font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
                  90 Mins
                </strong>
                <span className="text-stone-500 text-[11px]">Express Pune Delivery</span>
              </div>
              <div>
                <strong className="block font-serif text-lg font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
                  100%
                </strong>
                <span className="text-stone-500 text-[11px]">Authentic & Sourced</span>
              </div>
              <div>
                <strong className="block font-serif text-lg font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
                  24x7
                </strong>
                <span className="text-stone-500 text-[11px]">Pharmacist Consultation</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual Card / Prescription Fast Track */}
          <div className="lg:col-span-5 relative">
            {/* Apothecary Medicine Card */}
            <div className="relative rounded-3xl bg-white dark:bg-[#132422] p-6 shadow-2xl border border-[#E6DFD3] dark:border-[#23423F] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0B5D57] flex items-center justify-center text-white">
                    <FileText className="w-5 h-5 text-[#DFF5EC]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">Quick Rx Fast Track</h3>
                    <p className="text-[11px] text-[#5C6E6B]">Pharmacist verifies in 10 minutes</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#DFF5EC] text-[#0B5D57]">
                  Step 1 of 2
                </span>
              </div>

              {/* Upload Drop Zone Demo */}
              <div 
                onClick={() => setView('prescription')}
                className="cursor-pointer p-6 rounded-2xl border-2 border-dashed border-[#A8D5BA] dark:border-[#0B5D57] bg-[#FAF7F0] dark:bg-[#0C1716] hover:bg-[#DFF5EC]/30 transition text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B5D57]/10 flex items-center justify-center mx-auto text-[#0B5D57] dark:text-[#A8D5BA] group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                  Click to Upload Doctor Prescription
                </h4>
                <p className="text-xs text-stone-500">
                  Accepts Camera Snap, PDF, JPG, or WhatsApp slip
                </p>
              </div>

              {/* Verified Checklist */}
              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Licensed Pharmacist checks interactions & dosage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Cost-saving generic salt recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Doorstep delivery with sealed tamper-proof bag</span>
                </div>
              </div>

              <button
                onClick={() => setView('prescription')}
                className="w-full py-3 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition"
              >
                <span>Upload & Request Pharmacist Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Statutory License Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] dark:bg-[#0B5D57]/30 flex items-center justify-center text-[#0B5D57] dark:text-[#A8D5BA] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white">{t.trustLicense}</h4>
              <p className="text-xs text-stone-500">{t.trustLicenseSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] dark:bg-[#0B5D57]/30 flex items-center justify-center text-[#0B5D57] dark:text-[#A8D5BA] shrink-0">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white">{t.trustGenuine}</h4>
              <p className="text-xs text-stone-500">{t.trustGenuineSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] dark:bg-[#0B5D57]/30 flex items-center justify-center text-[#0B5D57] dark:text-[#A8D5BA] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white">{t.trustDelivery}</h4>
              <p className="text-xs text-stone-500">{t.trustDeliverySub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] dark:bg-[#0B5D57]/30 flex items-center justify-center text-[#0B5D57] dark:text-[#A8D5BA] shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white">{t.trustSupport}</h4>
              <p className="text-xs text-stone-500">{t.trustSupportSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
              Apothecary Curations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {t.shopByCategory}
            </h2>
          </div>
          <button
            onClick={() => setView('shop')}
            className="text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] hover:underline flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 14).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setView('shop', { category: cat.name })}
              className="p-4 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] hover:border-[#0B5D57] dark:hover:border-[#A8D5BA] hover:shadow-md transition text-center group flex flex-col items-center justify-between"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                {cat.icon === 'Heart' && '🫀'}
                {cat.icon === 'Activity' && '🩸'}
                {cat.icon === 'Sparkles' && '🌿'}
                {cat.icon === 'ShieldCheck' && '🛡️'}
                {cat.icon === 'Flame' && '🩹'}
                {cat.icon === 'Pill' && '💊'}
                {cat.icon === 'Droplets' && '🧴'}
                {cat.icon === 'Smile' && '👶'}
                {cat.icon === 'Eye' && '👁️'}
                {cat.icon === 'Coffee' && '🫁'}
                {cat.icon === 'Users' && '🩺'}
                {cat.icon === 'Wind' && '🌿'}
                {cat.icon === 'Feather' && '🧪'}
                {cat.icon === 'Moon' && '🧬'}
              </div>

              <h4 className="font-bold text-xs text-stone-900 dark:text-white line-clamp-2 leading-tight">
                {cat.name}
              </h4>
              <span className="text-[10px] text-stone-400 mt-1">
                {cat.productCount} items
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A59]">
              Verified & Fast Moving
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {t.featuredProducts}
            </h2>
          </div>
          <button
            onClick={() => setView('shop')}
            className="text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] hover:underline flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setQuickViewProduct} 
            />
          ))}
        </div>
      </section>

      {/* Generic Salt Substitutes Callout Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-[#0B5D57] to-[#073B37] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#DFF5EC]">
                <Percent className="w-3.5 h-3.5" />
                <span>Save 40% to 65% on Chronic Prescriptions</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Bioequivalent Generic Salts: Same Therapeutic Efficacy, Half the Cost.
              </h3>
              <p className="text-xs sm:text-sm text-[#DFF5EC]/90 leading-relaxed max-w-xl">
                Under CDSCO guidelines, WHO-GMP certified generic medicines contain the identical active pharmaceutical ingredient (API) as innovator brands. Ask our pharmacist during checkout to suggest certified substitutes for your blood pressure or diabetic refills.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setView('prescription')}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#0B5D57] font-bold text-xs shadow-sm hover:bg-[#FAF7F0] transition"
                >
                  Upload Slip & Request Cost Comparison
                </button>
                <button
                  onClick={() => setView('shop', { category: 'Cardiac & Blood Pressure' })}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
                >
                  Browse Chronic Care
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 rounded-2xl p-6 border border-white/15 backdrop-blur-xs space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#A8D5BA]">
                Live Substitution Example (Pune Dispensary)
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                  <div>
                    <span className="font-bold block">Telma 40 (Glenmark)</span>
                    <span className="text-[11px] text-stone-300">Telmisartan 40mg (15 Tabs)</span>
                  </div>
                  <span className="font-bold text-base">₹222.00</span>
                </div>
                <div className="flex items-center justify-center text-[#A8D5BA] font-bold text-xs gap-1">
                  <span>↓ Bioequivalent Certified Substitute ↓</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40">
                  <div>
                    <span className="font-bold block text-emerald-300">Telmikind 40 (Mankind)</span>
                    <span className="text-[11px] text-stone-200">Same Telmisartan 40mg (15 Tabs)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-base text-emerald-300">₹88.00</span>
                    <span className="block text-[10px] text-emerald-200 font-bold">You Save 60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Health Concern */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
            Symptom & Condition Guides
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
            {t.shopByConcern}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {HEALTH_CONCERNS.map((concern) => (
            <div
              key={concern.id}
              onClick={() => setView('shop', { concern: concern.name })}
              className="p-5 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] hover:border-[#0B5D57] dark:hover:border-[#A8D5BA] cursor-pointer hover:shadow-md transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{concern.icon}</span>
                <span className="text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                {concern.name}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2">
                {concern.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Services Trio: Rx Upload + Diagnostic Tests + Doctor Consultation */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
            Comprehensive Patient Ecosystem
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
            More than just a Chemist Store
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Prescription Upload */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                Prescription Refill Service
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Snap and upload any handwritten doctor slip. Our licensed dispensary team reads the dosage, calls you for confirmation, and delivers within 90 minutes.
              </p>
            </div>
            <button
              onClick={() => setView('prescription')}
              className="w-full py-2.5 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs transition"
            >
              Upload Prescription Now
            </button>
          </div>

          {/* Card 2: Diagnostic Lab Tests */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                Home Lab Sample Collection
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                NABL certified diagnostic checkups with doorstep sample collection in Pune. Fast digital reports delivered to your email and WhatsApp in 12–24 hours.
              </p>
            </div>
            <button
              onClick={() => setView('lab-tests')}
              className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#0B5D57] hover:text-white text-stone-900 dark:text-white font-bold text-xs transition"
            >
              Explore Lab Packages
            </button>
          </div>

          {/* Card 3: Doctor Consultation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                Consult Pune Specialists
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Connect with leading diabetologists, physicians, pediatricians, and Ayurvedic Vaidyas for audio/video consultation and digital valid prescriptions.
              </p>
            </div>
            <button
              onClick={() => setView('doctor-consult')}
              className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#0B5D57] hover:text-white text-stone-900 dark:text-white font-bold text-xs transition"
            >
              Book Doctor Slot
            </button>
          </div>
        </div>
      </section>

      {/* Customer & Physician Reviews */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
            Pune’s Trusted Neighborhood Word
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
            Doctors & Patients on Sanjivani
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-stone-900 dark:text-white">{rev.reviewer}</h5>
                  <span className="text-[11px] text-[#5C6E6B]">{rev.role}</span>
                </div>
                {rev.verified && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Blog Snippets */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
              Clinical Insights
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              From Our Pharmacist’s Desk
            </h2>
          </div>
          <button
            onClick={() => setView('blog')}
            className="text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] hover:underline flex items-center gap-1"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOGS.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              onClick={() => setView('blog', { blogId: blog.id })}
              className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] hover:border-[#0B5D57] cursor-pointer hover:shadow-md transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-[#5C6E6B]">
                <span className="font-semibold text-[#0B5D57] dark:text-[#A8D5BA]">{blog.category}</span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                {blog.summary}
              </p>
              <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                {blog.author} • {blog.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physical Dispensary / Store Locator Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-[#FAF7F0] dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFF5EC] text-[#0B5D57] text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#FF7A59]" />
              <span>Visit our Physical Dispensary in Pune</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Heritage Apothecary on Fergusson College Road
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Step inside for personalized medicine counselling, free digital blood pressure checkups, insulin cooling kit replenishment, or store pickup.
            </p>
            <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0B5D57] dark:text-[#A8D5BA]" />
                <span>Open 24 Hours, 365 Days • Pharmacist Always Present</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0B5D57] dark:text-[#A8D5BA]" />
                <span>Heritage Arcade, FC Road, Shivajinagar, Pune 411005</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#0B5D57] dark:text-[#A8D5BA]" />
                <span>Helpline: +91 20 2567 8900</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#E6DFD3]/60 dark:bg-stone-800/80 p-6 text-center space-y-3 border border-[#E6DFD3] dark:border-stone-700">
            <div className="w-14 h-14 rounded-2xl bg-[#0B5D57] text-white flex items-center justify-center mx-auto shadow-sm">
              <MapPin className="w-7 h-7 text-[#FF7A59]" />
            </div>
            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Google Maps Verified Location
            </h4>
            <p className="text-xs text-stone-500">
              Opposite Fergusson College Main Gate, Near Goodluck Chowk
            </p>
            <a
              href="https://maps.google.com/?q=Fergusson+College+Road+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs transition"
            >
              <span>Get Driving Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
