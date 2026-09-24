import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Award, 
  CheckCircle2, 
  ThermometerSnowflake, 
  FileText, 
  Users, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const AboutView: React.FC = () => {
  const { setView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-[#0B5D57] to-[#073B37] text-white p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#DFF5EC]">
            <Award className="w-3.5 h-3.5" />
            <span>Serving Punekars with Integrity Since 1991</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Sanjivani Apothecary & Chemist
          </h1>
          <p className="text-sm sm:text-base text-[#DFF5EC]/90 leading-relaxed">
            Founded by veteran pharmacist Shrikant Joshi along the iconic Fergusson College Road in Pune, Sanjivani bridges timeless apothecary dedication with high-precision digital dispensary technology.
          </p>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
            100% Genuine Sourcing
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            We purchase exclusively from authorized manufacturer direct C&F clearing agents (Sun Pharma, Cipla, Abbott, GSK). Zero grey-market intermediate brokers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center">
            <ThermometerSnowflake className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
            Certified Cold-Chain (2°C – 8°C)
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Insulins, biologics, and pediatric vaccines are preserved in continuous-power pharmaceutical refrigerators with calibrated digital thermal dataloggers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
            Ethical Pharmacist Guidance
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            We actively advise families on high-quality bioequivalent generic substitutes, helping reduce recurring monthly chronic prescription bills by up to 65%.
          </p>
        </div>
      </section>

      {/* Statutory Licenses & Compliance Details */}
      <section className="bg-white dark:bg-[#132422] rounded-3xl p-8 border border-[#E6DFD3] dark:border-[#23423F] space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
            Statutory Transparency
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mt-1">
            Government Registrations & Licenses
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block font-semibold">Form 20 Drug License:</span>
            <strong className="text-stone-900 dark:text-white font-mono text-sm">MH-PZ1-149204</strong>
            <span className="text-[11px] text-emerald-600 block">Active & Renewed</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block font-semibold">Form 21 Drug License:</span>
            <strong className="text-stone-900 dark:text-white font-mono text-sm">MH-PZ1-149205</strong>
            <span className="text-[11px] text-emerald-600 block">Active & Renewed</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block font-semibold">PCI Registration Number:</span>
            <strong className="text-stone-900 dark:text-white font-mono text-sm">PCI-MAH-89412</strong>
            <span className="text-[11px] text-stone-500 block">Pharmacist on Duty</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="text-stone-400 block font-semibold">GSTIN Registration:</span>
            <strong className="text-stone-900 dark:text-white font-mono text-sm">27AACCS1991F1ZP</strong>
            <span className="text-[11px] text-stone-500 block">State: Maharashtra (27)</span>
          </div>
        </div>
      </section>

      {/* Leadership & Pharmacist Team */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
            Our Dispensary Clinicians
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mt-1">
            The Pharmacists Behind Every Dispatch
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0B5D57] text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0">
              SJ
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Shrikant Joshi, B.Pharm
              </h4>
              <span className="font-semibold text-[#0B5D57] dark:text-[#A8D5BA] block">
                Founder & Chief Pharmacist (32 Years Clinical Experience)
              </span>
              <p className="text-stone-500 pt-1 leading-relaxed">
                Graduate of Poona College of Pharmacy (1988). Specialized in chronic cardiovascular medicine dispensing, drug-drug interaction auditing, and community health.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0B5D57] text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0">
              MK
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Meera Kulkarni, M.Pharm (Clinical)
              </h4>
              <span className="font-semibold text-[#0B5D57] dark:text-[#A8D5BA] block">
                Dispensary Head & Digital Verification Lead
              </span>
              <p className="text-stone-500 pt-1 leading-relaxed">
                Oversees digital prescription verification protocols, cold-chain biological transport logistics, and patient tele-counselling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="rounded-3xl bg-[#FAF7F0] dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] p-8 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
          Need Prescription Medicine Today?
        </h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Upload your prescription or browse our extensive CDSCO compliant catalog. 90-Minute express delivery available across Pune.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setView('prescription')}
            className="px-6 py-3 rounded-2xl bg-[#0B5D57] text-white font-bold text-xs hover:bg-[#073B37] transition"
          >
            Upload Prescription
          </button>
          <button
            onClick={() => setView('shop')}
            className="px-6 py-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-bold text-xs transition"
          >
            Browse Medicines
          </button>
        </div>
      </section>
    </div>
  );
};
