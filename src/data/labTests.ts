import { LabPackage } from '../types';

export const LAB_PACKAGES: LabPackage[] = [
  {
    id: 'lab-01',
    title: 'Comprehensive Platinum Full Body Health Check',
    testsCount: 88,
    reportTurnaround: 'Within 24 Hours',
    mrp: 3999,
    price: 1599,
    discount: 60,
    fastingRequired: true,
    description: 'Our most comprehensive diagnostic screening covering heart, liver, kidneys, thyroid, diabetes, complete hemogram, vitamins, and bone profile.',
    testsIncluded: [
      'Complete Blood Count (CBC - 24 Parameters)',
      'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Liver Function Test (SGOT, SGPT, Bilirubin, Protein)',
      'Kidney Function Test (Creatinine, Urea, Uric Acid)',
      'HbA1c (Glycated Hemoglobin) & Fasting Blood Sugar',
      'Thyroid Profile Total (T3, T4, TSH)',
      'Vitamin D3 (25-Hydroxy) & Vitamin B12',
      'Calcium, Phosphorus & Electrolytes'
    ],
    popularFor: 'Annual health checkup for adults aged 30+'
  },
  {
    id: 'lab-02',
    title: 'Senior Citizen Cardiac & Vitality Screening',
    testsCount: 65,
    reportTurnaround: 'Same Day (12 Hours)',
    mrp: 2899,
    price: 1299,
    discount: 55,
    fastingRequired: true,
    description: 'Designed by expert cardiologists and geriatricians to screen arterial inflammation, cardiac biomarkers, kidney filtration rate, and blood sugar.',
    testsIncluded: [
      'Lipid Profile Comprehensive',
      'High-Sensitivity C-Reactive Protein (hs-CRP)',
      'Kidney Function with eGFR',
      'Serum Electrolytes (Sodium, Potassium, Chloride)',
      'Complete Hemogram & ESR',
      'Fasting Blood Glucose & Urine Microalbumin'
    ],
    popularFor: 'Seniors with hypertension, high cholesterol, or family heart history'
  },
  {
    id: 'lab-03',
    title: 'Advanced Diabetes & Glycemic Control Panel',
    testsCount: 42,
    reportTurnaround: 'Within 6 Hours',
    mrp: 1499,
    price: 699,
    discount: 53,
    fastingRequired: true,
    description: 'Essential quarterly monitoring profile for diabetic patients to evaluate glycemic control, kidney safety, and microvascular indicators.',
    testsIncluded: [
      'HbA1c with Estimated Average Glucose (eAG)',
      'Fasting & Post-Prandial Blood Sugar (Dual)',
      'Serum Creatinine & Urine Routine Microscopy',
      'Total Cholesterol & Triglycerides',
      'Urine Albumin / Creatinine Ratio (ACR)'
    ],
    popularFor: 'Quarterly review for Type 1 and Type 2 diabetes patients'
  },
  {
    id: 'lab-04',
    title: 'Women’s Hormonal Balance & Thyroid Profile',
    testsCount: 38,
    reportTurnaround: 'Within 24 Hours',
    mrp: 2200,
    price: 999,
    discount: 54,
    fastingRequired: true,
    description: 'Specialized profile for women evaluating thyroid, iron stores, hormonal markers, and reproductive well-being.',
    testsIncluded: [
      'Ultrasensitive TSH, Free T3 & Free T4',
      'Serum Ferritin, Iron & Total Iron Binding Capacity',
      'Vitamin B12 & 25-OH Vitamin D',
      'Complete Blood Count with Platelets & Hemoglobin',
      'Calcium & Alkaline Phosphatase'
    ],
    popularFor: 'Fatigue, unexplained weight changes, hair fall, PCOS, or thyroid concerns'
  }
];
