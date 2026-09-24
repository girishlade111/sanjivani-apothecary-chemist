import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  FileText, 
  UploadCloud, 
  Plus, 
  ArrowRight, 
  QrCode, 
  Clock, 
  ShoppingBag,
  Sparkles,
  Store,
  Wallet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { Address } from '../types';
import { ProductArt } from '../components/common/ProductArt';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    savedAddresses, 
    addAddress, 
    prescriptions, 
    appliedCoupon, 
    deliveryMethod, 
    setDeliveryMethod, 
    createOrder, 
    setView, 
    addToast 
  } = useStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(savedAddresses[0]?.id || '');
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string>(prescriptions[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | 'Pay at Store'>('UPI');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // New address state
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newLocality, setNewLocality] = useState('');
  const [newPincode, setNewPincode] = useState('411005');
  const [newLabel, setNewLabel] = useState<'Home' | 'Work' | 'Parents'>('Home');

  // Rx Check
  const requiresPrescription = cart.some((item) => item.product.requiresPrescription);

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    }
  }

  const isFreeDelivery = deliveryMethod === 'pickup' || subtotal >= 499;
  const deliveryFee = isFreeDelivery ? 0 : (deliveryMethod === 'express' ? 50 : 35);
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newStreet) {
      addToast('Please fill in required address fields', 'warning');
      return;
    }

    addAddress({
      fullName: newFullName,
      phone: newPhone,
      streetAddress: newStreet,
      locality: newLocality || 'Pune City',
      pincode: newPincode,
      isDefault: false,
      label: newLabel
    });

    setIsAddingNewAddress(false);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      addToast('Your bag is empty', 'warning');
      setView('shop');
      return;
    }

    const currentAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];
    if (!currentAddress && deliveryMethod !== 'pickup') {
      addToast('Please select or add a delivery address', 'warning');
      return;
    }

    if (requiresPrescription && !selectedPrescriptionId) {
      addToast('Prescription is required for 1 or more medications in your order', 'error');
      return;
    }

    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    const deliveryTypeMap = {
      express: 'Express (90 Mins)' as const,
      standard: 'Standard Delivery' as const,
      pickup: 'Store Pickup' as const
    };

    createOrder({
      address: currentAddress,
      deliveryType: deliveryTypeMap[deliveryMethod],
      paymentMethod,
      prescriptionId: requiresPrescription ? selectedPrescriptionId : undefined
    });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-stone-400" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">Your Pharmacy Bag is Empty</h2>
        <p className="text-xs text-stone-500">Add medicines or health essentials before heading to checkout.</p>
        <button
          onClick={() => setView('shop')}
          className="px-6 py-3 rounded-xl bg-[#0B5D57] text-white font-bold text-xs"
        >
          Explore Medicines
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Complete Pharmacy Checkout
        </h1>
        <p className="text-xs text-[#5C6E6B] dark:text-stone-400 mt-1">
          Licensed Dispensary Verification • Temperature-Monitored Dispatch
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Delivery Method */}
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#0B5D57] dark:text-[#A8D5BA]" />
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                1. Delivery Speed & Preference
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-2xl border text-left transition ${
                  deliveryMethod === 'express'
                    ? 'border-[#0B5D57] bg-[#DFF5EC]/40 dark:bg-[#0B5D57]/20 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900 dark:text-white">90-Min Express</span>
                  <span className="text-[10px] font-bold text-[#FF7A59]">Pune Only</span>
                </div>
                <p className="text-[11px] text-stone-500">Delivered within 90 minutes across central Pune</p>
                <span className="block mt-2 font-bold text-xs text-[#0B5D57] dark:text-[#A8D5BA]">
                  {subtotal >= 499 ? 'FREE' : '₹50'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-2xl border text-left transition ${
                  deliveryMethod === 'standard'
                    ? 'border-[#0B5D57] bg-[#DFF5EC]/40 dark:bg-[#0B5D57]/20 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900 dark:text-white">Same Day Standard</span>
                  <span className="text-[10px] font-semibold text-stone-400">Regular</span>
                </div>
                <p className="text-[11px] text-stone-500">Evening slot delivery by 07:00 PM</p>
                <span className="block mt-2 font-bold text-xs text-[#0B5D57] dark:text-[#A8D5BA]">
                  {subtotal >= 499 ? 'FREE' : '₹35'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 rounded-2xl border text-left transition ${
                  deliveryMethod === 'pickup'
                    ? 'border-[#0B5D57] bg-[#DFF5EC]/40 dark:bg-[#0B5D57]/20 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900 dark:text-white">In-Store Pickup</span>
                  <Store className="w-3.5 h-3.5 text-[#0B5D57]" />
                </div>
                <p className="text-[11px] text-stone-500">Ready in 30 mins at FC Road Dispensary</p>
                <span className="block mt-2 font-bold text-xs text-emerald-600">FREE</span>
              </button>
            </div>
          </div>

          {/* Step 2: Delivery Address */}
          {deliveryMethod !== 'pickup' && (
            <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0B5D57] dark:text-[#A8D5BA]" />
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                    2. Delivery Address in Pune
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                  className="text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Saved Addresses List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition relative ${
                      selectedAddressId === addr.id
                        ? 'border-[#0B5D57] bg-[#DFF5EC]/30 dark:bg-[#0B5D57]/20'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-stone-900 dark:text-white">{addr.fullName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {addr.label}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {addr.streetAddress}, {addr.locality}, Pune - {addr.pincode}
                    </p>
                    <span className="block text-[11px] text-stone-500 mt-2">Phone: {addr.phone}</span>
                  </div>
                ))}
              </div>

              {/* Add New Address Modal / Drawer */}
              {isAddingNewAddress && (
                <form onSubmit={handleSaveAddress} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                  <h4 className="font-bold text-xs text-stone-900 dark:text-white">Enter New Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Recipient Full Name"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <input
                      type="tel"
                      placeholder="10-Digit Mobile Number"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="House/Flat No, Building, Street"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Locality (e.g. Kothrud, Baner)"
                      value={newLocality}
                      onChange={(e) => setNewLocality(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <input
                      type="text"
                      placeholder="Pincode (e.g. 411038)"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#0B5D57] text-white text-xs font-bold"
                    >
                      Save & Select
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="px-4 py-2 rounded-xl text-stone-500 text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Step 3: Prescription Attachment (If cart requires Rx) */}
          {requiresPrescription && (
            <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 border border-rose-200 dark:border-rose-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <FileText className="w-5 h-5" />
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  3. Prescription Verification Required
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Your order contains Schedule H medications. Please select a verified prescription slip from your vault or upload a new one.
              </p>

              <div className="space-y-2">
                {prescriptions.map((rx) => (
                  <label
                    key={rx.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition text-xs ${
                      selectedPrescriptionId === rx.id
                        ? 'border-[#0B5D57] bg-[#DFF5EC]/40 dark:bg-[#0B5D57]/20 font-bold'
                        : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="prescription"
                        checked={selectedPrescriptionId === rx.id}
                        onChange={() => setSelectedPrescriptionId(rx.id)}
                        className="accent-[#0B5D57]"
                      />
                      <div>
                        <span>{rx.id} ({rx.patientName})</span>
                        <span className="block text-[11px] text-stone-500 font-normal">
                          {rx.doctorName} • {rx.fileName}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {rx.status}
                    </span>
                  </label>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setView('prescription')}
                className="text-xs font-bold text-[#FF7A59] hover:underline flex items-center gap-1"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload a different prescription document</span>
              </button>
            </div>
          )}

          {/* Step 4: Payment Method */}
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#0B5D57] dark:text-[#A8D5BA]" />
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                4. Select Payment Method
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['UPI', 'Card', 'COD', 'Pay at Store'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3 rounded-2xl border text-center transition ${
                    paymentMethod === method
                      ? 'border-[#0B5D57] bg-[#DFF5EC]/40 dark:bg-[#0B5D57]/20 font-bold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <span className="text-xs block">{method}</span>
                  <span className="text-[10px] text-stone-400">
                    {method === 'UPI' && 'GPay / PhonePe'}
                    {method === 'Card' && 'Debit / Credit'}
                    {method === 'COD' && 'Cash on Doorstep'}
                    {method === 'Pay at Store' && 'At FC Road counter'}
                  </span>
                </button>
              ))}
            </div>

            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-4">
                <div className="w-16 h-16 bg-white p-1 rounded-xl border border-stone-300 shrink-0 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-[#0B5D57]" />
                </div>
                <div className="text-xs space-y-1">
                  <strong className="block text-stone-900 dark:text-white">Demo UPI QR Ready</strong>
                  <p className="text-stone-500">Scan using Google Pay, PhonePe, Paytm, or BHIM. Instant transaction approval in demo mode.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Order Summary ({cart.reduce((t, i) => t + i.quantity, 0)} items)
            </h3>

            {/* Item list */}
            <div className="max-h-56 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 pr-1 text-xs space-y-2">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-2 flex justify-between gap-2">
                  <div className="flex-1 truncate">
                    <span className="font-bold text-stone-900 dark:text-white truncate block">
                      {item.product.name}
                    </span>
                    <span className="text-[11px] text-stone-500">Qty: {item.quantity} × ₹{item.product.price}</span>
                  </div>
                  <span className="font-bold tabular-nums">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Total Amount</span>
                <span className="font-serif text-lg text-[#0B5D57] dark:text-[#A8D5BA]">
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-2xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-stone-400 text-center leading-relaxed">
              By confirming, you agree to statutory dispensary dispensing terms. No real money or live financial credentials are processed in this presentation demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
