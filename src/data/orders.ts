import { Order } from '../types';
import { PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SNJ-2026-8942',
    date: '2026-09-18 10:30 AM',
    items: [
      { product: PRODUCTS[0], quantity: 2 }, // Augmentin
      { product: PRODUCTS[4], quantity: 1 }  // Pan 40
    ],
    subtotal: 526.16,
    discount: 50.00,
    deliveryFee: 0,
    total: 476.16,
    status: 'Out for Delivery',
    deliveryType: 'Express (90 Mins)',
    paymentMethod: 'UPI',
    prescriptionAttached: true,
    prescriptionId: 'RX-8842',
    estimatedDelivery: 'Today by 12:45 PM',
    address: {
      id: 'addr-01',
      fullName: 'Sunita Gokhale',
      phone: '+91 98220 44120',
      streetAddress: 'B-402, Shanti Heights, Near Deep Bungalow Chowk',
      locality: 'Model Colony, Shivajinagar',
      pincode: '411016',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true, time: '10:30 AM' },
      { title: 'Prescription Verified by Pharm. Rajesh', completed: true, time: '10:45 AM' },
      { title: 'Packed & Barcoded in Dispensary', completed: true, time: '11:15 AM' },
      { title: 'Dispatched with Express Delivery Partner (Ramesh K.)', completed: true, time: '11:40 AM' },
      { title: 'Delivered to Doorstep', completed: false }
    ]
  },
  {
    id: 'SNJ-2026-8935',
    date: '2026-09-17 04:15 PM',
    items: [
      { product: PRODUCTS[7], quantity: 3 }, // Dolo 650
      { product: PRODUCTS[10], quantity: 1 } // Volini
    ],
    subtotal: 227.50,
    discount: 22.75,
    deliveryFee: 40,
    total: 244.75,
    status: 'Delivered',
    deliveryType: 'Standard Delivery',
    paymentMethod: 'COD',
    prescriptionAttached: false,
    estimatedDelivery: 'Delivered yesterday',
    address: {
      id: 'addr-02',
      fullName: 'Amol Shinde',
      phone: '+91 94220 18833',
      streetAddress: 'Flat 12, Blue Ridge Tower 8',
      locality: 'Hinjewadi Phase 1',
      pincode: '411057',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true, time: '04:15 PM' },
      { title: 'Verified by Pharmacist', completed: true, time: '04:25 PM' },
      { title: 'Packed', completed: true, time: '04:45 PM' },
      { title: 'Out for Delivery', completed: true, time: '05:30 PM' },
      { title: 'Delivered to Doorstep', completed: true, time: '06:50 PM' }
    ]
  },
  {
    id: 'SNJ-2026-8921',
    date: '2026-09-16 09:00 AM',
    items: [
      { product: PRODUCTS[18], quantity: 1 }, // Omron BP Monitor
      { product: PRODUCTS[16], quantity: 2 }  // Shelcal 500
    ],
    subtotal: 2245.50,
    discount: 200.00,
    deliveryFee: 0,
    total: 2045.50,
    status: 'Delivered',
    deliveryType: 'Standard Delivery',
    paymentMethod: 'Card',
    prescriptionAttached: false,
    estimatedDelivery: 'Delivered on Sep 16',
    address: {
      id: 'addr-03',
      fullName: 'Vikas Bapat',
      phone: '+91 98810 55220',
      streetAddress: 'Plot 18, Mayur Colony, Near Joggers Park',
      locality: 'Kothrud',
      pincode: '411038',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true },
      { title: 'Verified by Pharmacist', completed: true },
      { title: 'Device Pre-Calibrated & Packed', completed: true },
      { title: 'Dispatched', completed: true },
      { title: 'Delivered & Handed Over', completed: true }
    ]
  },
  {
    id: 'SNJ-2026-8948',
    date: '2026-09-19 01:15 AM',
    items: [
      { product: PRODUCTS[1], quantity: 2 }, // Telma 40
      { product: PRODUCTS[2], quantity: 2 }, // Glycomet-GP 2
      { product: PRODUCTS[3], quantity: 1 }  // Rosuvas 10
    ],
    subtotal: 1162.80,
    discount: 116.28,
    deliveryFee: 0,
    total: 1046.52,
    status: 'Verified',
    deliveryType: 'Express (90 Mins)',
    paymentMethod: 'UPI',
    prescriptionAttached: true,
    prescriptionId: 'RX-8848',
    estimatedDelivery: 'Morning Slot: 08:30 AM',
    address: {
      id: 'addr-04',
      fullName: 'Priya Nambiar',
      phone: '+91 97654 22001',
      streetAddress: 'Villa 14, Hermes Heritage, Phase 2',
      locality: 'Kalyani Nagar',
      pincode: '411006',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true, time: '01:15 AM' },
      { title: 'Prescription Verified by Duty Chemist', completed: true, time: '01:30 AM' },
      { title: 'Awaiting Packing at 07:30 AM shift', completed: false },
      { title: 'Out for Delivery', completed: false },
      { title: 'Delivered', completed: false }
    ]
  },
  {
    id: 'SNJ-2026-8950',
    date: '2026-09-19 02:00 AM',
    items: [
      { product: PRODUCTS[12], quantity: 1 }, // Dabur Chyawanprash
      { product: PRODUCTS[33], quantity: 2 }  // Limcee Vitamin C
    ],
    subtotal: 394.00,
    discount: 39.40,
    deliveryFee: 40,
    total: 394.60,
    status: 'Placed',
    deliveryType: 'Standard Delivery',
    paymentMethod: 'UPI',
    prescriptionAttached: false,
    estimatedDelivery: 'Today by 02:00 PM',
    address: {
      id: 'addr-05',
      fullName: 'Girish Korde',
      phone: '+91 98230 77112',
      streetAddress: 'Row House 4, Panache Society, Baner Road',
      locality: 'Baner',
      pincode: '411045',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true, time: '02:00 AM' },
      { title: 'Awaiting Verification', completed: false },
      { title: 'Packing', completed: false },
      { title: 'Out for Delivery', completed: false },
      { title: 'Delivered', completed: false }
    ]
  },
  {
    id: 'SNJ-2026-8910',
    date: '2026-09-15 11:20 AM',
    items: [
      { product: PRODUCTS[19], quantity: 1 }, // Accu-Chek Meter
      { product: PRODUCTS[20], quantity: 1 }  // Accu-Chek 50 Strips
    ],
    subtotal: 2348.00,
    discount: 234.80,
    deliveryFee: 0,
    total: 2113.20,
    status: 'Delivered',
    deliveryType: 'Express (90 Mins)',
    paymentMethod: 'UPI',
    prescriptionAttached: false,
    estimatedDelivery: 'Delivered on Sep 15',
    address: {
      id: 'addr-06',
      fullName: 'Shobha Chitale',
      phone: '+91 94225 33010',
      streetAddress: '312, Chitale Bandhu Wada, Laxmi Road',
      locality: 'Sadashiv Peth',
      pincode: '411030',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true },
      { title: 'Verified by Pharmacist', completed: true },
      { title: 'Packed in Temperature-Controlled Bag', completed: true },
      { title: 'Out for Delivery', completed: true },
      { title: 'Delivered', completed: true }
    ]
  },
  {
    id: 'SNJ-2026-8899',
    date: '2026-09-14 06:10 PM',
    items: [
      { product: PRODUCTS[22], quantity: 1 }, // Cetaphil Cleanser
      { product: PRODUCTS[23], quantity: 1 }  // Sebamed Care Gel
    ],
    subtotal: 743.60,
    discount: 74.36,
    deliveryFee: 0,
    total: 669.24,
    status: 'Delivered',
    deliveryType: 'Store Pickup',
    paymentMethod: 'Pay at Store',
    prescriptionAttached: false,
    estimatedDelivery: 'Picked up from FC Road Store',
    address: {
      id: 'addr-07',
      fullName: 'Meera Chordia',
      phone: '+91 98900 66432',
      streetAddress: 'Shop 4-5, Heritage Arcade, FC Road (In-Store Pickup)',
      locality: 'Shivajinagar',
      pincode: '411005',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed for Store Pickup', completed: true },
      { title: 'Items Kept Ready at Counter #2', completed: true },
      { title: 'Customer Picked Up & Paid', completed: true }
    ]
  },
  {
    id: 'SNJ-2026-8945',
    date: '2026-09-18 07:45 PM',
    items: [
      { product: PRODUCTS[6], quantity: 1 }, // Thyronorm
      { product: PRODUCTS[15], quantity: 1 } // Becadexamin
    ],
    subtotal: 229.50,
    discount: 22.95,
    deliveryFee: 40,
    total: 246.55,
    status: 'Packed',
    deliveryType: 'Standard Delivery',
    paymentMethod: 'COD',
    prescriptionAttached: true,
    prescriptionId: 'RX-8845',
    estimatedDelivery: 'Today by 11:30 AM',
    address: {
      id: 'addr-08',
      fullName: 'Aniket Deshmukh',
      phone: '+91 97300 44551',
      streetAddress: 'Flat 502, Rohan Tarang, Wakad Link Road',
      locality: 'Wakad',
      pincode: '411057',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true },
      { title: 'Prescription Verified', completed: true },
      { title: 'Packed & Sealed with Pharmacist Stamp', completed: true },
      { title: 'Awaiting Courier Partner', completed: false },
      { title: 'Delivered', completed: false }
    ]
  },
  {
    id: 'SNJ-2026-8875',
    date: '2026-09-12 03:20 PM',
    items: [
      { product: PRODUCTS[37], quantity: 2 } // Friends Adult Diapers
    ],
    subtotal: 1040.00,
    discount: 104.00,
    deliveryFee: 0,
    total: 936.00,
    status: 'Delivered',
    deliveryType: 'Express (90 Mins)',
    paymentMethod: 'UPI',
    prescriptionAttached: false,
    estimatedDelivery: 'Delivered on Sep 12',
    address: {
      id: 'addr-09',
      fullName: 'Rupali Gadgil',
      phone: '+91 98224 88910',
      streetAddress: 'Bungalow 7, Patwardhan Baug',
      locality: 'Erandwane',
      pincode: '411004',
      label: 'Parents'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true },
      { title: 'Dispatched in discreet tamper-evident carton', completed: true },
      { title: 'Delivered', completed: true }
    ]
  },
  {
    id: 'SNJ-2026-8860',
    date: '2026-09-10 11:00 AM',
    items: [
      { product: PRODUCTS[5], quantity: 1 } // Montair-LC
    ],
    subtotal: 284.75,
    discount: 0,
    deliveryFee: 40,
    total: 324.75,
    status: 'Cancelled',
    deliveryType: 'Standard Delivery',
    paymentMethod: 'COD',
    prescriptionAttached: false,
    estimatedDelivery: 'Cancelled (Prescription not provided for Rx drug)',
    address: {
      id: 'addr-10',
      fullName: 'Rohan Joshi',
      phone: '+91 98811 00293',
      streetAddress: 'Flat 101, Parihar Chowk',
      locality: 'Aundh',
      pincode: '411007',
      label: 'Home'
    },
    trackingSteps: [
      { title: 'Order Placed', completed: true },
      { title: 'Prescription Verification Failed (Missing Rx)', completed: true },
      { title: 'Order Cancelled under Drug Compliance Rules', completed: true }
    ]
  }
];
