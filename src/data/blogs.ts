import { BlogPost } from '../types';

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'Understanding Branded vs Generic Medicines: Safety, Quality, and Savings in India',
    category: 'Pharmacy Insights',
    readTime: '5 min read',
    date: 'Sep 12, 2026',
    author: 'Pharm. Rajesh Kulkarni (Chief Pharmacist)',
    summary: 'A registered pharmacist explains how bioequivalent generics have the exact same therapeutic potency as expensive brands, helping Pune families save up to 60% on prescriptions.',
    content: [
      'In India, the majority of prescription medications are sold under brand names, but their therapeutic power comes entirely from the active pharmaceutical ingredient (API) or "salt".',
      'Under the Indian Pharmacopoeia and CDSCO regulations, generic formulations must pass rigorous bioequivalence and dissolution testing to prove they deliver the same blood concentration at the same speed as innovator drugs.',
      'Always ask your pharmacist if a certified substitute is available for chronic maintenance drugs like Telmisartan, Metformin, or Pantoprazole.'
    ],
    tags: ['Generics', 'Savings', 'Indian Pharma', 'Prescriptions']
  },
  {
    id: 'blog-02',
    title: 'Managing Seasonal Dengue & Viral Flu: Why Self-Medicating with Painkillers Can Be Dangerous',
    category: 'Clinical Safety',
    readTime: '6 min read',
    date: 'Sep 05, 2026',
    author: 'Dr. Neha Deshmukh, MD (Internal Medicine)',
    summary: 'Why taking ibuprofen, diclofenac, or aspirin during an unconfirmed fever spike can crash platelet counts, and why paracetamol remains the only safe first-line choice.',
    content: [
      'During monsoon and post-monsoon months in Maharashtra, viral infections surge. Patients frequently make the dangerous mistake of taking strong NSAID painkillers.',
      'NSAIDs inhibit platelet cyclooxygenase. If the underlying fever is Dengue, these medications significantly increase bleeding risks and internal hemorrhages.',
      'Stick strictly to Paracetamol (650mg) under medical dosage guidance, hydrate with WHO-standard ORS, and request a complete blood count (CBC) if fever persists past 48 hours.'
    ],
    tags: ['Dengue', 'Fever', 'Medicine Safety', 'Monsoon Health']
  },
  {
    id: 'blog-03',
    title: 'The Modern Guide to Vitamin D3: Why 80% of Urban Indians are Deficient',
    category: 'Vitamins & Wellness',
    readTime: '4 min read',
    date: 'Aug 28, 2026',
    author: 'Pharm. Smita Patil (Clinical Nutritionist)',
    summary: 'How sunscreen, indoor desk jobs, and melanin levels block sunlight synthesis, leading to silent bone depletion, lethargy, and compromised immunity.',
    content: [
      'Despite abundant tropical sunshine, urban Indians suffer from widespread Vitamin D3 (Cholecalciferol) deficiency due to melanin absorption and lifestyle factors.',
      'Low levels correlate with poor calcium uptake, lower back ache, morning joint stiffness, and chronic daytime lethargy.',
      'A simple 25-OH Vitamin D blood test can determine whether a weekly 60,000 IU softgel course or daily dietary maintenance is right for you.'
    ],
    tags: ['Vitamin D3', 'Bone Health', 'Immunity', 'Fatigue']
  },
  {
    id: 'blog-04',
    title: 'How to Correctly Measure Blood Pressure at Home with a Digital Upper-Arm Monitor',
    category: 'Medical Devices',
    readTime: '4 min read',
    date: 'Aug 20, 2026',
    author: 'Pharm. Rajesh Kulkarni (Chief Pharmacist)',
    summary: 'Avoid the "white-coat syndrome" and false spikes with our 5-minute pre-test protocol, arm position rules, and cuff placement guidelines.',
    content: [
      'Home blood pressure monitors like Omron upper-arm units provide doctors with far more reliable circadian data than a single clinic reading.',
      'Key golden rules: rest quietly for 5 minutes before pressing start; keep your feet flat on the floor; position the cuff at the level of your heart; never talk or move during cuff deflation.',
      'Log both morning (pre-medication) and evening readings for a full week before your cardiology follow-up.'
    ],
    tags: ['Hypertension', 'BP Monitor', 'Heart Health', 'Home Diagnostics']
  },
  {
    id: 'blog-05',
    title: 'Continuous Glucose Monitoring vs Fingerprick: Choosing the Right Tracker for Type 2 Diabetes',
    category: 'Diabetes Care',
    readTime: '6 min read',
    date: 'Aug 14, 2026',
    author: 'Dr. Anand Joshi, Diabetologist',
    summary: 'Evaluating traditional biosensor strips like Accu-Chek against 14-day wearable sensor patches for tracking Time-in-Range (TIR).',
    content: [
      'For decades, lancing devices and enzyme test strips have been the cornerstone of diabetic self-management in India.',
      'Wearable sensor patches now measure interstitial glucose continuously, alerting patients to overnight hypoglycemia and post-dinner spikes from carb-heavy foods.',
      'For cost-effective routine monitoring, twice-weekly fasting and 2-hour post-prandial finger-prick logs remain exceptionally dependable when paired with HbA1c every 90 days.'
    ],
    tags: ['Diabetes', 'Glucometer', 'HbA1c', 'Sugar Control']
  },
  {
    id: 'blog-06',
    title: 'Ayurvedic Rasayanas: Integrating Ashwagandha, Giloy, and Amla into Daily Routine',
    category: 'Ayurveda',
    readTime: '5 min read',
    date: 'Aug 02, 2026',
    author: 'Vaidya Shrikant Joshi (BAMS, Ayurveda Consultant)',
    summary: 'Evidence-based adaptogenic science behind classical Indian herbs for reducing workplace cortisol and supporting restorative sleep.',
    content: [
      'Ayurveda categorizes rejuvenating tonics as Rasayanas—formulations that slow cellular degeneration and balance the Tridoshas.',
      'Standardized Withania somnifera (Ashwagandha) extracts have been shown in double-blind clinical trials to lower serum cortisol by up to 27%.',
      'Giloy (Guduchi) acts as an immunomodulator, while Amla provides rich bioavailable ascorbic acid that supports endothelial micro-vessels.'
    ],
    tags: ['Ayurveda', 'Ashwagandha', 'Stress Relief', 'Herbal Medicine']
  },
  {
    id: 'blog-07',
    title: 'Safe Storage of Household Medications: Why the Bathroom Cabinet is the Worst Place',
    category: 'Pharmacy Insights',
    readTime: '3 min read',
    date: 'Jul 24, 2026',
    author: 'Pharm. Rajesh Kulkarni',
    summary: 'Humidity and steam rapidly degrade effervescent tablets, capsules, and antibiotics. Here is where your family first aid kit should actually live.',
    content: [
      'Despite television tropes, the humid, steamy atmosphere of a bathroom causes moisture penetration into foil blisters and gelatin capsules.',
      'Store oral medications in a cool, dry bedroom closet or dark drawer out of reach of curious children, ideally below 25°C.',
      'Insulin vials and certain antibiotic suspensions require 2°C to 8°C in the middle refrigerator shelf—never on the freezer door where frost forms.'
    ],
    tags: ['Medicine Storage', 'First Aid', 'Home Safety']
  },
  {
    id: 'blog-08',
    title: 'Essential Vaccines for Adults over 50 in India: Pneumococcal, Shingles, and Flu',
    category: 'Preventive Health',
    readTime: '5 min read',
    date: 'Jul 15, 2026',
    author: 'Dr. Neha Deshmukh, MD',
    summary: 'Immunizations are not just for children. Why seniors with hypertension or diabetes should protect against pneumococcal pneumonia and herpes zoster.',
    content: [
      'Adult immunization remains heavily overlooked in Indian healthcare planning. As the immune system undergoes immunosenescence, susceptibility to bacterial pneumonia increases five-fold.',
      'The conjugate pneumococcal vaccine and annual quadrivalent influenza shot substantially reduce hospitalization rates among cardiac and diabetic seniors.',
      'Consult our dispensary pharmacist to schedule convenient home-administered vaccinations with proper cold-chain certification.'
    ],
    tags: ['Vaccines', 'Senior Health', 'Preventive Care']
  },
  {
    id: 'blog-09',
    title: 'Managing GERD & Acidity Without Overusing PPI Tablets',
    category: 'Digestive Health',
    readTime: '4 min read',
    date: 'Jul 04, 2026',
    author: 'Dr. Anand Joshi',
    summary: 'How timing your dinner, sleeping with a 6-inch torso elevation, and moderating caffeine can reduce dependence on long-term antacids.',
    content: [
      'Proton pump inhibitors like Pantoprazole and Omeprazole provide swift relief from burning acid reflux, but chronic uninterrupted use beyond months can impair magnesium and B12 absorption.',
      'Simple behavioral modifications—finishing dinner at least 3 hours before sleep, avoiding late-night fried savory snacks, and elevating your head with an inclined wedge—resolve up to 70% of nocturnal reflux.',
      'Always seek medical advice if you experience difficulty swallowing or sudden unexplained weight loss.'
    ],
    tags: ['Acidity', 'GERD', 'Digestion', 'Lifestyle']
  },
  {
    id: 'blog-10',
    title: 'First-Aid Kit Checklist for Every Indian Home: Essentials for Cuts, Burns, and Fevers',
    category: 'First Aid',
    readTime: '4 min read',
    date: 'Jun 22, 2026',
    author: 'Pharm. Smita Patil',
    summary: 'A pharmacist-curated inventory of sterile bandages, antiseptic lotions, burn gels, digital thermometers, and oral rehydration salts.',
    content: [
      'A well-stocked home medicine kit turns sudden kitchen accidents or midnight pediatric fevers into manageable events rather than panic.',
      'Key components: Paracetamol 650mg & paediatric syrup, WHO-ORS sachets, Povidone Iodine 10% solution, Silver Sulfadiazine burn ointment, sterile gauze rolls, adhesive bandages, and a calibrated digital thermometer.',
      'Audit your family medicine kit every 6 months to discard expired products and restock depleted dressings.'
    ],
    tags: ['First Aid', 'Emergency Checklist', 'Family Health']
  }
];
