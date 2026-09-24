import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Product, 
  CartItem, 
  Coupon, 
  Address, 
  FamilyMember, 
  MedicineReminder, 
  HealthLog, 
  Prescription, 
  Order, 
  Language 
} from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { INITIAL_ORDERS } from '../data/orders';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
  memberSince: string;
}

export type AppView = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'product-detail'
  | 'prescription' 
  | 'whatsapp' 
  | 'cart' 
  | 'checkout' 
  | 'checkout-success' 
  | 'account' 
  | 'health-tools' 
  | 'lab-tests' 
  | 'doctor-consult' 
  | 'offers' 
  | 'blog' 
  | 'about' 
  | 'store-locator' 
  | 'contact' 
  | 'legal-privacy' 
  | 'legal-terms' 
  | 'legal-refund' 
  | 'legal-disclaimer' 
  | 'admin';

interface StoreState {
  // Navigation & Routing
  currentView: AppView;
  selectedProductId: string | null;
  selectedBlogId: string | null;
  selectedCategory: string | null;
  selectedConcern: string | null;
  searchQuery: string;

  // Language & Theme
  language: Language;
  theme: 'light' | 'dark';

  // Cart & Order Options
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  deliveryMethod: 'express' | 'standard' | 'pickup';
  selectedDeliverySlot: string;
  pincode: string;
  pincodeStatus: 'verified' | 'unserviceable' | 'prompt';

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  compareList: string[]; // up to 3 product IDs
  toasts: ToastMessage[];

  // User & Auth
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  savedAddresses: Address[];
  familyMembers: FamilyMember[];
  reminders: MedicineReminder[];
  healthLogs: HealthLog[];
  prescriptions: Prescription[];
  orders: Order[];
  recentOrder: Order | null;

  // Admin
  isAdminLoggedIn: boolean;

  // Actions
  setView: (view: AppView, params?: { productId?: string; blogId?: string; category?: string; concern?: string; query?: string }) => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, substituteId?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartDrawer: (open?: boolean) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setDeliveryMethod: (method: 'express' | 'standard' | 'pickup') => void;
  setDeliverySlot: (slot: string) => void;
  setPincode: (pincode: string) => void;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;

  // Compare actions
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;

  // Quick view
  setQuickViewProduct: (product: Product | null) => void;

  // Toasts
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Auth & Profile actions
  loginUser: (phone: string, otp: string) => boolean;
  logoutUser: () => void;
  setAuthModalOpen: (open: boolean) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  deleteFamilyMember: (id: string) => void;
  addReminder: (reminder: Omit<MedicineReminder, 'id'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  addHealthLog: (log: Omit<HealthLog, 'id'>) => void;
  deleteHealthLog: (id: string) => void;
  uploadPrescription: (prescription: Omit<Prescription, 'id'>) => string;

  // Order Placement
  createOrder: (orderData: {
    address: Address;
    deliveryType: 'Express (90 Mins)' | 'Standard Delivery' | 'Store Pickup';
    paymentMethod: 'UPI' | 'Card' | 'COD' | 'Netbanking' | 'Pay at Store';
    prescriptionId?: string;
  }) => Order;

  // Admin Actions
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  verifyPrescription: (prescriptionId: string, status: Prescription['status'], quote?: number, notes?: string) => void;
  updateProductStock: (productId: string, delta: number) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-901',
  name: 'Sunita Gokhale',
  phone: '+91 98220 44120',
  email: 'sunita.gokhale@gmail.com',
  loyaltyPoints: 380,
  loyaltyTier: 'Gold',
  memberSince: 'March 2021'
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-01',
    fullName: 'Sunita Gokhale',
    phone: '+91 98220 44120',
    streetAddress: 'B-402, Shanti Heights, Near Deep Bungalow Chowk',
    locality: 'Model Colony, Shivajinagar',
    pincode: '411016',
    isDefault: true,
    label: 'Home'
  },
  {
    id: 'addr-02',
    fullName: 'Sunita Gokhale',
    phone: '+91 98220 44120',
    streetAddress: 'Bungalow 7, Patwardhan Baug, Karve Road',
    locality: 'Erandwane',
    pincode: '411004',
    isDefault: false,
    label: 'Parents'
  }
];

