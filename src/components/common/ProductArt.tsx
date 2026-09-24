import React from 'react';
import { Product } from '../../types';

interface ProductArtProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ProductArt: React.FC<ProductArtProps> = ({ product, size = 'md', className = '' }) => {
  const { artType, colorTone = '#0B5D57', schedule, name } = product;
  const isRx = schedule === 'Rx' || schedule === 'Schedule H';

  // Sizing map
  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64 md:w-80 md:h-80'
  };

  const badgeColor = isRx ? '#E05252' : '#10B981';

  return (
    <div className={`relative flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-stone-50/80 to-stone-100/60 dark:from-stone-900/40 dark:to-stone-800/30 overflow-hidden select-none ${sizeStyles[size]} ${className}`}>
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 opacity-15 blur-xl pointer-events-none rounded-full"
        style={{ backgroundColor: colorTone }}
      />

      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`foilGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`primaryGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorTone} />
            <stop offset="100%" stopColor="#073B37" />
          </linearGradient>
          <linearGradient id={`glassGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {artType === 'strip' && (
          // Blister foil medicine strip
          <g>
            {/* Foil Base */}
            <rect x="35" y="25" width="130" height="150" rx="14" fill={`url(#foilGrad-${product.id})`} stroke="#94A3B8" strokeWidth="1.5" />
            {/* Foil grid embossing lines */}
            <line x1="35" y1="65" x2="165" y2="65" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="35" y1="105" x2="165" y2="105" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="35" y1="145" x2="165" y2="145" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="100" y1="25" x2="100" y2="175" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3" />

            {/* Tablet Blister Cavities (8 tablets) */}
            {[
              { cx: 65, cy: 45 }, { cx: 135, cy: 45 },
              { cx: 65, cy: 85 }, { cx: 135, cy: 85 },
              { cx: 65, cy: 125 }, { cx: 135, cy: 125 },
              { cx: 65, cy: 160 }, { cx: 135, cy: 160 }
            ].map((pos, idx) => (
              <g key={idx}>
                <ellipse cx={pos.cx} cy={pos.cy} rx="20" ry="12" fill={colorTone} opacity="0.85" />
                <ellipse cx={pos.cx - 2} cy={pos.cy - 2} rx="17" ry="9" fill="#FFFFFF" opacity="0.3" />
                <line x1={pos.cx - 10} y1={pos.cy} x2={pos.cx + 10} y2={pos.cy} stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              </g>
            ))}

            {/* Imprinted brand band at top */}
            <rect x="42" y="30" width="116" height="6" rx="3" fill={colorTone} opacity="0.6" />
          </g>
        )}

        {artType === 'bottle' && (
          // Apothecary medicine bottle
          <g>
            {/* Screw Cap */}
            <rect x="75" y="20" width="50" height="24" rx="4" fill="#334155" />
            <line x1="75" y1="28" x2="125" y2="28" stroke="#64748B" strokeWidth="1" />
            <line x1="75" y1="36" x2="125" y2="36" stroke="#64748B" strokeWidth="1" />
            {/* Safety neck ring */}
            <rect x="70" y="44" width="60" height="10" rx="3" fill="#475569" />

            {/* Bottle Body */}
            <rect x="45" y="54" width="110" height="126" rx="20" fill={colorTone} opacity="0.9" />
            {/* Glass reflection highlight */}
            <path d="M50 64 C50 64, 58 75, 58 160 C58 170, 52 170, 52 170" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            
            {/* Label */}
            <rect x="55" y="75" width="90" height="85" rx="8" fill="#FAF7F0" />
            {/* Rx or Cross symbol on label */}
            <circle cx="70" cy="95" r="8" fill={badgeColor} />
            <rect x="68" y="91" width="4" height="8" fill="#FFFFFF" rx="1" />
            <rect x="66" y="93" width="8" height="4" fill="#FFFFFF" rx="1" />

            {/* Label mock lines */}
            <rect x="84" y="92" width="50" height="5" rx="2" fill="#10201F" opacity="0.8" />
            <rect x="62" y="112" width="76" height="3" rx="1" fill="#94A3B8" />
            <rect x="62" y="120" width="60" height="3" rx="1" fill="#94A3B8" />
            <rect x="62" y="128" width="70" height="3" rx="1" fill="#94A3B8" />
            <rect x="62" y="140" width="40" height="10" rx="3" fill={colorTone} opacity="0.2" />
          </g>
        )}

        {artType === 'syrup' && (
          // Liquid suspension syrup with graduated cup
          <g>
            {/* Measuring cap on top */}
            <path d="M72 18 L128 18 L122 36 L78 36 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" opacity="0.9" />
            <line x1="84" y1="24" x2="94" y2="24" stroke="#94A3B8" strokeWidth="1" />
            <line x1="82" y1="29" x2="98" y2="29" stroke="#94A3B8" strokeWidth="1" />

            {/* Bottle Neck */}
            <rect x="80" y="36" width="40" height="18" rx="2" fill="#475569" />

            {/* Bottle Body */}
            <rect x="52" y="54" width="96" height="126" rx="22" fill="#334155" opacity="0.25" stroke="#94A3B8" strokeWidth="1" />
            
            {/* Liquid Level inside */}
            <path d="M54 90 C70 86, 120 94, 146 90 L146 160 C146 172, 136 178, 124 178 L76 178 C64 178, 54 172, 54 160 Z" fill={colorTone} opacity="0.85" />
            
            {/* Label */}
            <rect x="62" y="98" width="76" height="65" rx="6" fill="#FAF7F0" />
            <rect x="68" y="108" width="64" height="6" rx="2" fill={colorTone} />
            <rect x="68" y="120" width="50" height="3" rx="1" fill="#64748B" />
            <rect x="68" y="127" width="40" height="3" rx="1" fill="#64748B" />
            <circle cx="120" cy="144" r="6" fill={badgeColor} />
          </g>
        )}

        {artType === 'tube' && (
          // Pharmaceutical gel / ointment tube
          <g transform="rotate(-18 100 100)">
            {/* Crimped End */}
            <rect x="42" y="152" width="116" height="14" rx="2" fill="#64748B" />
            <line x1="42" y1="156" x2="158" y2="156" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />

            {/* Tube Body */}
            <path d="M46 152 L62 48 C64 42, 70 38, 76 38 L124 38 C130 38, 136 42, 138 48 L154 152 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            
            {/* Accent Wave Swatch */}
            <path d="M54 120 C75 105, 125 130, 146 115 L149 140 L51 140 Z" fill={colorTone} opacity="0.8" />
            
            {/* Tube Cap */}
            <rect x="80" y="16" width="40" height="22" rx="4" fill={colorTone} />
            <line x1="86" y1="16" x2="86" y2="38" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
            <line x1="100" y1="16" x2="100" y2="38" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
            <line x1="114" y1="16" x2="114" y2="38" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

            {/* Brand lettering line */}
            <rect x="74" y="60" width="52" height="6" rx="2" fill="#1E293B" />
            <rect x="78" y="72" width="44" height="3" rx="1" fill="#94A3B8" />
          </g>
        )}

        {artType === 'box' && (
          // Pharma clinical product carton
          <g>
            {/* Carton Front Face */}
            <rect x="40" y="30" width="120" height="145" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            
            {/* Color banner header */}
            <path d="M40 42 C40 35, 45 30, 52 30 L148 30 C155 30, 160 35, 160 42 L160 70 L40 70 Z" fill={colorTone} />
            
            {/* Security Hologram Sticker */}
            <rect x="132" y="36" width="18" height="18" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
            <circle cx="141" cy="45" r="5" fill="#38BDF8" opacity="0.7" />

            {/* Rx or Care Icon on banner */}
            <rect x="52" y="42" width="14" height="14" rx="3" fill="#FFFFFF" opacity="0.25" />
            <text x="59" y="53" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">{isRx ? 'Rx' : '✚'}</text>

            {/* Title bars */}
            <rect x="52" y="84" width="75" height="8" rx="2" fill="#0F172A" />
            <rect x="52" y="98" width="55" height="4" rx="1" fill="#64748B" />
            <rect x="52" y="106" width="85" height="3" rx="1" fill="#94A3B8" />
            <rect x="52" y="113" width="70" height="3" rx="1" fill="#94A3B8" />

            {/* Barcode & Batch */}
            <g transform="translate(52, 140)">
              <rect x="0" y="0" width="2" height="18" fill="#1E293B" />
              <rect x="4" y="0" width="1" height="18" fill="#1E293B" />
              <rect x="7" y="0" width="3" height="18" fill="#1E293B" />
              <rect x="12" y="0" width="2" height="18" fill="#1E293B" />
              <rect x="16" y="0" width="1" height="18" fill="#1E293B" />
              <rect x="19" y="0" width="4" height="18" fill="#1E293B" />
              <rect x="25" y="0" width="2" height="18" fill="#1E293B" />
              <rect x="29" y="0" width="1" height="18" fill="#1E293B" />
              <rect x="32" y="0" width="3" height="18" fill="#1E293B" />
              <rect x="37" y="0" width="2" height="18" fill="#1E293B" />
            </g>

            {/* Verified Genuine Pill Stamp */}
            <circle cx="135" cy="148" r="12" fill={colorTone} opacity="0.15" />
            <circle cx="135" cy="148" r="9" stroke={colorTone} strokeWidth="1" fill="none" strokeDasharray="2 2" />
          </g>
        )}

        {artType === 'device' && (
          // Digital Monitor / Medical Instrument
          <g>
            {/* Monitor Housing */}
            <rect x="35" y="32" width="130" height="138" rx="22" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
            
            {/* LCD Display Screen */}
            <rect x="48" y="46" width="104" height="74" rx="8" fill="#0F172A" />
            
            {/* Screen Data Numbers */}
            <text x="60" y="80" fill="#38BDF8" fontSize="26" fontWeight="bold" fontFamily="monospace">120</text>
            <text x="105" y="80" fill="#E2E8F0" fontSize="16" fontFamily="monospace">/ 80</text>
            <text x="60" y="104" fill="#34D399" fontSize="14" fontFamily="monospace">PULSE 72</text>
            
            {/* Heartbeat pulse wave SVG */}
            <path d="M110 98 L116 98 L120 90 L124 104 L128 94 L132 98 L142 98" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Power / Start Button */}
            <circle cx="100" cy="144" r="14" fill={colorTone} />
            <circle cx="100" cy="144" r="11" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="100" y1="137" x2="100" y2="143" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

            {/* Status LED */}
            <circle cx="138" cy="144" r="3" fill="#22C55E" />
          </g>
        )}
      </svg>

      {/* Floating category badge tag */}
      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm"
        style={{ backgroundColor: `${colorTone}15`, color: colorTone }}
      >
        {isRx ? 'Rx' : 'OTC'}
      </div>
    </div>
  );
};
