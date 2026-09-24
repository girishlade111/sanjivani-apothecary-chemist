import React from 'react';
import { Heart, Plus, Minus, Check, Eye, ArrowLeftRight, FileText, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { ProductArt } from '../common/ProductArt';
import { TRANSLATIONS } from '../../data/i18n';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare,
    setView,
    language 
  } = useStore();

  const t = TRANSLATIONS[language];
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const cartItem = cart.find((i) => i.product.id === product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const isLowStock = product.inStock && product.stockCount <= 10;
  const isRx = product.requiresPrescription;

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#132422] border border-[#E6DFD3] dark:border-[#23423F] hover:border-[#0B5D57] dark:hover:border-[#A8D5BA] transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden p-3.5">
      {/* Top badges & Wishlist */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-2 z-10">
          <div className="flex flex-wrap items-center gap-1">
            {isRx ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                <FileText className="w-2.5 h-2.5" />
                Rx Prescribed
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                OTC
              </span>
            )}

            {discountPercent > 0 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FF7A59]/15 text-[#FF7A59]">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleCompare(product.id)}
              className={`p-1.5 rounded-full transition ${
                isCompared 
                  ? 'bg-[#0B5D57] text-white' 
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Compare with other medicines"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-1.5 rounded-full transition ${
                isWishlisted 
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' 
                  : 'text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product SVG Graphic Art */}
        <div 
          onClick={() => setView('product', { productId: product.id })}
          className="cursor-pointer relative flex items-center justify-center my-1"
        >
          <ProductArt product={product} size="md" />

          {/* Quick View Button overlay on hover */}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="absolute inset-x-4 bottom-2 py-1.5 px-3 rounded-xl bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#0B5D57] dark:text-[#A8D5BA]" />
              <span>Quick View</span>
            </button>
          )}
        </div>

        {/* Info area */}
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-[#0B5D57] dark:text-[#A8D5BA] uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span>{product.packSize}</span>
          </div>

          <h3 
            onClick={() => setView('product', { productId: product.id })}
            className="font-bold text-sm text-stone-900 dark:text-white hover:text-[#0B5D57] dark:hover:text-[#A8D5BA] cursor-pointer transition line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1" title={product.genericName}>
            {product.genericName}
          </p>

          {/* Uses tag */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.uses.slice(0, 2).map((use, idx) => (
              <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {use}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="mt-3 pt-3 border-t border-[#E6DFD3] dark:border-[#23423F] space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-serif font-bold text-base text-[#0B5D57] dark:text-[#A8D5BA] tabular-nums">
              ₹{product.price.toFixed(2)}
            </span>
            {product.mrp > product.price && (
              <span className="ml-1.5 text-xs text-stone-400 line-through tabular-nums">
                MRP ₹{product.mrp.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock state */}
          {!product.inStock ? (
            <span className="text-[10px] font-bold text-red-500">Out of Stock</span>
          ) : isLowStock ? (
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
              Only {product.stockCount} left
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              In Stock
            </span>
          )}
        </div>

        {/* Action Button */}
        {cartItem ? (
          <div className="flex items-center justify-between bg-[#DFF5EC] dark:bg-[#0B5D57]/30 border border-[#A8D5BA]/60 rounded-xl p-1">
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-stone-800 text-[#0B5D57] dark:text-[#A8D5BA] shadow-xs hover:bg-stone-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#0B5D57] dark:text-[#A8D5BA] tabular-nums">
              {cartItem.quantity} in Bag
            </span>
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-stone-800 text-[#0B5D57] dark:text-[#A8D5BA] shadow-xs hover:bg-stone-100"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              product.inStock
                ? 'bg-[#0B5D57] hover:bg-[#073B37] text-white shadow-xs'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{product.inStock ? t.addToCart : t.outOfStock}</span>
          </button>
        )}
      </div>
    </div>
  );
};
