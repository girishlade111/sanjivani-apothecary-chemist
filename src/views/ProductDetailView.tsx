import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Clock, 
  AlertTriangle, 
  Heart, 
  ArrowLeftRight, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Percent, 
  ChevronRight, 
  Star,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductArt } from '../components/common/ProductArt';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    setView, 
    cart, 
    addToCart, 
    updateQuantity, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare,
    pincode 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'uses' | 'dosage' | 'sideEffects' | 'substitutes'>('overview');

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const cartItem = cart.find((i) => i.product.id === product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Substitute products matching the generic salt
  const substitutes = PRODUCTS.filter(
    (p) => p.id !== product.id && p.genericName.toLowerCase().trim() === product.genericName.toLowerCase().trim()
  );

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => setView('home')} className="hover:text-[#0B5D57]">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setView('shop', { category: product.category })} className="hover:text-[#0B5D57]">
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-stone-900 dark:text-white truncate">{product.name}</span>
      </div>

      {/* Main Top Section: Visuals + Pricing & Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: SVG Product Art & Quality Assurance Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] p-8 flex flex-col items-center justify-center relative shadow-sm">
            <ProductArt product={product} size="xl" />

            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.requiresPrescription ? (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Rx Required (Schedule {product.schedule})
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  OTC Medicine
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => toggleCompare(product.id)}
                className={`p-2 rounded-full transition ${isCompared ? 'bg-[#0B5D57] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}
                title="Compare"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full transition ${isWishlisted ? 'text-rose-500 bg-rose-50' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Sourcing & Batch Guarantee Card */}
          <div className="rounded-2xl bg-[#FAF7F0] dark:bg-[#1A302E] border border-[#E6DFD3] dark:border-[#23423F] p-4 text-xs space-y-2 text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Sanjivani Quality Guarantee</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-stone-400 block">Current Batch:</span>
                <span className="font-mono font-semibold">SNJ-26-4418</span>
              </div>
              <div>
                <span className="text-stone-400 block">Expiry Date:</span>
                <span className="font-semibold text-emerald-600">May 2028 (Long Expiry)</span>
              </div>
              <div>
                <span className="text-stone-400 block">Temperature:</span>
                <span>{product.storageCondition || 'Store below 25°C in dry place'}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Drug License:</span>
                <span className="font-mono">MH-PZ1-149204</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Title, Composition, Pricing & Purchase CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B5D57] dark:text-[#A8D5BA]">
              <span>{product.brand}</span>
              <span>•</span>
              <span>Mfr: {product.manufacturer}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              {product.name}
            </h1>

            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs">
              <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Active Salt / Molecular Composition:</span>
              <strong className="text-stone-900 dark:text-white text-sm font-mono">
                {product.genericName}
              </strong>
            </div>
          </div>

          {/* Price & Savings Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-bold text-3xl text-[#0B5D57] dark:text-[#A8D5BA] tabular-nums">
                ₹{product.price.toFixed(2)}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  MRP ₹{product.mrp.toFixed(2)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FF7A59] text-white">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <p className="text-[11px] text-stone-400">
              Inclusive of all taxes • Standard Packaging: <strong>{product.packSize}</strong>
            </p>

            {/* Delivery Promise */}
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 pt-2 border-t border-stone-100 dark:border-stone-800">
              <Truck className="w-4 h-4 text-[#FF7A59]" />
              <span>
                Delivery to <strong>Pune {pincode}</strong>: <strong className="text-[#0B5D57] dark:text-[#A8D5BA]">Today within 90 Minutes</strong>
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {cartItem ? (
                <div className="flex-1 flex items-center justify-between bg-[#DFF5EC] dark:bg-[#0B5D57]/40 border border-[#A8D5BA] rounded-2xl p-2">
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 text-[#0B5D57] dark:text-[#A8D5BA] flex items-center justify-center font-bold hover:bg-stone-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm text-[#0B5D57] dark:text-white tabular-nums">
                    {cartItem.quantity} units in Pharmacy Bag
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 text-[#0B5D57] dark:text-[#A8D5BA] flex items-center justify-center font-bold hover:bg-stone-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition ${
                    product.inStock
                      ? 'bg-[#0B5D57] hover:bg-[#073B37] text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.inStock ? 'Add to Pharmacy Bag' : 'Temporarily Out of Stock'}</span>
                </button>
              )}

              <button
                onClick={() => setView('prescription')}
                className="py-3.5 px-6 rounded-2xl bg-white dark:bg-[#1A302E] border border-[#0B5D57] text-[#0B5D57] dark:text-[#A8D5BA] font-bold text-sm hover:bg-[#DFF5EC]/40 transition"
              >
                Upload Prescription for This
              </button>
            </div>
          </div>

          {/* Salt Substitutes Quick Recommendation */}
          {substitutes.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  <Percent className="w-4 h-4 text-emerald-600" />
                  <span>Cost-Effective Same-Salt Alternatives Available</span>
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Identical Active Molecule
                </span>
              </div>

              <div className="space-y-2">
                {substitutes.slice(0, 2).map((sub) => {
                  const subDiff = product.price - sub.price;
                  const savingsPct = Math.round((subDiff / product.price) * 100);

                  return (
                    <div
                      key={sub.id}
                      className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="block text-stone-900 dark:text-white">{sub.name}</strong>
                        <span className="text-[11px] text-stone-500">{sub.brand} • {sub.packSize}</span>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="font-bold text-emerald-600 text-sm">₹{sub.price.toFixed(2)}</span>
                          {savingsPct > 0 && (
                            <span className="block text-[10px] text-emerald-600 font-bold">
                              Save {savingsPct}% (₹{subDiff.toFixed(0)})
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(sub, 1)}
                          className="px-3 py-1.5 rounded-lg bg-[#0B5D57] text-white font-bold text-xs hover:bg-[#073B37]"
                        >
                          Swap & Add
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs / Clinical Information Accordion */}
      <div className="rounded-3xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-stone-200 dark:border-stone-800 overflow-x-auto gap-2 pb-2 scrollbar-none">
          {[
            { id: 'overview', label: 'Description & Pharmacology' },
            { id: 'uses', label: 'Indications & Uses' },
            { id: 'dosage', label: 'Dosage & Directions' },
            { id: 'sideEffects', label: 'Side Effects & Warnings' },
            { id: 'substitutes', label: `Generic Substitutes (${substitutes.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-[#0B5D57] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                About {product.name}
              </h3>
              <p>{product.description}</p>
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 space-y-1 text-xs">
                <div><strong>Dosage Form:</strong> {product.dosageForm}</div>
                <div><strong>Strength:</strong> {product.strength}</div>
                <div><strong>Standard Pack:</strong> {product.packSize}</div>
                <div><strong>Drug Schedule:</strong> {product.schedule}</div>
                <div><strong>Storage:</strong> {product.storageCondition || 'Store in cool dry place below 25°C'}</div>
              </div>
            </div>
          )}

          {activeTab === 'uses' && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Primary Indications
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.uses.map((use, idx) => (
                  <li key={idx}>{use}</li>
                ))}
              </ul>
              <p className="text-stone-500 text-xs italic">
                Note: Do not self-prescribe or administer for unlisted symptoms without explicit physician instruction.
              </p>
            </div>
          )}

          {activeTab === 'dosage' && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Dosage & Administration Guidelines
              </h3>
              <p>{product.dosageInfo || 'As directed by the registered medical practitioner. Swallow whole with a full glass of water; do not crush, chew, or divide unless specified by the prescribing physician.'}</p>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>If a dose is missed, take it as soon as remembered. If it is close to the next scheduled dose, skip the missed dose. Never take a double dose.</span>
              </div>
            </div>
          )}

          {activeTab === 'sideEffects' && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Documented Side Effects & Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-stone-600 dark:text-stone-300">
                {product.sideEffects.map((effect, idx) => (
                  <li key={idx}>{effect}</li>
                ))}
              </ul>
              {product.contraindications && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs">
                  <strong>Contraindications:</strong> {product.contraindications}
                </div>
              )}
            </div>
          )}

          {activeTab === 'substitutes' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Bioequivalent Generic Salt Substitutes
              </h3>
              {substitutes.length === 0 ? (
                <p className="text-stone-500 text-xs">No direct equivalent registered for this exact salt in our dispensary catalog yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {substitutes.map((sub) => (
                    <ProductCard key={sub.id} product={sub} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            Related Medications in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
