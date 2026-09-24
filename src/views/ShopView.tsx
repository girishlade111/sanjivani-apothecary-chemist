import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  Search, 
  FileText, 
  Check, 
  ArrowLeftRight,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, HEALTH_CONCERNS } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';

export const ShopView: React.FC = () => {
  const { 
    selectedCategory, 
    selectedConcern, 
    searchQuery, 
    setSearchQuery, 
    setView,
    setQuickViewProduct 
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'All');
  const [activeConcern, setActiveConcern] = useState<string>(selectedConcern || 'All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [scheduleFilter, setScheduleFilter] = useState<'All' | 'Rx' | 'OTC'>('All');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      // Concern filter
      if (activeConcern !== 'All') {
        const concernObj = HEALTH_CONCERNS.find((c) => c.name === activeConcern);
        if (concernObj && concernObj.categoryIds && !concernObj.categoryIds.includes(product.category)) {
          // If not in category, check uses keywords
          const matchedUse = product.uses.some((u) => 
            activeConcern.toLowerCase().includes(u.toLowerCase()) || 
            u.toLowerCase().includes(activeConcern.toLowerCase())
          );
          if (!matchedUse) return false;
        }
      }
      // Brand filter
      if (activeBrand !== 'All' && product.brand !== activeBrand) {
        return false;
      }
      // Schedule filter
      if (scheduleFilter === 'Rx' && !product.requiresPrescription) {
        return false;
      }
      if (scheduleFilter === 'OTC' && product.requiresPrescription) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSalt = product.genericName.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesUses = product.uses.some((u) => u.toLowerCase().includes(q));
        if (!matchesName && !matchesSalt && !matchesBrand && !matchesUses) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        const discA = (a.mrp - a.price) / a.mrp;
        const discB = (b.mrp - b.price) / b.mrp;
        return discB - discA;
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, activeConcern, activeBrand, scheduleFilter, onlyInStock, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setActiveConcern('All');
    setActiveBrand('All');
    setScheduleFilter('All');
    setOnlyInStock(false);
    setMaxPrice(3000);
    setSearchQuery('');
  };

  const hasActiveFilters = 
    activeCategory !== 'All' || 
    activeConcern !== 'All' || 
    activeBrand !== 'All' || 
    scheduleFilter !== 'All' || 
    onlyInStock || 
    maxPrice < 3000 || 
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6DFD3] dark:border-[#23423F]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Medicines & Healthcare Catalog
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Showing <strong className="text-stone-800 dark:text-stone-200">{filteredProducts.length}</strong> registered formulations & healthcare items
          </p>
        </div>

        {/* Sorting & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-4 py-2 rounded-xl bg-white dark:bg-[#132422] border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-800 dark:text-white flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0B5D57]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-[#132422] border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0B5D57]"
            >
              <option value="featured">Featured & Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Savings (%)</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-stone-500">Active Filters:</span>
          {activeCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#DFF5EC] text-[#0B5D57] font-bold">
              {activeCategory}
              <button onClick={() => setActiveCategory('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {activeConcern !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#DFF5EC] text-[#0B5D57] font-bold">
              {activeConcern}
              <button onClick={() => setActiveConcern('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {activeBrand !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#DFF5EC] text-[#0B5D57] font-bold">
              Brand: {activeBrand}
              <button onClick={() => setActiveBrand('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {scheduleFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#DFF5EC] text-[#0B5D57] font-bold">
              {scheduleFilter} Only
              <button onClick={() => setScheduleFilter('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {onlyInStock && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#DFF5EC] text-[#0B5D57] font-bold">
              In Stock Only
              <button onClick={() => setOnlyInStock(false)}><X className="w-3 h-3" /></button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#DFF5EC] text-[#0B5D57] font-bold">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-[#FF7A59] hover:underline ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`lg:col-span-3 space-y-6 bg-white dark:bg-[#132422] p-6 rounded-3xl border border-[#E6DFD3] dark:border-[#23423F] ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0B5D57] dark:text-[#A8D5BA]" />
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button onClick={handleResetFilters} className="text-xs text-[#FF7A59] font-bold hover:underline">
                Reset
              </button>
            )}
          </div>

          {/* Prescription vs OTC Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
              Drug Classification
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
              {(['All', 'Rx', 'OTC'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setScheduleFilter(mode)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    scheduleFilter === mode
                      ? 'bg-[#0B5D57] text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Categories List */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
              Category
            </label>
            <div className="max-h-52 overflow-y-auto space-y-1 pr-1 scrollbar-thin text-xs">
              <button
                onClick={() => setActiveCategory('All')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                  activeCategory === 'All'
                    ? 'bg-[#0B5D57] text-white font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>All Categories</span>
                <span>{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                    activeCategory === cat.name
                      ? 'bg-[#0B5D57] text-white font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[11px] opacity-75">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
              Pharma Brand
            </label>
            <select
              value={activeBrand}
              onChange={(e) => setActiveBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-medium text-stone-900 dark:text-white outline-none"
            >
              <option value="All">All Brands ({BRANDS.length})</option>
              {BRANDS.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name} ({b.country})
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-stone-700 dark:text-stone-300">
              <span>Max Price</span>
              <span className="text-[#0B5D57] dark:text-[#A8D5BA]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={3000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0B5D57]"
            />
          </div>

          {/* In stock switch */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800 dark:text-stone-200">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#0B5D57] accent-[#0B5D57]"
              />
              <span>In-Stock Ready for 90-Min Dispatch</span>
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-[#132422] rounded-3xl border border-[#E6DFD3] dark:border-[#23423F] p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                No matching medications found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We couldn't find items matching your active filter criteria. Try clearing some filters or searching by general active salt name.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-[#0B5D57] text-white text-xs font-bold hover:bg-[#073B37] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
