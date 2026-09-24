export type DosageForm = 
  | 'tablet' 
  | 'capsule' 
  | 'syrup' 
  | 'ointment' 
  | 'injection' 
  | 'device' 
  | 'drops' 
  | 'powder'
  | 'tube'
  | 'box';

export type DrugSchedule = 'OTC' | 'Rx' | 'Schedule H';

export interface SubstituteMedicine {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  savingsPercentage: number;
  manufacturer: string;
}

export interface Product {
  id: string;
  name: string;
  genericName: string; // Active salt / composition
  brand: string;
  category: string;
  healthConcern: string;
  dosageForm: DosageForm;
  schedule: DrugSchedule;
  mrp: number;
  price: number;
  discount: number;
  inStock: boolean;
  stockCount: number;
  packSize: string;
  manufacturer: string;
  rating: number;
  reviewCount: number;
  description: string;
  uses: string[];
  howToUse: string;
  sideEffects: string[];
  precautions: string[];
  storage: string;
  storageCondition?: string;
  strength?: string;
  dosageInfo?: string;
  contraindications?: string;
  substitutes?: SubstituteMedicine[];
  featured?: boolean;
  bestSeller?: boolean;
  requiresPrescription: boolean;
  colorTone?: string;
  artType: 'strip' | 'bottle' | 'syrup' | 'tube' | 'box' | 'device';
  batchNo?: string;
  expiryDate?: string;
}

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  slug: string;
  description: string;
  itemCount: number;
  iconName: string;
  accentColor: string;
  color?: string;
  icon?: string;
  productCount?: number;
}

export interface HealthConcern {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  iconName: string;
  color: string;
  icon?: string;
  description?: string;
  categoryIds?: string[];
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  specialty: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSubstituteId?: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrderValue: number;
  description: string;
  expiry: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  locality: string;
  pincode: string;
  isDefault?: boolean;
  label: 'Home' | 'Work' | 'Parents';
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Self' | 'Spouse' | 'Father' | 'Mother' | 'Child' | 'Other' | string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | string;
  allergies?: string[];
  chronicConditions?: string[];
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string; // e.g. "1 Tablet"
  timing: ('Morning' | 'Afternoon' | 'Night')[];
  timeSpecific?: string; // e.g. "08:30 AM"
  withFood: 'Before Food' | 'After Food' | 'With Food' | 'Empty Stomach';
  forPerson: string;
  active: boolean;
  remainingDays: number;
  refillAlertCount: number; // days before
}

export interface HealthLog {
  id: string;
  type: 'blood_sugar' | 'blood_pressure';
  date: string;
  time: string;
  readingValue: string; // e.g. "120/80" or "105"
  fastingOrRandom?: 'Fasting' | 'Post-Prandial' | 'Random';
  status: 'Normal' | 'Elevated' | 'High' | 'Low';
  notes?: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorName?: string;
  uploadDate: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  status: 'Received' | 'Verifying' | 'Quote Ready' | 'Confirmed' | 'Rejected' | 'Pending Review' | string;
  estimatedCost?: number;
  pharmacistNotes?: string;
  prescribedItems?: string[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'Placed' | 'Verified' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Order Placed' | 'Verified by Pharmacist' | 'Dispatched' | string;
  deliveryType: 'Express (90 Mins)' | 'Standard Delivery' | 'Store Pickup' | string;
  paymentMethod: 'UPI' | 'Card' | 'COD' | 'Netbanking' | 'Pay at Store' | string;
  address: Address;
  prescriptionAttached?: boolean;
  prescriptionId?: string;
  estimatedDelivery: string;
  trackingSteps: {
    title: string;
    completed: boolean;
    time?: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string | string[];
  tags: string[];
}

export interface Review {
  id: string;
  reviewer: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface LabPackage {
  id: string;
  title: string;
  testsCount: number;
  reportTurnaround: string;
  mrp: number;
  price: number;
  discount: number;
  fastingRequired: boolean;
  description: string;
  testsIncluded: string[];
  popularFor: string;
  parameterCount?: number;
  reportTime?: string;
  sampleType?: string;
  tests?: string[];
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  qualification: string;
  consultationFee: number;
  rating: number;
  availableDays: string[];
  nextSlot: string;
  hospital?: string;
  experience?: number;
  languages?: string[];
  reviewCount?: number;
}

export type Doctor = DoctorProfile;

export type Language = 'en' | 'hi' | 'mr';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
  memberSince: string;
}
