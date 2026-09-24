import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  MessageCircle, 
  Camera, 
  Trash2, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Prescription } from '../types';

export const PrescriptionUploadView: React.FC = () => {
  const { 
    familyMembers, 
    uploadPrescription, 
    prescriptions, 
    setView, 
    addToast 
  } = useStore();

  const [selectedPatient, setSelectedPatient] = useState(familyMembers[0]?.name || 'Sunita Gokhale');
  const [doctorName, setDoctorName] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recentRxId, setRecentRxId] = useState<string | null>(null);

  const handleFileUpload = (fileName: string, fileType: string = 'image/jpeg') => {
    setUploadedFile({ name: fileName, type: fileType });
    addToast(`Attached "${fileName}"`, 'info');
  };

  const handleSampleRx = (type: 'cardiac' | 'pediatric') => {
    if (type === 'cardiac') {
      setUploadedFile({ name: 'Dr_Ranade_Cardiology_KEM_Pune.pdf', type: 'application/pdf' });
      setDoctorName('Dr. Madhav Ranade (Cardiologist, KEM Hospital)');
      setNotes('Monthly chronic refill. Need Telma 40 & Rosuvas 10 for 30 days.');
    } else {
      setUploadedFile({ name: 'Dr_Kelkar_Pediatric_Deccan.jpg', type: 'image/jpeg' });
      setDoctorName('Dr. Anjali Kelkar (Pediatrician, Deccan)');
      setNotes('Fever syrup and nebulizer saline for child.');
    }
    addToast('Loaded realistic demo prescription slip', 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      addToast('Please attach a prescription file or use a demo slip', 'warning');
      return;
    }

    const rxId = uploadPrescription({
      patientName: selectedPatient,
      doctorName: doctorName.trim() || 'Dr. Attending Physician',
      uploadDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      fileUrl: '/mock-rx.png',
      fileName: uploadedFile.name,
      fileType: uploadedFile.type,
      status: 'Pending Review',
      pharmacistNotes: 'Awaiting duty pharmacist review (average 10 minutes)',
      prescribedItems: []
    });

    setRecentRxId(rxId);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B5D57] to-[#073B37] text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#DFF5EC]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% CDSCO Compliant Dispensary Verification</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Upload Doctor Prescription
          </h1>
          <p className="text-xs sm:text-sm text-[#DFF5EC]/90 leading-relaxed">
            Have a prescription from your doctor? Upload a picture or document. Our registered dispensary pharmacists will verify the dosage, create a digital order quote, and dispatch within 90 minutes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Drag-and-Drop */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              Prescription Details
            </h2>

            {/* Quick Demo Pre-fill Buttons */}
            <div className="p-3 rounded-2xl bg-[#DFF5EC]/60 dark:bg-[#0B5D57]/20 border border-[#A8D5BA]/60 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#0B5D57] dark:text-[#A8D5BA] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Shortcuts:</span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSampleRx('cardiac')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 text-[#0B5D57] dark:text-[#A8D5BA] text-[11px] font-bold shadow-xs hover:bg-[#0B5D57] hover:text-white transition"
                >
                  Cardiac Refill Slip
                </button>
                <button
                  type="button"
                  onClick={() => handleSampleRx('pediatric')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 text-[#0B5D57] dark:text-[#A8D5BA] text-[11px] font-bold shadow-xs hover:bg-[#0B5D57] hover:text-white transition"
                >
                  Pediatric Clinic Slip
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Select Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-900 dark:text-white outline-none"
                >
                  {familyMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} ({member.relationship}, {member.age}y)
                    </option>
                  ))}
                </select>
              </div>

              {/* Prescribing Doctor (Optional) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Doctor / Clinic Name (Optional)
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Madhav Ranade, KEM Hospital"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white outline-none"
                />
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Attach Prescription File (Camera Photo, PDF, or Scan)
                </label>

                {uploadedFile ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-xs text-emerald-900 dark:text-emerald-200">{uploadedFile.name}</strong>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Ready for review • {uploadedFile.type}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="p-1.5 text-stone-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (e.dataTransfer.files?.[0]) {
                        const file = e.dataTransfer.files[0];
                        handleFileUpload(file.name, file.type);
                      }
                    }}
                    className={`p-8 rounded-2xl border-2 border-dashed transition text-center space-y-3 cursor-pointer ${
                      isDragOver 
                        ? 'border-[#0B5D57] bg-[#DFF5EC]/40' 
                        : 'border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 hover:border-[#0B5D57]'
                    }`}
                    onClick={() => handleFileUpload('Prescription_Scan_Sept2026.jpg', 'image/jpeg')}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0B5D57]/10 flex items-center justify-center mx-auto text-[#0B5D57] dark:text-[#A8D5BA]">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 dark:text-white">
                        Drag & Drop or Click to Select File
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Supports JPEG, PNG, or PDF up to 15MB
                      </p>
                    </div>
                    <div className="flex justify-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold border">
                        <Camera className="w-3 h-3" /> Camera Snap
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold border">
                        <FileText className="w-3 h-3" /> PDF Document
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Notes or Duration Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please send for 30 days. Recommend cheaper generic substitutes if available."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Submit Prescription for Pharmacist Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Active Prescriptions & WhatsApp Alternative */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Prescription Ordering */}
          <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#128C7E] dark:text-[#25D366]">
              <MessageCircle className="w-6 h-6 fill-current" />
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Prefer WhatsApp Ordering?
              </h3>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              You can simply take a photo of your prescription and send it directly to our registered pharmacist on WhatsApp.
            </p>
            <div className="p-3 bg-white dark:bg-stone-900 rounded-xl text-xs space-y-1">
              <span className="text-stone-500 block">Pharmacist WhatsApp Desk:</span>
              <strong className="text-[#0B5D57] dark:text-[#A8D5BA] font-mono text-sm">+91 98220 12345</strong>
            </div>
            <button
              onClick={() => setView('whatsapp')}
              className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Open WhatsApp Prescription Chat</span>
            </button>
          </div>

          {/* User's Uploaded Prescriptions List */}
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Your Prescription Vault ({prescriptions.length})
            </h3>

            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0B5D57] dark:text-[#A8D5BA]">{rx.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rx.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rx.status}
                    </span>
                  </div>

                  <div>
                    <strong className="block text-stone-900 dark:text-white">{rx.patientName}</strong>
                    <span className="text-[11px] text-stone-500">{rx.doctorName} • {rx.uploadDate}</span>
                  </div>

                  {rx.pharmacistNotes && (
                    <p className="p-2 rounded-lg bg-white dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-300 italic border border-stone-200 dark:border-stone-700">
                      "{rx.pharmacistNotes}"
                    </p>
                  )}

                  {rx.estimatedCost && (
                    <div className="flex items-center justify-between pt-1 border-t border-stone-200 dark:border-stone-800">
                      <span className="text-stone-500">Verified Cost Quote:</span>
                      <span className="font-bold text-sm text-[#0B5D57] dark:text-[#A8D5BA]">₹{rx.estimatedCost}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
