import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  CheckCheck, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  Camera,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const WhatsAppView: React.FC = () => {
  const { setView, user, addToast } = useStore();

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'pharmacist'; text: string; time: string }>>([
    {
      sender: 'pharmacist',
      text: 'Namaskar! Welcome to Sanjivani Apothecary & Chemist, FC Road, Pune. I am Pharmacist Shrikant Joshi on duty. You can send your prescription photo or list of medicines here for 90-minute express doorstep delivery.',
      time: '10:02 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: nowTime }
    ]);
    setInputVal('');

    // Pharmacist automated response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'pharmacist',
          text: 'Thank you for sharing. We have identified your request. The medicines are available in our FC Road dispensary with fresh 2028 batches. We are packing and will dispatch within 90 minutes. You can also view equivalent generic options to save 45%.',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleAttachDemoRx = () => {
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: '📎 [Attached Doctor Prescription]: Dr_Ranade_Cardiology_Slip.jpg', time: nowTime }
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'pharmacist',
          text: 'Prescription received! Dr. Ranade has prescribed Telma 40mg (once daily) and Rosuvas 10mg (at bedtime). Total quote for 30-day course: ₹780 (or ₹340 if you opt for bioequivalent generic substitutes). Where in Pune should we deliver?',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <button
        onClick={() => setView('home')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Apothecary Store</span>
      </button>

      {/* WhatsApp Window Wrapper */}
      <div className="bg-[#EFEAE2] dark:bg-[#0C1716] rounded-3xl overflow-hidden border border-[#D1D7DB] dark:border-[#23423F] shadow-2xl flex flex-col h-[640px]">
        {/* Chat Header */}
        <div className="bg-[#075E54] dark:bg-[#132422] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif text-lg font-bold">
              SJ
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                <span>Sanjivani Chemist Desk</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </h3>
              <p className="text-[11px] text-emerald-100">
                Pharmacist Shrikant Joshi (Online • FC Road Dispensary)
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919822012345?text=Hello%20Sanjivani%20Apothecary%20Pune,%20I%20would%20like%20to%20order%20medicines"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-100 border border-white/20 transition flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Open Real App</span>
          </a>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Regulatory security note */}
          <div className="text-center my-2">
            <span className="inline-block px-3 py-1 rounded-lg bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[11px] border border-amber-200 dark:border-amber-900 shadow-2xs">
              🔒 Licensed Chemist Chat. Schedule H medicines require clear doctor slip photo.
            </span>
          </div>

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xs text-xs space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-[#E7FFDB] dark:bg-[#005C4B] text-stone-900 dark:text-white rounded-tr-xs'
                    : 'bg-white dark:bg-[#202C33] text-stone-900 dark:text-white rounded-tl-xs'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400">
                  <span>{m.time}</span>
                  {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Suggestions */}
        <div className="px-4 py-2 bg-white/70 dark:bg-[#132422]/70 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={handleAttachDemoRx}
            className="px-3 py-1 rounded-full bg-[#0B5D57] text-white font-semibold text-[11px] whitespace-nowrap flex items-center gap-1"
          >
            <Paperclip className="w-3 h-3" />
            <span>Send Sample Prescription Photo</span>
          </button>
          <button
            onClick={() => setInputVal('Do you deliver in Kothrud within 90 minutes?')}
            className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] whitespace-nowrap"
          >
            Delivery in Kothrud?
          </button>
          <button
            onClick={() => setInputVal('Can you suggest generic substitute for Telma 40?')}
            className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] whitespace-nowrap"
          >
            Generic substitute query
          </button>
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="bg-[#F0F2F5] dark:bg-[#202C33] p-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAttachDemoRx}
            className="p-2 rounded-full text-stone-500 hover:text-stone-700 dark:hover:text-white"
            title="Attach Prescription Image"
          >
            <Camera className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder="Type medicine name or question..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#2A3942] text-xs text-stone-900 dark:text-white outline-none"
          />

          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-[#00A884] text-white flex items-center justify-center hover:bg-[#008F6F] transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
