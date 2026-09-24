import { Category, HealthConcern } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-rx',
    name: 'Prescription Medicines',
    nameHi: 'प्रिस्क्रिप्शन दवाएं',
    nameMr: 'प्रिस्क्रिप्शन औषधे',
    slug: 'prescription-medicines',
    description: 'Genuine branded & generic prescription medications verified by registered pharmacists',
    itemCount: 24,
    iconName: 'Pill',
    accentColor: '#0B5D57'
  },
  {
    id: 'cat-otc',
    name: 'OTC & First Aid',
    nameHi: 'ओटीसी और प्राथमिक चिकित्सा',
    nameMr: 'ओटीसी आणि प्रथमोपचार',
    slug: 'otc-first-aid',
    description: 'Over-the-counter essentials, band-aids, antiseptics, pain sprays, and fever relief',
    itemCount: 18,
    iconName: 'ShieldPlus',
    accentColor: '#10B981'
  },
  {
    id: 'cat-ayurveda',
    name: 'Ayurvedic & Herbal',
    nameHi: 'आयुर्वेदिक और हर्बल',
    nameMr: 'आयुर्वेदिक आणि हर्बल',
    slug: 'ayurvedic-herbal',
    description: 'Traditional time-tested herbs, churna, immunity churnas, and herbal tonics',
    itemCount: 14,
    iconName: 'Leaf',
    accentColor: '#4D7C0F'
  },
  {
    id: 'cat-vitamins',
    name: 'Vitamins & Supplements',
    nameHi: 'विटामिन और सप्लीमेंट्स',
    nameMr: 'जीवनसत्त्वे आणि पूरक',
    slug: 'vitamins-supplements',
    description: 'Daily multivitamins, Calcium, Vitamin D3, Omega-3 fish oil, and iron tablets',
    itemCount: 16,
    iconName: 'Sparkles',
    accentColor: '#D97706'
  },
  {
    id: 'cat-diabetes',
    name: 'Diabetes Care',
    nameHi: 'मधुमेह देखभाल',
    nameMr: 'मधुमेह काळजी',
    slug: 'diabetes-care',
    description: 'Blood sugar test strips, lancets, diabetic nutrition powders, and anti-glycemic aids',
    itemCount: 12,
    iconName: 'Activity',
    accentColor: '#0284C7'
  },
  {
    id: 'cat-cardiac',
    name: 'Cardiac & Blood Pressure',
    nameHi: 'हृदय और रक्तचाप',
    nameMr: 'हृदय आणि रक्तदाब',
    slug: 'cardiac-hypertension',
    description: 'Blood pressure medications, cholesterol regulators, and heart health supplements',
    itemCount: 10,
    iconName: 'Heart',
    accentColor: '#E11D48'
  },
  {
    id: 'cat-women',
    name: "Women's Wellness",
    nameHi: 'महिला स्वास्थ्य',
    nameMr: 'महिलांचे आरोग्य',
    slug: 'womens-wellness',
    description: 'Maternal health, prenatal iron, sanitary care, PCOS nutritional care, and intimate hygiene',
    itemCount: 11,
    iconName: 'Smile',
    accentColor: '#DB2777'
  },
  {
    id: 'cat-baby',
    name: 'Baby & Mom',
    nameHi: 'शिशु और माँ',
    nameMr: 'बाळ आणि आई',
    slug: 'baby-mom',
    description: 'Infant formula, gentle lotions, diaper rash balms, and breast milk storage care',
    itemCount: 9,
    iconName: 'HeartHandshake',
    accentColor: '#8B5CF6'
  },
  {
    id: 'cat-skin',
    name: 'Skin & Hair Care',
    nameHi: 'त्वचा और बालों की देखभाल',
    nameMr: 'त्वचा आणि केसांची काळजी',
    slug: 'skin-hair-care',
    description: 'Dermatologist-recommended moisturizers, sunscreens, anti-fungal cremes, and hair serums',
    itemCount: 15,
    iconName: 'Droplet',
    accentColor: '#059669'
  },
  {
    id: 'cat-digestive',
    name: 'Digestive Health',
    nameHi: 'पाचन स्वास्थ्य',
    nameMr: 'पचन आरोग्य',
    slug: 'digestive-health',
    description: 'Antacids, probiotic sachets, laxatives, and digestion syrups',
    itemCount: 12,
    iconName: 'Flame',
    accentColor: '#EA580C'
  },
  {
    id: 'cat-ortho',
    name: 'Pain Relief & Ortho',
    nameHi: 'दर्द निवारण और ऑर्थो',
    nameMr: 'वेदनामुक्ती आणि ऑर्थो',
    slug: 'pain-relief-ortho',
    description: 'Hot/cold gel packs, knee braces, pain relief ointments, and lumbar supports',
    itemCount: 11,
    iconName: 'Footprints',
    accentColor: '#6366F1'
  },
  {
    id: 'cat-devices',
    name: 'Medical Devices & Monitors',
    nameHi: 'चिकित्सा उपकरण',
    nameMr: 'वैद्यकीय उपकरणे',
    slug: 'medical-devices',
    description: 'Digital BP monitors, fingertip pulse oximeters, nebulizers, and infrared thermometers',
    itemCount: 8,
    iconName: 'Cpu',
    accentColor: '#0891B2'
  },
  {
    id: 'cat-elderly',
    name: 'Elderly & Mobility Care',
    nameHi: 'वरिष्ठ नागरिक देखभाल',
    nameMr: 'ज्येष्ठ नागरिक काळजी',
    slug: 'elderly-care',
    description: 'Adult pull-ups, walking sticks, pill organizers, and anti-slip bathroom mats',
    itemCount: 7,
    iconName: 'UserCheck',
    accentColor: '#64748B'
  },
  {
    id: 'cat-immunity',
    name: 'Immunity & Wellness',
    nameHi: 'रोग प्रतिरोधक क्षमता',
    nameMr: 'रोगप्रतिकार शक्ती',
    slug: 'immunity-wellness',
    description: 'Effervescent Vitamin C, Giloy tablets, zinc drops, and green tea herbal blends',
    itemCount: 14,
    iconName: 'Sun',
    accentColor: '#16A34A'
  }
];

