import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Package, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Search, 
  RefreshCw,
  Users,
  Check
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';

export const AdminView: React.FC = () => {
  const { orders, prescriptions, verifyPrescription, updateOrderStatus, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'orders' | 'inventory' | 'analytics'>('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock revenue chart data
  const revenueData = [
    { day: 'Mon', revenue: 24500, orders: 38 },
    { day: 'Tue', revenue: 29800, orders: 44 },
    { day: 'Wed', revenue: 31200, orders: 49 },
    { day: 'Thu', revenue: 28400, orders: 42 },
    { day: 'Fri', revenue: 38900, orders: 58 },
    { day: 'Sat', revenue: 45200, orders: 72 },
    { day: 'Sun', revenue: 41800, orders: 66 },
  ];

  const pendingPrescriptions = prescriptions.filter((p) => p.status === 'Pending Review');
  const lowStockProducts = PRODUCTS.filter((p) => p.inStock).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner / Store Manager Header */}
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DFF5EC] text-[#0B5D57]">
              Dispensary Backoffice
            </span>
            <span className="text-xs text-stone-400">• FC Road Branch</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
            Pharmacist Dispensary Console
          </h1>
          <p className="text-xs text-[#5C6E6B] dark:text-stone-400">
            Duty Pharmacist: <strong>Shrikant Joshi (B.Pharm, PCI #89412)</strong>
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl gap-1 text-xs">
          {[
            { id: 'prescriptions', label: `Rx Queue (${pendingPrescriptions.length})` },
            { id: 'orders', label: `Orders (${orders.length})` },
            { id: 'inventory', label: 'Inventory & Stocks' },
            { id: 'analytics', label: 'Dispensary Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold transition ${
                activeTab === tab.id
                  ? 'bg-[#0B5D57] text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-xs space-y-1">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Today's Revenue</span>
          <div className="font-serif text-2xl font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
            ₹45,280
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">+18% vs yesterday</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-xs space-y-1">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Pending Rx Verification</span>
          <div className="font-serif text-2xl font-bold text-amber-600">
            {pendingPrescriptions.length} Slips
          </div>
          <span className="text-[10px] text-stone-500">Avg response: 7.2 mins</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-xs space-y-1">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Active Orders</span>
          <div className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            {orders.length}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">100% On-Time 90m SLA</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] shadow-xs space-y-1">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Cold-Chain Temperature</span>
          <div className="font-serif text-2xl font-bold text-emerald-600">
            4.2°C
          </div>
          <span className="text-[10px] text-stone-400">Main Vaccine Chiller Normal</span>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm min-h-[450px]">
        {/* Tab 1: Prescription Verification Queue */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                  Prescription Verification Desk
                </h3>
                <p className="text-xs text-stone-500">Review patient documents, doctor credentials, and issue verified quotes</p>
              </div>
            </div>

            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#0B5D57] dark:text-[#A8D5BA]">{rx.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rx.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rx.status}
                      </span>
                    </div>
                    <span className="text-stone-400">{rx.uploadDate}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-stone-400 block text-[11px]">Patient Name:</span>
                      <strong className="text-stone-900 dark:text-white text-sm">{rx.patientName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Prescribing Doctor:</span>
                      <span className="text-stone-700 dark:text-stone-300 font-medium">{rx.doctorName}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Attached Slip:</span>
                      <span className="text-stone-700 dark:text-stone-300 font-mono">{rx.fileName}</span>
                    </div>
                  </div>

                  {rx.pharmacistNotes && (
                    <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-[11px] text-stone-600 dark:text-stone-300">
                      <strong>Current Pharmacist Note:</strong> "{rx.pharmacistNotes}"
                    </div>
                  )}

                  {rx.status === 'Pending Review' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                      <button
                        onClick={() => {
                          verifyPrescription(
                            rx.id, 
                            'Confirmed', 
                            780,
                            'Prescription validated by Pharmacist Shrikant Joshi. Telma 40 (30 tabs) + Rosuvas 10 (30 tabs) approved with generic alternative recommendations provided.'
                          );
                          addToast(`Prescription ${rx.id} approved and quote issued`, 'success');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Issue Quote (₹780)</span>
                      </button>

                      <button
                        onClick={() => {
                          verifyPrescription(
                            rx.id,
                            'Pending Review',
                            undefined,
                            'Image is slightly blurred. Pharmacist requested high-resolution camera photo or call verification.'
                          );
                          addToast(`Requested clear copy for ${rx.id}`, 'info');
                        }}
                        className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 text-stone-700 dark:text-stone-300 font-bold text-xs"
                      >
                        Request Clearer Photo
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Orders Fulfillment Pipeline */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
              Live Order Fulfillment Pipeline ({orders.length})
            </h3>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-stone-900 dark:text-white">{ord.id}</span>
                      <span className="text-stone-400 block text-[11px]">{ord.date} • {ord.deliveryType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DFF5EC] text-[#0B5D57]">
                        {ord.status}
                      </span>
                      <span className="font-serif font-bold text-sm text-stone-900 dark:text-white tabular-nums">
                        ₹{ord.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-stone-600 dark:text-stone-300">
                    <strong>Recipient:</strong> {ord.address.fullName} ({ord.address.phone}) — {ord.address.streetAddress}, {ord.address.locality}
                  </div>

                  {/* Move status buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-stone-400 font-semibold text-[11px]">Advance Step:</span>
                    {(['Order Placed', 'Verified by Pharmacist', 'Packed', 'Dispatched', 'Delivered'] as const).map((step) => (
                      <button
                        key={step}
                        onClick={() => {
                          updateOrderStatus(ord.id, step);
                          addToast(`Updated ${ord.id} to "${step}"`, 'info');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                          ord.status === step
                            ? 'bg-[#0B5D57] text-white'
                            : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-[#0B5D57]'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inventory & Stock */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                  Dispensary Inventory ({PRODUCTS.length} SKUs)
                </h3>
                <p className="text-xs text-stone-500">Real-time batch & availability management</p>
              </div>
              <input
                type="text"
                placeholder="Search by salt or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 font-bold uppercase text-[10px]">
                    <th className="p-3">Medicine Name</th>
                    <th className="p-3">Active Salt</th>
                    <th className="p-3">Brand</th>
                    <th className="p-3">Price / MRP</th>
                    <th className="p-3">Schedule</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {PRODUCTS.filter((p) => 
                    !searchTerm || 
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    p.genericName.toLowerCase().includes(searchTerm.toLowerCase())
                  ).slice(0, 15).map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 font-bold text-stone-900 dark:text-white">{p.name}</td>
                      <td className="p-3 text-stone-600 dark:text-stone-300">{p.genericName}</td>
                      <td className="p-3 text-stone-500">{p.brand}</td>
                      <td className="p-3 font-semibold">₹{p.price} <span className="text-stone-400 text-[10px] line-through">₹{p.mrp}</span></td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 dark:bg-stone-800">
                          {p.schedule}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
              Weekly Revenue & Order Trend
            </h3>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Dispensary Sales']}
                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#10201F', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="revenue" fill="#0B5D57" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
