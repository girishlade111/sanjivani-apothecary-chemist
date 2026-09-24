import React, { useState } from 'react';
import { 
  User, 
  Package, 
  FileText, 
  Bell, 
  MapPin, 
  Users, 
  Award, 
  Heart, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductArt } from '../components/common/ProductArt';
import { ProductCard } from '../components/product/ProductCard';

export const AccountView: React.FC = () => {
  const { 
    user, 
    orders, 
    prescriptions, 
    reminders, 
    toggleReminder, 
    deleteReminder, 
    addReminder,
    savedAddresses, 
    deleteAddress,
    familyMembers, 
    deleteFamilyMember, 
    addFamilyMember,
    wishlist, 
    logoutUser, 
    setView,
    addToCart,
    addToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'prescriptions' | 'reminders' | 'addresses' | 'family' | 'loyalty' | 'wishlist'
  >('orders');

  // Reminder form state
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [remMedName, setRemMedName] = useState('');
  const [remDosage, setRemDosage] = useState('1 Tablet');
  const [remTiming, setRemTiming] = useState('08:00 AM');
  const [remFood, setRemFood] = useState<'After Food' | 'Before Food' | 'Empty Stomach' | 'With Food'>('After Food');
  const [remPerson, setRemPerson] = useState(user?.name || 'Sunita Gokhale');

  // Family form state
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [famName, setFamName] = useState('');
  const [famRel, setFamRel] = useState('Child');
  const [famAge, setFamAge] = useState(12);
  const [famCond, setFamCond] = useState('');

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remMedName) {
      addToast('Please enter medication name', 'warning');
      return;
    }

    addReminder({
      medicineName: remMedName,
      dosage: remDosage,
      timing: ['Morning'],
      timeSpecific: remTiming,
      withFood: remFood,
      forPerson: remPerson,
      active: true,
      remainingDays: 30,
      refillAlertCount: 5
    });

    setIsAddReminderOpen(false);
    setRemMedName('');
  };

  const handleCreateFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!famName) return;

    addFamilyMember({
      name: famName,
      relationship: famRel,
      age: Number(famAge),
      gender: 'Other',
      chronicConditions: famCond ? famCond.split(',').map((s) => s.trim()) : []
    });

    setIsAddFamilyOpen(false);
    setFamName('');
    setFamCond('');
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Please sign in to view your account</h2>
        <button
          onClick={() => setView('home')}
          className="px-6 py-2.5 rounded-xl bg-[#0B5D57] text-white font-bold text-xs"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Account Profile Header */}
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0B5D57] text-white flex items-center justify-center font-serif text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                {user.loyaltyTier} Tier
              </span>
            </div>
            <p className="text-xs text-[#5C6E6B] dark:text-stone-400 mt-0.5">
              {user.phone} • {user.email} • Member since {user.memberSince}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Health Points</span>
            <strong className="font-serif text-xl text-[#0B5D57] dark:text-[#A8D5BA]">{user.loyaltyPoints} pts</strong>
          </div>

          <button
            onClick={logoutUser}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-red-500 transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white dark:bg-[#132422] rounded-3xl p-4 border border-[#E6DFD3] dark:border-[#23423F] space-y-1">
          {[
            { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" />, count: orders.length },
            { id: 'prescriptions', label: 'Prescription Vault', icon: <FileText className="w-4 h-4" />, count: prescriptions.length },
            { id: 'reminders', label: 'Dose & Refill Reminders', icon: <Bell className="w-4 h-4" />, count: reminders.length },
            { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" />, count: savedAddresses.length },
            { id: 'family', label: 'Family Health Vault', icon: <Users className="w-4 h-4" />, count: familyMembers.length },
            { id: 'loyalty', label: 'Health Club Rewards', icon: <Award className="w-4 h-4" /> },
            { id: 'wishlist', label: 'Saved Wishlist', icon: <Heart className="w-4 h-4" />, count: wishlistedProducts.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-[#0B5D57] text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="lg:col-span-9 bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm min-h-[450px]">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Orders & Invoices ({orders.length})
              </h3>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <strong className="text-sm font-mono text-stone-900 dark:text-white">{ord.id}</strong>
                        <span className="text-stone-400 block text-[11px]">{ord.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#DFF5EC] text-[#0B5D57]">
                          {ord.status}
                        </span>
                        <span className="font-serif font-bold text-sm text-stone-900 dark:text-white tabular-nums">
                          ₹{ord.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="divide-y divide-stone-200 dark:divide-stone-800">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="py-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8">
                              <ProductArt product={it.product} size="sm" />
                            </div>
                            <div>
                              <span className="font-bold text-stone-800 dark:text-stone-200 block">{it.product.name}</span>
                              <span className="text-[11px] text-stone-500">{it.product.packSize} • Qty: {it.quantity}</span>
                            </div>
                          </div>
                          <span className="font-semibold tabular-nums">₹{(it.product.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px]">
                      <span className="text-stone-500">Delivered to: <strong>{ord.address.locality} ({ord.address.pincode})</strong></span>
                      <button
                        onClick={() => {
                          ord.items.forEach((i) => addToCart(i.product, i.quantity));
                          addToast('Items added to cart from past order', 'success');
                        }}
                        className="text-[#0B5D57] dark:text-[#A8D5BA] font-bold hover:underline"
                      >
                        Re-Order Entire Basket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                  Prescription History ({prescriptions.length})
                </h3>
                <button
                  onClick={() => setView('prescription')}
                  className="px-4 py-2 rounded-xl bg-[#0B5D57] text-white text-xs font-bold"
                >
                  Upload New Rx
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0B5D57] dark:text-[#A8D5BA]">{rx.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {rx.status}
                      </span>
                    </div>

                    <div>
                      <strong className="block text-sm text-stone-900 dark:text-white">{rx.patientName}</strong>
                      <span className="text-[11px] text-stone-500">{rx.doctorName} • {rx.fileName}</span>
                    </div>

                    <p className="p-2.5 rounded-xl bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] italic">
                      "{rx.pharmacistNotes}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medicine Reminders Tab */}
          {activeTab === 'reminders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                    Daily Dose & Refill Reminders
                  </h3>
                  <p className="text-xs text-stone-500">Never miss a dose or run out of chronic medication</p>
                </div>
                <button
                  onClick={() => setIsAddReminderOpen(!isAddReminderOpen)}
                  className="px-4 py-2 rounded-xl bg-[#0B5D57] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Set New Reminder</span>
                </button>
              </div>

              {isAddReminderOpen && (
                <form onSubmit={handleCreateReminder} className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                  <h4 className="font-bold text-stone-900 dark:text-white">Add Medicine Dose Schedule</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g. Telma 40)"
                      value={remMedName}
                      onChange={(e) => setRemMedName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 1 Tablet)"
                      value={remDosage}
                      onChange={(e) => setRemDosage(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Timing (e.g. 08:30 AM)"
                      value={remTiming}
                      onChange={(e) => setRemTiming(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <select
                      value={remFood}
                      onChange={(e) => setRemFood(e.target.value as any)}
                      className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    >
                      <option value="After Food">After Food</option>
                      <option value="Before Food">Before Food</option>
                      <option value="Empty Stomach">Empty Stomach</option>
                      <option value="With Food">With Food</option>
                    </select>
                    <select
                      value={remPerson}
                      onChange={(e) => setRemPerson(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    >
                      {familyMembers.map((m) => (
                        <option key={m.id} value={m.name}>{m.name} ({m.relationship})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#0B5D57] text-white font-bold">
                      Save Reminder
                    </button>
                    <button type="button" onClick={() => setIsAddReminderOpen(false)} className="px-4 py-2 text-stone-500">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rem.active ? 'bg-[#DFF5EC] text-[#0B5D57]' : 'bg-stone-200 text-stone-400'}`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-sm text-stone-900 dark:text-white">{rem.medicineName}</strong>
                        <span className="text-[11px] text-stone-500">
                          {rem.dosage} • {rem.timeSpecific} ({rem.withFood}) for <strong>{rem.forPerson}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-amber-600 font-bold block">{rem.remainingDays} days supply left</span>
                        <span className="text-[10px] text-stone-400">Refill alert at 5 days</span>
                      </div>
                      <button
                        onClick={() => toggleReminder(rem.id)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                          rem.active ? 'bg-[#0B5D57] text-white' : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {rem.active ? 'Active' : 'Paused'}
                      </button>
                      <button
                        onClick={() => deleteReminder(rem.id)}
                        className="text-stone-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Saved Delivery Addresses ({savedAddresses.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 text-xs relative"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-stone-900 dark:text-white">{addr.fullName}</strong>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DFF5EC] text-[#0B5D57]">
                        {addr.label}
                      </span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                      {addr.streetAddress}, {addr.locality}, Pune - {addr.pincode}
                    </p>
                    <span className="block text-[11px] text-stone-500">Phone: {addr.phone}</span>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="absolute bottom-4 right-4 text-stone-400 hover:text-red-500 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Family Health Vault Tab */}
          {activeTab === 'family' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                    Family Health Vault
                  </h3>
                  <p className="text-xs text-stone-500">Manage chronic history and allergy alerts for family</p>
                </div>
                <button
                  onClick={() => setIsAddFamilyOpen(!isAddFamilyOpen)}
                  className="px-4 py-2 rounded-xl bg-[#0B5D57] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Family Member</span>
                </button>
              </div>

              {isAddFamilyOpen && (
                <form onSubmit={handleCreateFamily} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={famName}
                      onChange={(e) => setFamName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-300 bg-white dark:bg-stone-800"
                    />
                    <input
                      type="text"
                      placeholder="Relationship (e.g. Spouse, Son)"
                      value={famRel}
                      onChange={(e) => setFamRel(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-300 bg-white dark:bg-stone-800"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={famAge}
                      onChange={(e) => setFamAge(Number(e.target.value))}
                      className="px-3 py-2 rounded-xl border border-stone-300 bg-white dark:bg-stone-800"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Chronic Conditions (comma separated, e.g. Asthma, Hypertension)"
                    value={famCond}
                    onChange={(e) => setFamCond(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white dark:bg-stone-800"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#0B5D57] text-white font-bold">Save Member</button>
                    <button type="button" onClick={() => setIsAddFamilyOpen(false)} className="px-4 py-2 text-stone-500">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {familyMembers.map((mem) => (
                  <div
                    key={mem.id}
                    className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-stone-900 dark:text-white">{mem.name}</strong>
                      <span className="text-[10px] text-stone-500 font-semibold">{mem.relationship}</span>
                    </div>
                    <span className="text-[11px] text-stone-400 block">{mem.age} years old • {mem.gender}</span>
                    {mem.chronicConditions && mem.chronicConditions.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {mem.chronicConditions.map((c, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Club Rewards Tab */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                  Sanjivani Gold Health Club
                </span>
                <h3 className="font-serif text-3xl font-bold">
                  {user.loyaltyPoints} Reward Points Available
                </h3>
                <p className="text-xs text-amber-100">
                  Worth ₹{(user.loyaltyPoints * 0.1).toFixed(0)} instant discount on your next prescription or wellness purchase.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <strong className="block text-stone-900 dark:text-white">Earn 2% Back</strong>
                  <span className="text-stone-500">Every ₹100 spent gives 2 reward points on OTC & healthcare</span>
                </div>
                <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <strong className="block text-stone-900 dark:text-white">Priority 90-Min Slot</strong>
                  <span className="text-stone-500">Gold members get prioritized dispensary picking & express packing</span>
                </div>
                <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <strong className="block text-stone-900 dark:text-white">Free BP Checkup</strong>
                  <span className="text-stone-500">Complimentary digital vitals checkup anytime at our FC Road store</span>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Saved Wishlist ({wishlistedProducts.length})
              </h3>
              {wishlistedProducts.length === 0 ? (
                <p className="text-xs text-stone-500">You have no items saved in your wishlist yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
