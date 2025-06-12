'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { liquidGlassTokens } from './EcommerceSideMenu';
import { 
  PetersenProduct, 
  getAllProducts, 
  getProductsByCategory, 
  searchProducts,
  getFilteredMiniatures,
  getProductsByPetersenCategory,
  filterMiniatureProducts 
} from '../lib/shopify';
import { useCart, CartMini } from '../lib/cart-context';

// Product Categories with Tags System
const PRODUCT_CATEGORIES = {
  'core-games': {
    id: 'core-games',
    name: 'Core Games',
    icon: '🎯',
    subcategories: ['Board Games', 'Card Games', 'RPG Core Rules', 'Standalone Games']
  },
  'expansions': {
    id: 'expansions',
    name: 'Game Expansions',
    icon: '📦',
    subcategories: ['Expansion Packs', 'Campaign Books', 'Supplemental Rules', 'Adventure Modules']
  },
  'miniatures': {
    id: 'miniatures',
    name: 'Miniatures',
    icon: '🗿',
    subcategories: ['RPG Miniatures', 'Fantasy Miniatures', 'Bloodfields Miniatures', 'Sci-Fi Miniatures', 'Gridwars Miniatures', 'Bases & Accessories']
  },
  'books': {
    id: 'books',
    name: 'Books & Literature',
    icon: '📚',
    subcategories: ['Rulebooks', 'Lore & Setting Guides', 'Art Books', 'Fiction Novels']
  },
  'accessories': {
    id: 'accessories',
    name: 'Bling & Accessories',
    icon: '🎲',
    subcategories: ['Dice Sets', 'Tokens & Markers', 'Game Mats', 'Storage Solutions']
  },
  'digital': {
    id: 'digital',
    name: 'Digital Products',
    icon: '💻',
    subcategories: ['PDFs', 'Digital Maps', 'VTT Assets', 'Apps']
  }
};

const MINIATURE_FILTERS = {
  characterClass: {
    name: 'Character Class',
    options: ['Barbarians', 'Bards', 'Clerics', 'Druids', 'Fighters', 'Monks', 'Paladins', 'Rangers', 'Rogues', 'Sorcerers', 'Warlocks', 'Wizards', 'Others']
  },
  race: {
    name: 'Race',
    options: ['Humans', 'Elves', 'Dwarves', 'Halflings', 'Dragonborns', 'Tieflings', 'Gnomes', 'Half-Orcs', 'Other']
  },
  faction: {
    name: 'Faction',
    options: ['Noble Alliance', 'Legion of Death', 'Savage Tribes', 'Bloodmoon Bay', 'Steamforge City', 'Forgotten Empire', 'Caves of Corruption', 'Cursed Sands', 'Mercenaries']
  },
  unitType: {
    name: 'Unit Type',
    options: ['Heroes', 'Monsters', 'Units', 'Vehicles', 'Corporation', 'Cyber Cult', 'TCPD', 'Yakuza', 'Star Smugglers', 'Gangs of TC', 'Borderlands']
  },
  baseType: {
    name: 'Base Type',
    options: ['Fantasy Bases', 'Sci-Fi Bases']
  }
};

// Icons for categories and filters
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

