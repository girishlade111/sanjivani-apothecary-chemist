import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Calculator, 
  HelpCircle, 
  Search, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Pill
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const HealthToolsView: React.FC = () => {
  const { setView } = useStore();
  const [activeTool, setActiveTool] = useState<'bmi' | 'bp' | 'diabetes' | 'pillIdentifier'>('bmi');

  // BMI State
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(68);

  // BP State
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);

  // Diabetes Screener State
  const [diaAge, setDiaAge] = useState<number>(35);
  const [diaFamily, setDiaFamily] = useState<boolean>(true);
  const [diaActive, setDiaActive] = useState<boolean>(false);
  const [diaWaist, setDiaWaist] = useState<number>(88);

  // Pill Identifier State
  const [pillColor, setPillColor] = useState<string>('White');
  const [pillShape, setPillShape] = useState<string>('Round');

  // BMI Calculation
  const bmi = Number((weightKg / Math.pow(heightCm / 100, 2)).toFixed(1));
  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-600';
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-500';
  } else if (bmi >= 23 && bmi < 27.5) {
    // Asian Indian cutoffs (ICMR)
    bmiCategory = 'Overweight (Asian Indian Cutoff: 23+)';
    bmiColor = 'text-amber-600';
  } else if (bmi >= 27.5) {
    bmiCategory = 'Obese (Asian Indian Cutoff: 27.5+)';
    bmiColor = 'text-rose-600';
  }

  // BP Classification (AHA / Indian Hypertension Guidelines)
  let bpCategory = 'Normal';
  let bpColor = 'text-emerald-600';
  if (systolic >= 140 || diastolic >= 90) {
    bpCategory = 'Stage 2 Hypertension';
    bpColor = 'text-rose-600';
  } else if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) {
    bpCategory = 'Stage 1 Hypertension';
    bpColor = 'text-amber-600';
  } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
    bpCategory = 'Elevated Blood Pressure';
    bpColor = 'text-amber-500';
  }

  // Diabetes Risk Score
  let diabetesScore = 0;
  if (diaAge >= 50) diabetesScore += 30;
  else if (diaAge >= 35) diabetesScore += 20;
  else diabetesScore += 10;
  if (diaFamily) diabetesScore += 20;
  if (!diaActive) diabetesScore += 20;
  if (diaWaist > 90) diabetesScore += 20;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0B5D57] dark:text-[#A8D5BA]">
          Clinical Self-Screening Suite
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
          Apothecary Health Tools & Calculators
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Evidence-backed risk calculators adhering to ICMR, CDSCO, and Indian Consensus clinical guidelines.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex justify-center">
        <div className="flex flex-wrap p-1.5 bg-stone-100 dark:bg-stone-800 rounded-2xl gap-1">
          {[
            { id: 'bmi', label: 'BMI Calculator (ICMR Guidelines)', icon: <Calculator className="w-4 h-4" /> },
            { id: 'bp', label: 'Blood Pressure Stage Classifier', icon: <Heart className="w-4 h-4" /> },
            { id: 'diabetes', label: 'Diabetes Risk Screener (IDRS)', icon: <Activity className="w-4 h-4" /> },
            { id: 'pillIdentifier', label: 'Pill Shape & Color Guide', icon: <Pill className="w-4 h-4" /> }
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTool === tool.id
                  ? 'bg-[#0B5D57] text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Tool Body */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#132422] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] dark:border-[#23423F] shadow-sm">
        {/* Tool 1: BMI */}
        {activeTool === 'bmi' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Body Mass Index (BMI) for South Asians
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Note: According to the Indian Council of Medical Research (ICMR), Asian Indian cutoffs are stricter due to higher visceral fat propensity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Height</span>
                  <span className="text-[#0B5D57] font-mono">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={210}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-[#0B5D57]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Weight</span>
                  <span className="text-[#0B5D57] font-mono">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={150}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#0B5D57]"
                />
              </div>
            </div>

            {/* BMI Result Card */}
            <div className="p-6 rounded-2xl bg-[#FAF7F0] dark:bg-stone-900 border border-[#E6DFD3] dark:border-stone-800 text-center space-y-2">
              <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Your Estimated BMI</span>
              <div className="font-serif text-5xl font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
                {bmi} <span className="text-sm font-normal text-stone-400">kg/m²</span>
              </div>
              <span className={`text-sm font-bold block ${bmiColor}`}>
                {bmiCategory}
              </span>
              <p className="text-xs text-stone-500 max-w-md mx-auto pt-2">
                Healthy Asian Indian range: 18.5 – 22.9 kg/m². Maintain an active routine and balanced fiber intake.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setView('shop', { category: 'Weight & Fitness' })}
                className="px-5 py-2.5 rounded-xl bg-[#0B5D57] text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Explore Wellness & Nutritional Supplements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tool 2: Blood Pressure */}
        {activeTool === 'bp' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Blood Pressure Stage Classifier
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Classified under the Indian Guidelines on Hypertension (I-GH-IV) and American Heart Association parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Systolic (Top number)</span>
                  <span className="text-[#0B5D57] font-mono">{systolic} mmHg</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={200}
                  value={systolic}
                  onChange={(e) => setSystolic(Number(e.target.value))}
                  className="w-full accent-[#0B5D57]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Diastolic (Bottom number)</span>
                  <span className="text-[#0B5D57] font-mono">{diastolic} mmHg</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={130}
                  value={diastolic}
                  onChange={(e) => setDiastolic(Number(e.target.value))}
                  className="w-full accent-[#0B5D57]"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] dark:bg-stone-900 border border-[#E6DFD3] dark:border-stone-800 text-center space-y-2">
              <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Reading Status</span>
              <div className="font-serif text-4xl font-bold text-stone-900 dark:text-white">
                {systolic} / {diastolic} <span className="text-sm font-normal text-stone-400">mmHg</span>
              </div>
              <span className={`text-sm font-bold block ${bpColor}`}>
                {bpCategory}
              </span>
              <p className="text-xs text-stone-500 max-w-md mx-auto pt-2">
                Take readings after sitting calmly for 5 minutes. Free blood pressure monitoring is also available at our Fergusson College Road store.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setView('shop', { category: 'Cardiac & Blood Pressure' })}
                className="px-5 py-2.5 rounded-xl bg-[#0B5D57] text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Browse BP Monitors & Cardiac Care</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tool 3: Diabetes IDRS */}
        {activeTool === 'diabetes' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Indian Diabetes Risk Score (IDRS)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Madras Diabetes Research Foundation (MDRF) validated screening tool for early detection.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="font-bold">Age:</span>
                <select
                  value={diaAge}
                  onChange={(e) => setDiaAge(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                >
                  <option value={25}>Under 35 years</option>
                  <option value={40}>35 – 49 years</option>
                  <option value={55}>50 years or above</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="font-bold">Family History of Type 2 Diabetes:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDiaFamily(true)}
                    className={`px-3 py-1 rounded-lg font-bold ${diaFamily ? 'bg-[#0B5D57] text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    Yes (Parent/Sibling)
                  </button>
                  <button
                    onClick={() => setDiaFamily(false)}
                    className={`px-3 py-1 rounded-lg font-bold ${!diaFamily ? 'bg-[#0B5D57] text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="font-bold">Daily Physical Activity (Walking/Exercise &gt; 30 mins):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDiaActive(true)}
                    className={`px-3 py-1 rounded-lg font-bold ${diaActive ? 'bg-[#0B5D57] text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    Yes, Regular
                  </button>
                  <button
                    onClick={() => setDiaActive(false)}
                    className={`px-3 py-1 rounded-lg font-bold ${!diaActive ? 'bg-[#0B5D57] text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    Sedentary
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] dark:bg-stone-900 border border-[#E6DFD3] dark:border-stone-800 text-center space-y-2">
              <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Calculated IDRS Score</span>
              <div className="font-serif text-4xl font-bold text-[#0B5D57] dark:text-[#A8D5BA]">
                {diabetesScore} / 90
              </div>
              <span className={`text-sm font-bold block ${diabetesScore >= 60 ? 'text-rose-600' : diabetesScore >= 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {diabetesScore >= 60 ? 'High Risk — HbA1c screening recommended' : diabetesScore >= 30 ? 'Moderate Risk — Lifestyle monitoring advised' : 'Low Risk'}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setView('lab-tests')}
                className="px-5 py-2.5 rounded-xl bg-[#0B5D57] text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Book Home HbA1c & Fasting Glucose Test (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tool 4: Pill Identifier */}
        {activeTool === 'pillIdentifier' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                Pill Identifier Guide
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Identify unmarked or loose tablets by shape, color, and scoring line.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Pill Color</label>
                <select
                  value={pillColor}
                  onChange={(e) => setPillColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                >
                  <option value="White">White / Off-White</option>
                  <option value="Red">Red / Maroon</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Pink">Pink</option>
                  <option value="Blue">Blue / Teal</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Pill Shape</label>
                <select
                  value={pillShape}
                  onChange={(e) => setPillShape(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                >
                  <option value="Round">Round Tablet</option>
                  <option value="Oblong">Oblong / Capsule Shaped</option>
                  <option value="Oval">Oval</option>
                  <option value="Capsule">Two-Piece Hard Gelatin</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong className="block">Clinical Safety Notice:</strong>
                Never consume an unidentified loose pill. Snap a photo and send it to our registered dispensary pharmacist on WhatsApp for positive identification.
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setView('whatsapp')}
                className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Ask Pharmacist to Identify via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
