import React, { useState } from 'react';
import { X, Phone, ShieldCheck, CheckCircle2, Pill } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, loginUser } = useStore();
  const [phone, setPhone] = useState('9822044120');
  const [otp, setOtp] = useState('123456');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginUser(phone, otp);
    if (!success) {
      setError('Incorrect OTP. Demo code is 123456');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E6DFD3] dark:border-[#23423F] relative">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0B5D57] flex items-center justify-center text-white mx-auto shadow-sm">
            <Pill className="w-6 h-6 text-[#DFF5EC]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
            Sanjivani Health Club
          </h3>
          <p className="text-xs text-[#5C6E6B] dark:text-stone-400">
            Sign in to access prescription history, refill alerts, and loyalty rewards
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Mobile Number
              </label>
              <div className="flex rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden focus-within:ring-2 focus-within:ring-[#0B5D57]">
                <span className="px-3.5 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm font-semibold border-r border-stone-300 dark:border-stone-700">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 px-3.5 py-2.5 bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-sm outline-none font-medium"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm shadow-md transition"
            >
              Get One-Time Password (OTP)
            </button>

            <div className="p-3 bg-[#DFF5EC]/60 dark:bg-[#0B5D57]/20 rounded-xl text-[11px] text-[#0B5D57] dark:text-[#A8D5BA] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#10B981]" />
              <span>Demo Mode: You can enter any 10-digit number. Next screen has demo OTP prefilled.</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Enter 6-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-[#FF7A59] font-semibold hover:underline"
                >
                  Change number
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-center font-mono text-xl tracking-widest text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0B5D57]"
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm shadow-md transition"
            >
              Verify & Sign In
            </button>

            <div className="text-center">
              <span className="text-xs text-[#5C6E6B] dark:text-stone-400">
                Demo Code: <strong className="font-mono text-[#0B5D57] dark:text-[#A8D5BA]">123456</strong>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