export const HEALTH_CONCERNS: HealthConcern[] = [
  { id: 'cold-flu', name: 'Cold & Flu', nameHi: 'सर्दी और खांसी', nameMr: 'सर्दी आणि खोकला', iconName: 'Thermometer', color: '#0284C7' },
  { id: 'diabetes', name: 'Diabetes', nameHi: 'मधुमेह', nameMr: 'मधुमेह', iconName: 'Activity', color: '#0D9488' },
  { id: 'bp-heart', name: 'BP & Heart', nameHi: 'बीपी और हृदय', nameMr: 'बीपी आणि हृदय', iconName: 'Heart', color: '#E11D48' },
  { id: 'bones-joints', name: 'Bones & Joints', nameHi: 'हड्डियां और जोड़', nameMr: 'हाडे आणि सांधे', iconName: 'Bone', color: '#D97706' },
  { id: 'skin-hair', name: 'Skin & Hair', nameHi: 'त्वचा और बाल', nameMr: 'त्वचा आणि केस', iconName: 'Sparkles', color: '#DB2777' },
  { id: 'digestion', name: 'Digestion', nameHi: 'पाचन', nameMr: 'पचन', iconName: 'RefreshCw', color: '#EA580C' },
  { id: 'women-health', name: "Women's Health", nameHi: 'महिला स्वास्थ्य', nameMr: 'महिलांचे आरोग्य', iconName: 'Smile', color: '#8B5CF6' },
  { id: 'baby-mom', name: 'Baby & Mom', nameHi: 'शिशु और माँ', nameMr: 'बाळ आणि आई', iconName: 'HeartHandshake', color: '#059669' },
  { id: 'elderly-care', name: 'Elderly Care', nameHi: 'बुजुर्गों की देखभाल', nameMr: 'ज्येष्ठ नागरिक', iconName: 'Shield', color: '#475569' },
];
