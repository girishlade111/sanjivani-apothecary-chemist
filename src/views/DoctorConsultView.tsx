import React, { useState } from 'react';
import { 
  Stethoscope, 
  Video, 
  Phone, 
  Star, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Hospital, 
  ShieldCheck, 
  ArrowRight,
  X,
  Languages
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { DOCTORS } from '../data/doctors';
import { Doctor } from '../types';

export const DoctorConsultView: React.FC = () => {
  const { familyMembers, addToast } = useStore();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultType, setConsultType] = useState<'Video Call' | 'Audio Call'>('Video Call');
  const [slotDate, setSlotDate] = useState('2026-09-20');
  const [slotTime, setSlotTime] = useState('05:30 PM - 06:00 PM');
  const [patient, setPatient] = useState(familyMembers[0]?.name || 'Sunita Gokhale');
  const [symptoms, setSymptoms] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    setIsBooked(true);
    addToast(`Booked consultation with ${selectedDoctor.name} on ${slotDate}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B5D57] to-[#073B37] text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#DFF5EC]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified PMC & MMC Registered Doctors</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Consult Leading Pune Specialists
          </h1>
          <p className="text-xs sm:text-sm text-[#DFF5EC]/90 leading-relaxed">
            Connect with certified clinicians from KEM Hospital, Deenanath Mangeshkar, Ruby Hall Clinic, and Poona Hospital for video or audio consultations. Receive an official digital prescription for direct medicine fulfillment.
          </p>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
          Available Clinicians & Specialists ({DOCTORS.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center font-serif text-xl font-bold">
                      {doc.name.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                        {doc.name}
                      </h3>
                      <span className="text-xs font-semibold text-[#0B5D57] dark:text-[#A8D5BA] block">
                        {doc.specialty}
                      </span>
                      <span className="text-[11px] text-stone-400">{doc.qualification}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <Hospital className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{doc.experience} Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{(doc.languages || ['English', 'Hindi', 'Marathi']).join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{doc.rating}</span>
                  <span className="text-stone-400 font-normal">({doc.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">Consultation Fee</span>
                  <span className="font-serif font-bold text-lg text-[#0B5D57] dark:text-[#A8D5BA]">
                    ₹{doc.consultationFee}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="px-4 py-2 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs shadow-xs transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Drawer / Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E6DFD3] dark:border-[#23423F] relative space-y-4">
            <button
              onClick={() => { setSelectedDoctor(null); setIsBooked(false); }}
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
                  Consultation Confirmed!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
                  Your appointment with <strong>{selectedDoctor.name}</strong> is booked for <strong>{slotTime}</strong> on <strong>{slotDate}</strong> ({consultType}).
                </p>
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs space-y-1">
                  <span>A secure joining link will be sent via SMS & WhatsApp to your phone</span>
                  <span className="block text-stone-500 font-bold">Total Fee: ₹{selectedDoctor.consultationFee}</span>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B5D57] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div className="pb-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-xs text-[#0B5D57] font-bold">Book Tele-Consultation</span>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                    {selectedDoctor.name}
                  </h3>
                  <span className="text-xs text-stone-500">{selectedDoctor.specialty} • {selectedDoctor.hospital}</span>
                </div>

                {/* Consultation Type */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Consultation Medium
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultType('Video Call')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        consultType === 'Video Call' ? 'border-[#0B5D57] bg-[#DFF5EC] text-[#0B5D57]' : 'border-stone-200'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>HD Video Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultType('Audio Call')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        consultType === 'Audio Call' ? 'border-[#0B5D57] bg-[#DFF5EC] text-[#0B5D57]' : 'border-stone-200'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Phone Audio</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Patient Name
                  </label>
                  <select
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
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
                      value={slotDate}
                      onChange={(e) => setSlotDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Available Slot</label>
                    <select
                      value={slotTime}
                      onChange={(e) => setSlotTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    >
                      <option>10:00 AM - 10:30 AM</option>
                      <option>02:30 PM - 03:00 PM</option>
                      <option>05:30 PM - 06:00 PM</option>
                      <option>07:00 PM - 07:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Chief Complaints / Reason</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly state symptoms, duration, and current medications..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs transition"
                >
                  Confirm Appointment (₹{selectedDoctor.consultationFee})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
