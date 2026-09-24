import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  User,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { LAB_PACKAGES } from '../data/labTests';
import { LabPackage } from '../types';

export const LabTestsView: React.FC = () => {
  const { familyMembers, addToast, setView } = useStore();
  const [selectedPackage, setSelectedPackage] = useState<LabPackage | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-09-20');
  const [bookingTime, setBookingTime] = useState('07:30 AM - 08:30 AM (Fasting Slot)');
  const [patientName, setPatientName] = useState(familyMembers[0]?.name || 'Sunita Gokhale');
  const [address, setAddress] = useState('Flat 402, Prabhat Road, Lane 4, Deccan, Pune - 411004');
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    setIsBooked(true);
    addToast(`Booked home collection for "${selectedPackage.title}" on ${bookingDate}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B5D57] to-[#073B37] text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#DFF5EC]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NABL & ICMR Certified Diagnostics Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Home Sample Collection & Diagnostic Tests
          </h1>
          <p className="text-xs sm:text-sm text-[#DFF5EC]/90 leading-relaxed">
            Certified phlebotomists visit your doorstep anywhere in Pune. Pain-free vacutainer sampling with 100% temperature-controlled transit and digital reports in 12–24 hours.
          </p>
        </div>
      </div>

      {/* Trust Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-1">
          <strong className="block text-stone-900 dark:text-white font-bold">Doorstep Phlebotomist</strong>
          <span className="text-stone-500">Vaccinated, certified technicians with sterile single-use kits</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-1">
          <strong className="block text-stone-900 dark:text-white font-bold">12 to 24-Hr Reports</strong>
          <span className="text-stone-500">NABL pathologist-verified reports sent directly on WhatsApp & Email</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-1">
          <strong className="block text-stone-900 dark:text-white font-bold">Free Pharmacist Review</strong>
          <span className="text-stone-500">Free telephonic walkthrough of your test parameters once ready</span>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
          Popular Health Checkup Packages in Pune
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] flex flex-col justify-between space-y-4 hover:shadow-md transition group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DFF5EC] text-[#0B5D57]">
                    {pkg.parameterCount} Tests Included
                  </span>
                  <span className="text-xs text-stone-400 font-semibold">{pkg.reportTime}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white group-hover:text-[#0B5D57] dark:group-hover:text-[#A8D5BA] transition">
                  {pkg.title}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 text-[11px] space-y-1 text-stone-600 dark:text-stone-300">
                  <div><strong>Sample:</strong> {pkg.sampleType}</div>
                  <div><strong>Fasting Requirement:</strong> {pkg.fastingRequired ? '10-12 hours overnight fasting' : 'No fasting required'}</div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">Key Tests:</span>
                  <div className="flex flex-wrap gap-1">
                    {(pkg.tests || pkg.testsIncluded || []).slice(0, 4).map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {t}
                      </span>
                    ))}
                    {(pkg.tests || pkg.testsIncluded || []).length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#DFF5EC] text-[#0B5D57] font-bold">
                        +{(pkg.tests || pkg.testsIncluded || []).length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-xl text-[#0B5D57] dark:text-[#A8D5BA]">
                      ₹{pkg.price}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{pkg.mrp}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">Save ₹{pkg.mrp - pkg.price}</span>
                </div>

                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="px-4 py-2 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs shadow-xs transition"
                >
                  Book Home Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Drawer / Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E6DFD3] dark:border-[#23423F] relative space-y-4">
            <button
              onClick={() => { setSelectedPackage(null); setIsBooked(false); }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {isBooked ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-white">
                  Sample Collection Scheduled!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
                  A certified phlebotomist from NABL Accredited Diagnostics will arrive at <strong>{bookingTime}</strong> on <strong>{bookingDate}</strong> for {patientName}.
                </p>
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs space-y-1">
                  <span>Package: <strong>{selectedPackage.title}</strong></span>
                  <span className="block text-stone-500">Pay ₹{selectedPackage.price} to technician or via UPI QR on visit</span>
                </div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B5D57] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div className="pb-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-xs text-[#0B5D57] font-bold">Book Doorstep Visit</span>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                    {selectedPackage.title}
                  </h3>
                  <span className="text-xs text-stone-500">Total payable: <strong>₹{selectedPackage.price}</strong> (Sample pickup FREE)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Patient Name
                  </label>
                  <select
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.name}>{m.name} ({m.relationship})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Time Slot</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    >
                      <option>06:30 AM - 07:30 AM (Fasting)</option>
                      <option>07:30 AM - 08:30 AM (Fasting)</option>
                      <option>08:30 AM - 09:30 AM (Fasting)</option>
                      <option>10:00 AM - 12:00 PM (Non-Fasting)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Pune Home Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs transition"
                >
                  Confirm Doorstep Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
