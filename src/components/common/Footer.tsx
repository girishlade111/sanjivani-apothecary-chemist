import React from 'react';
import { 
  Pill, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  ExternalLink,
  MessageCircle,
  Award
} from 'lucide-react';
import { useStore, AppView } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/i18n';

export const Footer: React.FC = () => {
  const { setView, language } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#10201F] text-[#FAF7F0] pt-16 pb-12 border-t border-[#23423F]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#23423F]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B5D57] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#A8D5BA]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Govt. Licensed Chemist</h4>
              <p className="text-xs text-stone-400 mt-0.5">Forms 20 & 21 (MH-PZ1-149204) verified by FDA Maharashtra.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B5D57] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#34D399]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Cold-Chain Assurance</h4>
              <p className="text-xs text-stone-400 mt-0.5">Insulin and vaccines stored at strict 2°C–8°C with digital logs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B5D57] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#FF7A59]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">90-Minute Pune Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">Dedicated express dispatchers across all municipal pin codes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B5D57] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#34D399]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">24x7 Pharmacist on Call</h4>
              <p className="text-xs text-stone-400 mt-0.5">Instant dosage clarifications and prescription verification.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12 border-b border-[#23423F]">
          {/* Col 1: Brand & Dispensary Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0B5D57] flex items-center justify-center text-white">
                <Pill className="w-5 h-5 text-[#DFF5EC]" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Sanjivani Apothecary & Chemist
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Established in 1991, Sanjivani Apothecary is Pune’s premier registered retail pharmacy combining clinical precision, cold-chain assurance, and personalized neighborhood care.
            </p>

            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF7A59] shrink-0 mt-0.5" />
                <span>Shop 4-5, Ground Floor, Heritage Arcade, Fergusson College Road, Shivajinagar, Pune, Maharashtra 411005</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>24x7 Helpline: +91 20 2567 8900 / +91 98220 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A8D5BA] shrink-0" />
                <span>care@sanjivani-apothecary.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Medicines & Categories */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white mb-4">Apothecary Shop</h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><button onClick={() => setView('shop', { category: 'cat-cardiac' })} className="hover:text-[#A8D5BA] transition">Cardiac & Blood Pressure</button></li>
              <li><button onClick={() => setView('shop', { category: 'cat-diabetes' })} className="hover:text-[#A8D5BA] transition">Diabetes Management</button></li>
              <li><button onClick={() => setView('shop', { category: 'cat-ayurveda' })} className="hover:text-[#A8D5BA] transition">Authentic Ayurveda</button></li>
              <li><button onClick={() => setView('shop', { category: 'cat-devices' })} className="hover:text-[#A8D5BA] transition">Medical Devices & Monitors</button></li>
              <li><button onClick={() => setView('shop', { category: 'cat-otc' })} className="hover:text-[#A8D5BA] transition">Daily OTC & First Aid</button></li>
              <li><button onClick={() => setView('shop', { category: 'cat-mother' })} className="hover:text-[#A8D5BA] transition">Mother & Infant Care</button></li>
            </ul>
          </div>

          {/* Col 3: Healthcare Services */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white mb-4">Patient Services</h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><button onClick={() => setView('prescription')} className="hover:text-[#A8D5BA] transition font-semibold text-[#FF7A59]">Upload Doctor Prescription</button></li>
              <li><button onClick={() => setView('whatsapp')} className="hover:text-[#A8D5BA] transition">Quick WhatsApp Ordering</button></li>
              <li><button onClick={() => setView('health-tools')} className="hover:text-[#A8D5BA] transition">BP & Glucose Trackers</button></li>
              <li><button onClick={() => setView('lab-tests')} className="hover:text-[#A8D5BA] transition">Diagnostic Lab Checkups</button></li>
              <li><button onClick={() => setView('doctor-consult')} className="hover:text-[#A8D5BA] transition">Doctor Consultation</button></li>
              <li><button onClick={() => setView('offers')} className="hover:text-[#A8D5BA] transition">Coupons & Loyalty Club</button></li>
              <li><button onClick={() => setView('blog')} className="hover:text-[#A8D5BA] transition">Health & Pharmacy Blog</button></li>
            </ul>
          </div>

          {/* Col 4: Regulatory & Compliance */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white mb-4">Statutory Badges</h5>
            <div className="bg-[#1A302E] p-3 rounded-xl border border-[#23423F] space-y-2 text-[11px] text-stone-300">
              <div>
                <span className="text-stone-400 block">Retail Drug Licenses:</span>
                <strong className="text-[#A8D5BA] font-mono">Form 20: MH-PZ1-149204</strong>
                <strong className="text-[#A8D5BA] font-mono block">Form 21: MH-PZ1-149205</strong>
              </div>
              <div>
                <span className="text-stone-400 block">GSTIN Registration:</span>
                <strong className="text-white font-mono">27AAACS1492K1Z9</strong>
              </div>
              <div>
                <span className="text-stone-400 block">FSSAI Food/Nutra Lic:</span>
                <strong className="text-white font-mono">11521038000492</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Head Pharmacist:</span>
                <span className="text-white font-medium">Rajesh Kulkarni, B.Pharm (Reg. #64281)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Medical Disclaimer Accordion / Notice */}
        <div className="py-6 border-b border-[#23423F] text-[11px] text-stone-400 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Statutory Compliance & Legal Disclaimer:</strong> In accordance with the Drugs and Cosmetics Act, 1940 and Pharmacy Act, 1948 of India, medications marked <strong>Schedule H</strong> or <strong>Rx</strong> require a valid written prescription from a Registered Medical Practitioner before dispensing. We strictly do not vend, distribute, or facilitate orders for Schedule X or habit-forming narcotics. All prices are in Indian Rupees (₹) inclusive of applicable GST.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 1991–2026 Sanjivani Apothecary & Chemist Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => setView('legal-privacy')} className="hover:text-white transition">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setView('legal-terms')} className="hover:text-white transition">Terms & Conditions</button>
            <span>•</span>
            <button onClick={() => setView('legal-refund')} className="hover:text-white transition">Medicine Return Policy</button>
            <span>•</span>
            <button onClick={() => setView('legal-disclaimer')} className="hover:text-white transition">Clinical Disclaimer</button>
            <span>•</span>
            <button onClick={() => setView('admin')} className="text-[#FF7A59] hover:underline font-medium">Admin Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
