import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'FIRSTMED20',
    discountPercent: 20,
    minOrderValue: 299,
    description: 'Flat 20% OFF on your very first medicines order with Sanjivani',
    expiry: '2026-12-31'
  },
  {
    code: 'SANJIVANI10',
    discountPercent: 10,
    minOrderValue: 499,
    description: 'Save 10% on monthly prescription refills and healthcare products',
    expiry: '2026-12-31'
  },
  {
    code: 'WELLNESS50',
    flatDiscount: 50,
    minOrderValue: 399,
    description: 'Flat ₹50 instant cashback on vitamins, ayurveda, and personal care',
    expiry: '2026-11-30'
  },
  {
    code: 'PUNEEXPRESS',
    flatDiscount: 40,
    minOrderValue: 199,
    description: 'Free express 90-minute delivery waiver across Pune city limits',
    expiry: '2026-12-31'
  },
  {
    code: 'SENIORCARE15',
    discountPercent: 15,
    minOrderValue: 699,
    description: 'Special 15% discount for senior citizen cardiac & diabetic care',
    expiry: '2026-12-31'
  },
  {
    code: 'AYURVEDA10',
    discountPercent: 10,
    minOrderValue: 350,
    description: 'Extra 10% OFF on authentic Baidyanath, Dabur & Himalaya wellness',
    expiry: '2026-12-31'
  },
  {
    code: 'DIABETESCARE',
    discountPercent: 12,
    minOrderValue: 800,
    description: 'Save 12% on blood glucose strips, monitors, and diabetic nutrition',
    expiry: '2026-12-31'
  },
  {
    code: 'SUPERHEALTH',
    flatDiscount: 100,
    minOrderValue: 1200,
    description: 'Mega ₹100 savings on family healthcare baskets above ₹1200',
    expiry: '2026-10-31'
  }
];
