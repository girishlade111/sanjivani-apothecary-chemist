import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  FileText, 
  Tag, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Clock,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ProductArt } from '../common/ProductArt';
import { TRANSLATIONS } from '../../data/i18n';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    toggleCartDrawer, 
    updateQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    deliveryMethod,
    setDeliveryMethod,
    setView,
    language
  } = useStore();

  const t = TRANSLATIONS[language];
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  // Totals calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const mrpTotal = cart.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const retailSavings = mrpTotal - subtotal;

  let couponSavings = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponSavings = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.flatDiscount) {
      couponSavings = appliedCoupon.flatDiscount;
    }
  }

  const FREE_DELIVERY_THRESHOLD = 499;
  const isFreeDelivery = deliveryMethod === 'pickup' || subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : (deliveryMethod === 'express' ? 50 : 35);
  const finalTotal = Math.max(0, subtotal - couponSavings + deliveryFee);
  const totalSavings = retailSavings + couponSavings;

  const requiresPrescription = cart.some((item) => item.product.requiresPrescription);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    toggleCartDrawer(false);
    setView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => toggleCartDrawer(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] dark:bg-[#10201F] shadow-2xl flex flex-col border-l border-[#E6DFD3] dark:border-[#23423F]">
          {/* Header */}
          <div className="p-4 bg-white dark:bg-[#132422] border-b border-[#E6DFD3] dark:border-[#23423F] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0B5D57] dark:text-[#A8D5BA]" />
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                {t.cartTitle}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#DFF5EC] text-[#0B5D57] font-bold">
                {cart.reduce((t, i) => t + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => toggleCartDrawer(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="p-3 bg-[#DFF5EC] dark:bg-[#0B5D57]/30 border-b border-[#A8D5BA]/40 text-xs">
            {subtotal >= FREE_DELIVERY_THRESHOLD ? (
              <div className="flex items-center gap-1.5 font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
                <Sparkles className="w-4 h-4 text-[#10B981]" />
                <span>{t.freeDeliveryUnlocked}</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-between font-semibold text-[#0B5D57] dark:text-[#A8D5BA]">
                  <span>Add ₹{(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(0)} more for FREE Delivery</span>
                  <span>{Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0B5D57] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#E6DFD3] dark:divide-[#23423F]">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E6DFD3]/40 dark:bg-stone-800 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-stone-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-stone-800 dark:text-stone-200">Your bag is empty</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">{t.cartEmpty}</p>
                </div>
                <button
                  onClick={() => {
                    toggleCartDrawer(false);
                    setView('shop');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#0B5D57] text-white text-xs font-bold hover:bg-[#073B37] transition"
                >
                  Explore Medicines
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3">
                  <div className="w-16 h-16 shrink-0">
                    <ProductArt product={item.product} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-xs text-stone-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate">
                          {item.product.packSize} • {item.product.brand}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-500 transition p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.product.requiresPrescription && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 mt-1">
                        <FileText className="w-3 h-3" />
                        Rx Required
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#0B5D57] dark:text-[#A8D5BA] tabular-nums">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        {item.product.mrp > item.product.price && (
                          <span className="text-[10px] text-stone-400 line-through">
                            ₹{(item.product.mrp * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-[#E6DFD3] dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-900">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-900 dark:text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rx Notice in Cart if applicable */}
          {requiresPrescription && cart.length > 0 && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border-t border-red-200 dark:border-red-900 flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div>
                <strong>Prescription Required for 1+ items:</strong> You can upload doctor's Rx during checkout or send via WhatsApp.
              </div>
            </div>
          )}

          {/* Coupon & Summary Footer */}
          {cart.length > 0 && (
            <div className="p-4 bg-white dark:bg-[#132422] border-t border-[#E6DFD3] dark:border-[#23423F] space-y-3">
              {/* Promo input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Applied: <strong>{appliedCoupon.code}</strong> (-₹{couponSavings.toFixed(2)})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-stone-400 hover:text-stone-600 text-xs font-bold">
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter promo code (e.g. FIRSTMED20)"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white text-xs font-bold"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-1">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-medium text-stone-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>{t.discount}</span>
                    <span>-₹{totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t.deliveryFee}</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? <strong className="text-emerald-600">{t.free}</strong> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-white pt-2 border-t border-[#E6DFD3] dark:border-stone-800">
                  <span>{t.totalPayable}</span>
                  <span className="text-[#0B5D57] dark:text-[#A8D5BA] font-serif text-base">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-2xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition group"
              >
                <span>{t.proceedCheckout}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