const DEFAULT_FAMILY: FamilyMember[] = [
  { id: 'fam-01', name: 'Sunita Gokhale', relationship: 'Self', age: 58, gender: 'Female', chronicConditions: ['Hypertension', 'Hypothyroidism'] },
  { id: 'fam-02', name: 'Anand Gokhale', relationship: 'Spouse', age: 62, gender: 'Male', chronicConditions: ['Type 2 Diabetes', 'Dyslipidemia'], allergies: ['Sulfa drugs'] },
  { id: 'fam-03', name: 'Vandana Joshi', relationship: 'Mother', age: 84, gender: 'Female', chronicConditions: ['Osteoarthritis'] }
];

const DEFAULT_REMINDERS: MedicineReminder[] = [
  {
    id: 'rem-01',
    medicineName: 'Thyronorm 50mcg',
    dosage: '1 Tablet',
    timing: ['Morning'],
    timeSpecific: '06:30 AM',
    withFood: 'Empty Stomach',
    forPerson: 'Sunita Gokhale',
    active: true,
    remainingDays: 22,
    refillAlertCount: 5
  },
  {
    id: 'rem-02',
    medicineName: 'Telma 40 Tablet',
    dosage: '1 Tablet',
    timing: ['Morning'],
    timeSpecific: '08:30 AM',
    withFood: 'After Food',
    forPerson: 'Sunita Gokhale',
    active: true,
    remainingDays: 14,
    refillAlertCount: 4
  },
  {
    id: 'rem-03',
    medicineName: 'Glycomet-GP 2 Forte',
    dosage: '1 Tablet',
    timing: ['Morning', 'Night'],
    timeSpecific: '09:00 AM & 08:30 PM',
    withFood: 'With Food',
    forPerson: 'Anand Gokhale',
    active: true,
    remainingDays: 18,
    refillAlertCount: 4
  }
];

const DEFAULT_HEALTH_LOGS: HealthLog[] = [
  { id: 'log-01', type: 'blood_pressure', date: '2026-09-18', time: '08:00 AM', readingValue: '122/80', status: 'Normal', notes: 'Pre-breakfast, resting' },
  { id: 'log-02', type: 'blood_pressure', date: '2026-09-17', time: '08:15 AM', readingValue: '128/84', status: 'Normal', notes: 'Normal morning' },
  { id: 'log-03', type: 'blood_pressure', date: '2026-09-16', time: '07:45 AM', readingValue: '134/88', status: 'Elevated', notes: 'Mild headache' },
  { id: 'log-04', type: 'blood_pressure', date: '2026-09-15', time: '08:00 AM', readingValue: '120/78', status: 'Normal', notes: 'After brisk walk' },
  { id: 'log-05', type: 'blood_sugar', date: '2026-09-18', time: '07:30 AM', readingValue: '108', fastingOrRandom: 'Fasting', status: 'Normal', notes: 'Fasting 10 hrs' },
  { id: 'log-06', type: 'blood_sugar', date: '2026-09-18', time: '11:00 AM', readingValue: '142', fastingOrRandom: 'Post-Prandial', status: 'Normal', notes: '2 hrs post breakfast' },
  { id: 'log-07', type: 'blood_sugar', date: '2026-09-16', time: '07:45 AM', readingValue: '114', fastingOrRandom: 'Fasting', status: 'Normal', notes: 'Fasting' }
];

