import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  FileText, 
  ArrowRight, 
  Download, 
  Phone,
  Printer
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const CheckoutSuccessView: React.FC = () => {
  const { recentOrder, orders, setView } = useStore();

  const order = recentOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">No recent order found</h2>
        <button
          onClick={() => setView('shop')}
          className="px-6 py-2.5 rounded-xl bg-[#0B5D57] text-white font-bold text-xs"
        >
          Explore Medicines
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#DFF5EC] text-[#0B5D57] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A59]">
          Order Successfully Dispatched to Dispensary
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Thank you for your order!
        </h1>
        <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
          Order reference <strong className="text-stone-900 dark:text-white font-mono">{order.id}</strong> has been received by our duty pharmacist at Fergusson College Road.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:border-[#0B5D57] text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Tax Invoice</span>
          </button>

          <button
            onClick={() => setView('account')}
            className="px-5 py-2 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Track in My Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Timeline & Pipeline */}
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
              Live Order Fulfillment Pipeline
            </h3>
            <span className="text-xs text-stone-500">Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DFF5EC] text-[#0B5D57]">
            {order.status}
          </span>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {order.trackingSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.completed 
                    ? 'bg-[#0B5D57] text-white' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                }`}>
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < order.trackingSteps.length - 1 && (
                  <div className={`w-0.5 h-8 my-1 ${step.completed ? 'bg-[#0B5D57]' : 'bg-stone-200 dark:bg-stone-800'}`} />
                )}
              </div>
              <div className="pt-1">
                <h4 className={`text-xs font-bold ${step.completed ? 'text-stone-900 dark:text-white' : 'text-stone-400'}`}>
                  {step.title}
                </h4>
                {step.time && <span className="text-[10px] text-stone-400 font-mono">{step.time}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-3 text-xs">
          <h4 className="font-bold text-sm text-stone-900 dark:text-white">Delivery Address</h4>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong>{order.address.fullName}</strong><br />
            {order.address.streetAddress}, {order.address.locality}<br />
            Pune, Maharashtra - {order.address.pincode}<br />
            Phone: {order.address.phone}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-3 text-xs">
          <h4 className="font-bold text-sm text-stone-900 dark:text-white">Payment & Billing</h4>
          <div className="space-y-1.5 text-stone-600 dark:text-stone-300">
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <strong className="text-stone-900 dark:text-white">{order.paymentMethod}</strong>
            </div>
            <div className="flex justify-between">
              <span>Items Total ({order.items.length}):</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800 text-sm">
              <span>Total Paid / Payable:</span>
              <span className="text-[#0B5D57] dark:text-[#A8D5BA] font-serif">₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
