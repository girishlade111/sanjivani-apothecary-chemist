import { DoctorProfile } from '../types';

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-01',
    name: 'Dr. Anand Joshi',
    specialty: 'Senior Diabetologist & Endocrinologist',
    experienceYears: 18,
    qualification: 'MBBS, MD (General Medicine), Fellowship in Diabetology (CMC Vellore)',
    consultationFee: 500,
    rating: 4.9,
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    nextSlot: 'Today, 04:30 PM'
  },
  {
    id: 'doc-02',
    name: 'Dr. Neha Deshmukh',
    specialty: 'Consultant Physician & Family Medicine',
    experienceYears: 14,
    qualification: 'MBBS, DNB (Internal Medicine), MNAMS',
    consultationFee: 400,
    rating: 4.9,
    availableDays: ['Daily (Mon-Sat)'],
    nextSlot: 'Today, 02:00 PM'
  },
  {
    id: 'doc-03',
    name: 'Dr. Anjali Kelkar',
    specialty: 'Consultant Pediatrician & Neonatologist',
    experienceYears: 16,
    qualification: 'MBBS, MD (Pediatrics), DCH (Mumbai)',
    consultationFee: 450,
    rating: 4.8,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    nextSlot: 'Tomorrow, 10:30 AM'
  },
  {
    id: 'doc-04',
    name: 'Dr. Sameer Patil',
    specialty: 'Consultant Dermatologist & Cosmetologist',
    experienceYears: 12,
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    consultationFee: 500,
    rating: 4.8,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    nextSlot: 'Today, 06:15 PM'
  },
  {
    id: 'doc-05',
    name: 'Vaidya Shrikant Joshi',
    specialty: 'Chief Ayurvedic Physician (Nadi Pariksha)',
    experienceYears: 22,
    qualification: 'BAMS, MD (Ayurveda), Traditional Nadi Parikshak',
    consultationFee: 350,
    rating: 4.9,
    availableDays: ['Daily (Mon-Sun)'],
    nextSlot: 'Today, 11:30 AM'
  }
];
