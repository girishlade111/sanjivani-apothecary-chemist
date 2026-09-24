import React, { useState } from 'react';
import { X, ArrowLeftRight, Trash2, Check, ShoppingBag, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';
import { ProductArt } from '../common/ProductArt';

export const CompareModal: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, addToCart } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  const comparedProducts = PRODUCTS.filter((p) => compareList.includes(p.id));

  return (
    <>
      {/* Floating Bottom Compare Trigger Bar */}
      <div className="fixed bottom-6 left-6 z-40 bg-[#10201F] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#23423F] flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-[#FF7A59]" />
          <span className="text-xs font-bold">
            Comparing ({comparedProducts.length}/3 medicines)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white text-xs font-bold transition shadow-xs"
          >
            View Comparison Table
          </button>
          <button
            onClick={clearCompare}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition"
            title="Clear comparison list"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full Comparison Table Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#132422] rounded-3xl p-6 max-w-4xl w-full shadow-2xl border border-[#E6DFD3] dark:border-[#23423F] relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-[#0B5D57] dark:text-[#A8D5BA]" />
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  Pharmacological Comparison
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800">
                    <th className="p-3 text-xs font-bold text-stone-500 uppercase tracking-wider w-1/4">
                      Attribute
                    </th>
                    {comparedProducts.map((p) => (
                      <th key={p.id} className="p-3 text-xs font-bold text-stone-900 dark:text-white w-1/4">
                        <div className="flex items-start justify-between gap-1">
                          <span className="truncate">{p.name}</span>
                          <button
                            onClick={() => toggleCompare(p.id)}
                            className="text-stone-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
                  {/* Artwork row */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Visual</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <ProductArt product={p} size="sm" />
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Price & MRP</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="font-bold text-sm text-[#0B5D57] dark:text-[#A8D5BA] tabular-nums">
                          ₹{p.price.toFixed(2)}
                        </span>
                        <span className="ml-1 text-[11px] text-stone-400 line-through">
                          MRP ₹{p.mrp.toFixed(2)}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Active Salt */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Active Salt / Molecule</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-stone-800 dark:text-stone-200">
                        {p.genericName}
                      </td>
                    ))}
                  </tr>

                  {/* Brand & Manufacturer */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Brand / Manufacturer</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700 dark:text-stone-300">
                        <strong>{p.brand}</strong> ({p.manufacturer})
                      </td>
                    ))}
                  </tr>

                  {/* Drug Schedule */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Schedule & Prescription</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        {p.requiresPrescription ? (
                          <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-bold text-[10px]">
                            {p.schedule} • Rx Required
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                            OTC (Non-Prescription)
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Key Indications */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Therapeutic Indications</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {p.uses.map((u, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
                              {u}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Pack Size */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Packaging Size</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700 dark:text-stone-300">
                        {p.packSize}
                      </td>
                    ))}
                  </tr>

                  {/* Add to Cart */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-600 dark:text-stone-400">Action</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <button
                          onClick={() => {
                            addToCart(p, 1);
                            setIsOpen(false);
                          }}
                          className="w-full py-2 rounded-xl bg-[#0B5D57] hover:bg-[#073B37] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
