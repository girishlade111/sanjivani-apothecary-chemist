import React from 'react';
import { X, ArrowRight, ShieldCheck, FileText, Check, AlertCircle, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { ProductArt } from '../common/ProductArt';
import { TRANSLATIONS } from '../../data/i18n';

interface QuickViewModalProps {
  product?: Product | null;
  onClose?: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product: propProduct, onClose: propOnClose }) => {
  const { addToCart, setView, quickViewProduct, setQuickViewProduct, language } = useStore();
  const product = propProduct !== undefined ? propProduct : quickViewProduct;
  const onClose = propOnClose || (() => setQuickViewProduct(null));
  const t = TRANSLATIONS[language];

  if (!product) return null;

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-[#E6DFD3] dark:border-[#23423F] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* SVG Visual */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50">
            <ProductArt product={product} size="xl" />
            <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-stone-500">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>100% Genuine • Batch Verified</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#DFF5EC] dark:bg-[#0B5D57]/40 text-[#0B5D57] dark:text-[#A8D5BA]">
                {product.category}
              </span>
              {product.requiresPrescription ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                  Rx Required
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  OTC Available
                </span>
              )}
            </div>

            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              {product.name}
            </h3>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              Active Salt: <strong className="text-stone-800 dark:text-stone-200">{product.genericName}</strong>
            </p>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-serif font-bold text-2xl text-[#0B5D57] dark:text-[#A8D5BA] tabular-nums">
                ₹{product.price.toFixed(2)}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  MRP ₹{product.mrp.toFixed(2)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-[#FF7A59] bg-[#FF7A59]/10 px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {product.description}
            </p>

            {/* Manufacturer & Pack info */}
            <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-stone-400 block text-[11px]">Brand & Mfr:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{product.manufacturer}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Packaging:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{product.packSize}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setView('product', { productId: product.id });
                }}
                className="py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 hover:border-[#0B5D57] text-stone-700 dark:text-stone-200 font-bold text-xs flex items-center gap-1 transition"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