// Mobile Menu Component
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeCategory, onCategorySelect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              backdropFilter: 'blur(10px)',
            }}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '300px',
              maxWidth: '80vw',
              backgroundColor: liquidGlassTokens.colors.secondary,
              borderRight: `1px solid ${liquidGlassTokens.colors.separator}`,
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: `blur(${liquidGlassTokens.effects.backgroundBlur})`,
            }}
          >
            {/* Header */}
            <div style={{
              padding: liquidGlassTokens.spacing.medium,
              borderBottom: `1px solid ${liquidGlassTokens.colors.separator}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{
                color: liquidGlassTokens.colors.label,
                fontSize: liquidGlassTokens.typography.headline.size,
                fontWeight: '600',
                margin: 0,
              }}>
                Petersen Games
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: liquidGlassTokens.colors.label,
                  cursor: 'pointer',
                  padding: liquidGlassTokens.spacing.small,
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Categories */}
            <div style={{ flex: 1, overflow: 'auto', padding: liquidGlassTokens.spacing.medium }}>
              {Object.values(PRODUCT_CATEGORIES).map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategorySelect(category.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: liquidGlassTokens.spacing.medium,
                    marginBottom: liquidGlassTokens.spacing.small,
                    backgroundColor: activeCategory === category.id 
                      ? liquidGlassTokens.colors.systemFill 
                      : 'transparent',
                    border: 'none',
                    borderRadius: liquidGlassTokens.cornerRadius.medium,
                    color: activeCategory === category.id 
                      ? liquidGlassTokens.colors.systemBlue 
                      : liquidGlassTokens.colors.label,
                    cursor: 'pointer',
                    fontSize: liquidGlassTokens.typography.body.size,
                    fontWeight: activeCategory === category.id ? '600' : '400',
                    textAlign: 'left',
                    transition: `all ${liquidGlassTokens.animation.duration.short}`,
                  }}
                >
                  <span style={{ marginRight: liquidGlassTokens.spacing.small, fontSize: '20px' }}>
                    {category.icon}
                  </span>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Filter Component
interface FilterComponentProps {
  activeCategory: string;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, values: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ activeCategory, activeFilters, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (activeCategory !== 'miniatures') {
    return null; // Only show filters for miniatures
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(60px) saturate(150%) brightness(50%)',
        border: '1px solid rgba(76, 29, 149, 0.15)',
        borderRadius: liquidGlassTokens.cornerRadius.large,
        padding: liquidGlassTokens.spacing.medium,
        marginBottom: liquidGlassTokens.spacing.large,
      }}
    >
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: liquidGlassTokens.spacing.small,
          background: 'none',
          border: 'none',
          color: liquidGlassTokens.colors.label,
          fontSize: liquidGlassTokens.typography.headline.size,
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: isFilterOpen ? liquidGlassTokens.spacing.medium : 0,
        }}
      >
        <FilterIcon />
        Miniature Filters
        <motion.div
          animate={{ rotate: isFilterOpen ? 180 : 0 }}
          style={{ marginLeft: 'auto' }}
        >
          ▼
        </motion.div>
      </button>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: liquidGlassTokens.spacing.medium,
            }}
          >
            {Object.entries(MINIATURE_FILTERS).map(([filterType, filter]) => (
              <div key={filterType}>
                <h4 style={{
                  color: liquidGlassTokens.colors.label,
                  fontSize: liquidGlassTokens.typography.subheadline.size,
                  fontWeight: '600',
                  marginBottom: liquidGlassTokens.spacing.small,
                }}>
                  {filter.name}
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: liquidGlassTokens.spacing.tiny,
                }}>
                  {filter.options.map((option) => {
                    const isActive = activeFilters[filterType]?.includes(option) || false;
                    return (
                      <button
                        key={option}
                        onClick={() => {
                          const currentFilters = activeFilters[filterType] || [];
                          const newFilters = isActive
                            ? currentFilters.filter(f => f !== option)
                            : [...currentFilters, option];
                          onFilterChange(filterType, newFilters);
                        }}
                        style={{
                          padding: `${liquidGlassTokens.spacing.tiny} ${liquidGlassTokens.spacing.small}`,
                          borderRadius: liquidGlassTokens.cornerRadius.small,
                          border: '1px solid rgba(76, 29, 149, 0.3)',
                          backgroundColor: isActive 
                            ? 'rgba(76, 29, 149, 0.8)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          color: isActive 
                            ? liquidGlassTokens.colors.label 
                            : liquidGlassTokens.colors.secondaryLabel,
                          fontSize: liquidGlassTokens.typography.caption1.size,
                          cursor: 'pointer',
                          transition: `all ${liquidGlassTokens.animation.duration.short}`,
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Homepage Component
interface PetersenGamesHomepageProps {}

const PetersenGamesHomepage: React.FC<PetersenGamesHomepageProps> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [products, setProducts] = useState<PetersenProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PetersenProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart functionality
  const { addToCart, getCartItemCount, openCart } = useCart();

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter products when category, search, or filters change
  useEffect(() => {
    filterProducts();
  }, [products, activeCategory, searchQuery, activeFilters]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let loadedProducts: PetersenProduct[];
      
      if (activeCategory === 'all') {
        loadedProducts = await getAllProducts();
      } else {
        loadedProducts = await getProductsByCategory(activeCategory);
      }
      
      setProducts(loadedProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = async () => {
    let filtered = [...products];

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = getProductsByPetersenCategory(filtered, activeCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply miniature filters
    if (activeCategory === 'miniatures' && Object.keys(activeFilters).some(key => activeFilters[key]?.length > 0)) {
      filtered = filterMiniatureProducts(filtered, activeFilters);
    }

    setFilteredProducts(filtered);
  };

  const handleCategorySelect = useCallback(async (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveFilters({}); // Reset filters when changing category
    
    // Load category-specific products
    try {
      setIsLoading(true);
      let categoryProducts: PetersenProduct[];
      
      if (categoryId === 'all') {
        categoryProducts = await getAllProducts();
      } else {
        categoryProducts = await getProductsByCategory(categoryId);
      }
      
      setProducts(categoryProducts);
    } catch (err) {
      setError('Failed to load category products');
      console.error('Error loading category products:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      try {
        const searchResults = await searchProducts(query);
        setProducts(searchResults);
        setActiveCategory('all'); // Reset category when searching
      } catch (err) {
        console.error('Search error:', err);
      }
    } else {
      // Reload all products when search is cleared
      loadProducts();
    }
  }, []);

  const handleAddToCart = useCallback(async (product: PetersenProduct) => {
    try {
      const defaultVariant = product.variants[0];
      if (defaultVariant) {
        await addToCart(defaultVariant.id, 1);
      }
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  }, [addToCart]);

  const handleFilterChange = useCallback((filterType: string, values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  }, []);

  return (
    <div className="quantum-background" style={{ minHeight: '100vh' }}>
      {/* Navigation Header */}
      <nav className="nav">
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${liquidGlassTokens.spacing.medium} 0`,
          }}>
            {/* Logo */}
            <h1 style={{
              color: liquidGlassTokens.colors.label,
              fontSize: liquidGlassTokens.typography.title2.size,
              fontWeight: '700',
              margin: 0,
            }}>
              Petersen Games
            </h1>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                gap: liquidGlassTokens.spacing.large,
                alignItems: 'center',
              }}>
                <button
                  onClick={() => handleCategorySelect('all')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeCategory === 'all' 
                      ? liquidGlassTokens.colors.systemBlue 
                      : liquidGlassTokens.colors.secondaryLabel,
                    fontSize: liquidGlassTokens.typography.body.size,
                    fontWeight: activeCategory === 'all' ? '600' : '400',
                    cursor: 'pointer',
                    transition: `color ${liquidGlassTokens.animation.duration.short}`,
                  }}
                >
                  All Products
                </button>
                {Object.values(PRODUCT_CATEGORIES).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeCategory === category.id 
                        ? liquidGlassTokens.colors.systemBlue 
                        : liquidGlassTokens.colors.secondaryLabel,
                      fontSize: liquidGlassTokens.typography.body.size,
                      fontWeight: activeCategory === category.id ? '600' : '400',
                      cursor: 'pointer',
                      transition: `color ${liquidGlassTokens.animation.duration.short}`,
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Menu Button & Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: liquidGlassTokens.spacing.medium }}>
              {/* Search Bar */}
              <div style={{
                position: 'relative',
                width: isMobile ? '150px' : '250px',
              }}>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="form-input"
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    height: '40px',
                  }}
                />
                <SearchIcon />
              </div>

              {isMobile && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: liquidGlassTokens.colors.label,
                    cursor: 'pointer',
                    padding: liquidGlassTokens.spacing.small,
                  }}
                >
                  <MenuIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Categories Bar */}
      {isMobile && (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderBottom: `1px solid ${liquidGlassTokens.colors.separator}`,
          padding: liquidGlassTokens.spacing.medium,
          overflowX: 'auto',
        }}>
          <div style={{
            display: 'flex',
            gap: liquidGlassTokens.spacing.small,
            minWidth: 'max-content',
          }}>
            <button
              onClick={() => handleCategorySelect('all')}
              className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              All
            </button>
            {Object.values(PRODUCT_CATEGORIES).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ whiteSpace: 'nowrap' }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">Epic Tabletop Adventures</h1>
          <p className="hero-subtitle">
            Discover immersive games, detailed miniatures, and legendary stories
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Shop All Games</button>
            <button className="btn btn-secondary">New Releases</button>
          </div>
        </section>

        {/* Filters (for Miniatures) */}
        <FilterComponent
          activeCategory={activeCategory}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Products Section */}
        <section className="section">
          <h2 className="section-title">
            {activeCategory === 'all' 
              ? 'All Products' 
              : PRODUCT_CATEGORIES[activeCategory as keyof typeof PRODUCT_CATEGORIES]?.name || 'Products'
            }
          </h2>
          
          {/* Loading State */}
          {isLoading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="glass-card" style={{ opacity: 0.6 }}>
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: 'rgba(76, 29, 149, 0.3)',
                    borderRadius: liquidGlassTokens.cornerRadius.medium,
                    marginBottom: '16px',
                  }} />
                  <div style={{
                    height: '24px',
                    backgroundColor: 'rgba(76, 29, 149, 0.3)',
                    borderRadius: '4px',
                    marginBottom: '8px',
                  }} />
                  <div style={{
                    height: '16px',
                    backgroundColor: 'rgba(76, 29, 149, 0.2)',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    width: '60%',
                  }} />
                  <div style={{
                    height: '40px',
                    backgroundColor: 'rgba(76, 29, 149, 0.3)',
                    borderRadius: '8px',
                  }} />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: liquidGlassTokens.colors.systemRed,
            }}>
              <p>{error}</p>
              <button 
                onClick={loadProducts}
                className="btn btn-secondary"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && !error && (
            <div className="product-grid">
              {filteredProducts.length === 0 ? (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '40px',
                  color: liquidGlassTokens.colors.secondaryLabel,
                }}>
                  <p>No products found matching your criteria.</p>
                  {(searchQuery || Object.keys(activeFilters).some(key => activeFilters[key]?.length > 0)) && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilters({});
                        setActiveCategory('all');
                        loadProducts();
                      }}
                      className="btn btn-secondary"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          className="product-image"
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: 'rgba(76, 29, 149, 0.3)',
                          borderRadius: liquidGlassTokens.cornerRadius.medium,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: liquidGlassTokens.colors.secondaryLabel,
                        }}>
                          {product.title}
                        </div>
                      )}
                    </div>
                    <div className="product-content">
                      <h3 className="product-title">{product.title}</h3>
                      
                      <div className="product-price">
                        {product.compareAtPriceRange?.minVariantPrice && 
                         parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > parseFloat(product.priceRange.minVariantPrice.amount) && (
                          <span className="shopify-compare-price">
                            ${product.compareAtPriceRange.minVariantPrice.amount}
                          </span>
                        )}
                        <span className="shopify-price">
                          ${product.priceRange.minVariantPrice.amount}
                        </span>
                      </div>
                      
                      <p className="product-description">
                        {product.description.length > 100 
                          ? product.description.substring(0, 100) + '...' 
                          : product.description}
                      </p>
                      
                      {/* Category Badge */}
                      <div style={{
                        marginBottom: '12px',
                        display: 'flex',
                        gap: '4px',
                        flexWrap: 'wrap',
                      }}>
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          backgroundColor: 'rgba(76, 29, 149, 0.6)',
                          color: 'white',
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                        }}>
                          {product.category.replace('-', ' ')}
                        </span>
                        {product.characterClass && (
                          <span style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            backgroundColor: 'rgba(99, 102, 241, 0.6)',
                            color: 'white',
                            borderRadius: '4px',
                          }}>
                            {product.characterClass}
                          </span>
                        )}
                      </div>
                      
                      <button 
                        className="btn btn-primary w-full"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.availableForSale}
                      >
                        {product.availableForSale ? 'Add to Cart' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      {/* Cart Mini */}
      <CartMini />
    </div>
  );
};

export default PetersenGamesHomepage;
export type { PetersenGamesHomepageProps };