const DEFAULT_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-8842',
    patientName: 'Sunita Gokhale',
    doctorName: 'Dr. Neha Deshmukh, MD',
    uploadDate: '2026-09-18 10:20 AM',
    fileUrl: '/mock-rx.png',
    fileName: 'KEM_Hospital_Prescription_Sep2026.pdf',
    fileType: 'application/pdf',
    status: 'Confirmed',
    estimatedCost: 476,
    pharmacistNotes: 'Valid prescription verified. Augmentin 625 Duo (10 tabs) + Pan-40 (15 tabs). Dosage instructions stamped.',
    prescribedItems: ['Augmentin 625 Duo Tablet', 'Pan-40 Tablet']
  },
  {
    id: 'RX-8820',
    patientName: 'Anand Gokhale',
    doctorName: 'Dr. Anand Joshi, Diabetologist',
    uploadDate: '2026-08-25 04:00 PM',
    fileUrl: '/mock-rx-2.png',
    fileName: 'Diabetes_Refill_Slip_Aug2026.jpg',
    fileType: 'image/jpeg',
    status: 'Confirmed',
    estimatedCost: 890,
    pharmacistNotes: 'Quarterly chronic refill verified. Valid until Dec 2026.',
    prescribedItems: ['Glycomet-GP 2 Forte Tablet', 'Rosuvas 10 Tablet']
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentView: 'home',
      selectedProductId: null,
      selectedBlogId: null,
      selectedCategory: null,
      selectedConcern: null,
      searchQuery: '',

      language: 'en',
      theme: 'light',

      cart: [
        { product: PRODUCTS[7], quantity: 2 }, // Dolo 650
        { product: PRODUCTS[10], quantity: 1 }  // Volini Gel
      ],
      wishlist: ['med-18', 'med-19'],
      appliedCoupon: null,
      deliveryMethod: 'express',
      selectedDeliverySlot: 'Express Delivery (Within 90 Mins)',
      pincode: '411005',
      pincodeStatus: 'verified',

      isCartDrawerOpen: false,
      quickViewProduct: null,
      compareList: [],
      toasts: [],

      user: DEFAULT_USER,
      isAuthModalOpen: false,
      savedAddresses: DEFAULT_ADDRESSES,
      familyMembers: DEFAULT_FAMILY,
      reminders: DEFAULT_REMINDERS,
      healthLogs: DEFAULT_HEALTH_LOGS,
      prescriptions: DEFAULT_PRESCRIPTIONS,
      orders: INITIAL_ORDERS,
      recentOrder: null,

      isAdminLoggedIn: false,

      setView: (view, params) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        set({
          currentView: view,
          selectedProductId: params?.productId ?? (view === 'product' ? get().selectedProductId : null),
          selectedBlogId: params?.blogId ?? (view === 'blog' ? get().selectedBlogId : null),
          selectedCategory: params?.category ?? null,
          selectedConcern: params?.concern ?? null,
          searchQuery: params?.query ?? get().searchQuery
        });
      },

      setLanguage: (language) => set({ language }),

      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme: nextTheme });
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      addToCart: (product, quantity = 1, substituteId) => {
        const { cart, addToast } = get();
        const existingIndex = cart.findIndex((item) => item.product.id === product.id);

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = [...cart];
          newCart[existingIndex].quantity += quantity;
        } else {
          newCart = [...cart, { product, quantity, selectedSubstituteId: substituteId }];
        }

        set({ cart: newCart });
        addToast(`Added "${product.name}" to cart`, 'success');
      },

      removeFromCart: (productId) => {
        const { cart, addToast } = get();
        const item = cart.find((i) => i.product.id === productId);
        set({ cart: cart.filter((i) => i.product.id !== productId) });
        if (item) {
          addToast(`Removed "${item.product.name}" from cart`, 'info');
        }
      },

      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter((i) => i.product.id !== productId) });
        } else {
          set({
            cart: cart.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
          });
        }
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),

      toggleCartDrawer: (open) => {
        set((state) => ({ isCartDrawerOpen: open !== undefined ? open : !state.isCartDrawerOpen }));
      },

      applyCoupon: (code) => {
        const trimmed = code.trim().toUpperCase();
        const coupon = COUPONS.find((c) => c.code === trimmed);
        const { cart, addToast } = get();

        if (!coupon) {
          return { success: false, message: 'Invalid coupon code. Please check promo code.' };
        }

        const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (subtotal < coupon.minOrderValue) {
          return { 
            success: false, 
            message: `Minimum cart value of ₹${coupon.minOrderValue} required for ${coupon.code}.` 
          };
        }

        set({ appliedCoupon: coupon });
        addToast(`Coupon ${coupon.code} applied successfully!`, 'success');
        return { success: true, message: `Applied! ${coupon.description}` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod }),
      setDeliverySlot: (selectedDeliverySlot) => set({ selectedDeliverySlot }),

      setPincode: (pincode) => {
        const punePincodes = ['411001', '411002', '411003', '411004', '411005', '411006', '411007', '411014', '411016', '411028', '411030', '411038', '411045', '411057', '411058'];
        const isPune = punePincodes.includes(pincode.trim()) || pincode.startsWith('411');
        set({
          pincode,
          pincodeStatus: isPune ? 'verified' : 'unserviceable'
        });
      },

      toggleWishlist: (productId) => {
        const { wishlist, addToast } = get();
        const exists = wishlist.includes(productId);
        const product = PRODUCTS.find((p) => p.id === productId);

        if (exists) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
          addToast(`Removed from saved wishlist`, 'info');
        } else {
          set({ wishlist: [...wishlist, productId] });
          addToast(`Saved "${product?.name || 'item'}" to wishlist`, 'success');
        }
      },

      toggleCompare: (productId) => {
        const { compareList, addToast } = get();
        if (compareList.includes(productId)) {
          set({ compareList: compareList.filter((id) => id !== productId) });
          addToast('Removed from comparison', 'info');
        } else {
          if (compareList.length >= 3) {
            addToast('You can compare up to 3 medicines simultaneously.', 'warning');
            return;
          }
          set({ compareList: [...compareList, productId] });
          addToast('Added to comparison table', 'success');
        }
      },

      clearCompare: () => set({ compareList: [] }),

      setQuickViewProduct: (quickViewProduct) => set({ quickViewProduct }),

      addToast: (message, type = 'info') => {
        const id = 'toast-' + Math.random().toString(36).substring(2, 9);
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3600);
      },

      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },

      loginUser: (phone, otp) => {
        // Accepts 123456 as requested
        if (otp === '123456') {
          set({
            user: {
              id: 'usr-' + Date.now(),
              name: 'Dr. Pune Resident',
              phone: phone || '+91 98220 44120',
              email: 'resident.pune@gmail.com',
              loyaltyPoints: 240,
              loyaltyTier: 'Gold',
              memberSince: 'September 2026'
            },
            isAuthModalOpen: false
          });
          get().addToast('Welcome back! OTP verified successfully.', 'success');
          return true;
        }
        get().addToast('Invalid OTP. Please enter demo OTP: 123456', 'error');
        return false;
      },

      logoutUser: () => {
        set({ user: null });
        get().addToast('Logged out of customer account.', 'info');
      },

      setAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),

      updateUserProfile: (profile) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null
        }));
        get().addToast('Profile updated successfully', 'success');
      },

      addAddress: (addr) => {
        const newAddr: Address = { ...addr, id: 'addr-' + Date.now() };
        set((state) => ({ savedAddresses: [...state.savedAddresses, newAddr] }));
        get().addToast('New delivery address saved', 'success');
      },

      deleteAddress: (id) => {
        set((state) => ({ savedAddresses: state.savedAddresses.filter((a) => a.id !== id) }));
      },

      addFamilyMember: (member) => {
        const newMember: FamilyMember = { ...member, id: 'fam-' + Date.now() };
        set((state) => ({ familyMembers: [...state.familyMembers, newMember] }));
        get().addToast(`Added ${member.name} to family vault`, 'success');
      },

      deleteFamilyMember: (id) => {
        set((state) => ({ familyMembers: state.familyMembers.filter((m) => m.id !== id) }));
      },

      addReminder: (reminder) => {
        const newRem: MedicineReminder = { ...reminder, id: 'rem-' + Date.now() };
        set((state) => ({ reminders: [...state.reminders, newRem] }));
        get().addToast(`Reminder scheduled for ${reminder.medicineName}`, 'success');
      },

      toggleReminder: (id) => {
        set((state) => ({
          reminders: state.reminders.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
        }));
      },

      deleteReminder: (id) => {
        set((state) => ({ reminders: state.reminders.filter((r) => r.id !== id) }));
      },

      addHealthLog: (log) => {
        const newLog: HealthLog = { ...log, id: 'log-' + Date.now() };
        set((state) => ({ healthLogs: [newLog, ...state.healthLogs] }));
        get().addToast('Health reading recorded in logs', 'success');
      },

      deleteHealthLog: (id) => {
        set((state) => ({ healthLogs: state.healthLogs.filter((l) => l.id !== id) }));
      },

      uploadPrescription: (prescription) => {
        const id = 'RX-' + Math.floor(1000 + Math.random() * 9000);
        const newRx: Prescription = { ...prescription, id };
        set((state) => ({ prescriptions: [newRx, ...state.prescriptions] }));
        get().addToast('Prescription uploaded! Our pharmacist is now verifying it.', 'success');
        return id;
      },

      createOrder: (orderData) => {
        const { cart, appliedCoupon, deliveryMethod, addToast } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        let discount = 0;
        if (appliedCoupon) {
          if (appliedCoupon.discountPercent) {
            discount = (subtotal * appliedCoupon.discountPercent) / 100;
          } else if (appliedCoupon.flatDiscount) {
            discount = appliedCoupon.flatDiscount;
          }
        }

        const deliveryFee = deliveryMethod === 'pickup' || subtotal >= 499 ? 0 : (deliveryMethod === 'express' ? 50 : 35);
        const total = Math.max(0, subtotal - discount + deliveryFee);
        const orderId = 'SNJ-2026-' + Math.floor(8000 + Math.random() * 1999);

        const newOrder: Order = {
          id: orderId,
          date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          items: [...cart],
          subtotal,
          discount,
          deliveryFee,
          total,
          status: 'Placed',
          deliveryType: orderData.deliveryType,
          paymentMethod: orderData.paymentMethod,
          address: orderData.address,
          prescriptionAttached: !!orderData.prescriptionId,
          prescriptionId: orderData.prescriptionId,
          estimatedDelivery: deliveryMethod === 'express' ? 'Within 90 Minutes' : 'Today by 06:00 PM',
          trackingSteps: [
            { title: 'Order Placed in System', completed: true, time: 'Just now' },
            { title: 'Prescription Verification by Pharmacist', completed: !orderData.prescriptionId },
            { title: 'Packed in Temperature-Controlled Bag', completed: false },
            { title: 'Dispatched with Delivery Partner', completed: false },
            { title: 'Delivered to Doorstep', completed: false }
          ]
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          recentOrder: newOrder,
          cart: [],
          appliedCoupon: null,
          currentView: 'checkout-success'
        }));

        addToast(`Order #${orderId} placed successfully!`, 'success');
        return newOrder;
      },

      loginAdmin: (email, pass) => {
        if (email.trim() === 'admin@demo.com' && pass === 'admin123') {
          set({ isAdminLoggedIn: true });
          get().addToast('Logged in as Dispensary Chief Pharmacist', 'success');
          return true;
        }
        get().addToast('Invalid demo credentials. Use admin@demo.com / admin123', 'error');
        return false;
      },

      logoutAdmin: () => {
        set({ isAdminLoggedIn: false, currentView: 'home' });
        get().addToast('Logged out of Dispensary Admin Panel', 'info');
      },

      updateOrderStatus: (orderId: string, status: any) => {
        set((state: StoreState) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o))
        }));
        get().addToast(`Order #${orderId} marked as ${status}`, 'info');
      },

      verifyPrescription: (prescriptionId: string, status: any, quote?: number, notes?: string) => {
        set((state: StoreState) => ({
          prescriptions: state.prescriptions.map((p) =>
            p.id === prescriptionId
              ? {
                  ...p,
                  status,
                  estimatedCost: quote ?? p.estimatedCost,
                  pharmacistNotes: notes ?? p.pharmacistNotes
                }
              : p
          )
        }));
        get().addToast(`Prescription #${prescriptionId} updated to ${status}`, 'success');
      },

      updateProductStock: (productId: string, delta: number) => {
        const product = PRODUCTS.find((p) => p.id === productId);
        if (product) {
          product.stockCount = Math.max(0, product.stockCount + delta);
          product.inStock = product.stockCount > 0;
          get().addToast(`Stock for ${product.name} updated (${product.stockCount} units remaining)`, 'info');
        }
      }
    }),
    {
      name: 'sanjivani-apothecary-storage',
      partialize: (state: StoreState) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        savedAddresses: state.savedAddresses,
        familyMembers: state.familyMembers,
        reminders: state.reminders,
        healthLogs: state.healthLogs,
        prescriptions: state.prescriptions,
        orders: state.orders,
        language: state.language,
        theme: state.theme,
        pincode: state.pincode,
        isAdminLoggedIn: state.isAdminLoggedIn
      })
    }
  )
);
