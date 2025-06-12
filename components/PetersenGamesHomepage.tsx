'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { liquidGlassTokens } from './EcommerceSideMenu';

// Quantum Design Tokens
const quantumTokens = {
  colors: {
    primary: '#6366F1',
    secondary: '#8B5CF6', 
    accent: '#EC4899',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
    glass: 'rgba(255, 255, 255, 0.05)',
  },
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
};
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

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
    <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
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
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  if (activeCategory !== 'miniatures') {
    return (
      <div style={{
        padding: quantumTokens.spacing.lg,
        textAlign: 'center',
      }}>
        <h3 style={{
          color: quantumTokens.colors.textSecondary,
          fontSize: '16px',
          fontWeight: '500',
          marginBottom: quantumTokens.spacing.md,
        }}>
          Category Filters
        </h3>
        <p style={{
          color: quantumTokens.colors.textTertiary,
          fontSize: '14px',
          lineHeight: '1.5',
        }}>
          Select "Miniatures" to access advanced filtering options
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginBottom: quantumTokens.spacing.xl,
      }}
    >
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: quantumTokens.spacing.sm,
          background: 'none',
          border: 'none',
          color: quantumTokens.colors.text,
          fontSize: '18px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: quantumTokens.spacing.lg,
          width: '100%',
          padding: 0,
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
              display: 'flex',
              flexDirection: 'column',
              gap: quantumTokens.spacing.lg,
            }}
          >
            {Object.entries(MINIATURE_FILTERS).map(([filterType, filter]) => (
              <div key={filterType}>
                <h4 style={{
                  color: quantumTokens.colors.text,
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: quantumTokens.spacing.sm,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {filter.name}
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: quantumTokens.spacing.xs,
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
                          padding: `${quantumTokens.spacing.sm} ${quantumTokens.spacing.md}`,
                          borderRadius: quantumTokens.radius.md,
                          border: `1px solid ${isActive ? quantumTokens.colors.primary : 'rgba(255, 255, 255, 0.1)'}`,
                          background: isActive 
                            ? `linear-gradient(135deg, ${quantumTokens.colors.primary}20, ${quantumTokens.colors.secondary}20)` 
                            : 'rgba(255, 255, 255, 0.05)',
                          color: isActive 
                            ? quantumTokens.colors.primary 
                            : quantumTokens.colors.textSecondary,
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          fontWeight: isActive ? '600' : '400',
                          backdropFilter: 'blur(10px)',
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
    <div className="quantum-background-enhanced" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar */}
      <nav className="nav-enhanced" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: quantumTokens.spacing.md,
        borderBottom: `1px solid ${quantumTokens.colors.border}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Logo - Only on mobile */}
          {isMobile && (
            <a href="/" style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}>
              <img 
                src="/assets/PetersenGames-horizontal-logo.svg" 
                alt="Petersen Games"
                style={{
                  height: '24px',
                  width: 'auto',
                  filter: 'brightness(1.1)',
                  transition: 'all 0.3s ease',
                }}
              />
            </a>
          )}

            {/* Tab Navigation */}
            <div style={{
              display: isMobile ? 'none' : 'flex', // Hide tabs on mobile to save space
              gap: '8px',
              alignItems: 'center',
              marginTop: '10px',
            }}>
              <button
                onClick={() => handleCategorySelect('all')}
                style={{
                  background: activeCategory === 'all' 
                    ? 'rgba(139, 92, 246, 0.5)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  color: 'rgb(245, 245, 247)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '500',
                  opacity: activeCategory === 'all' ? 1 : 0.9,
                  transition: '0.2s',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transform: activeCategory === 'all' ? 'scale(1.05)' : 'scale(1)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== 'all') {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== 'all') {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                All Products
              </button>
              {Object.values(PRODUCT_CATEGORIES).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  style={{
                    background: activeCategory === category.id 
                      ? 'rgba(139, 92, 246, 0.5)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    color: 'rgb(245, 245, 247)',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '500',
                    opacity: activeCategory === category.id ? 1 : 0.9,
                    transition: '0.2s',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transform: activeCategory === category.id ? 'scale(1.05)' : 'scale(1)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.opacity = '0.9';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

          {/* Search & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: quantumTokens.spacing.sm }}>
            <div style={{
              position: 'relative',
              width: isMobile ? '120px' : '300px',
            }}>
              <input
                type="text"
                placeholder={isMobile ? "Search..." : "Search products..."}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="input-enhanced"
                style={{
                  width: '100%',
                  paddingLeft: isMobile ? '32px' : '45px',
                  height: '36px',
                  fontSize: isMobile ? '14px' : '16px',
                }}
              />
              <div style={{
                position: 'absolute',
                left: isMobile ? '8px' : '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: quantumTokens.colors.textTertiary,
              }}>
                <SearchIcon />
              </div>
            </div>
            
            <button
              onClick={openCart}
              className="btn-primary-glass"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: quantumTokens.spacing.sm,
                padding: isMobile ? `${quantumTokens.spacing.xs} ${quantumTokens.spacing.sm}` : `${quantumTokens.spacing.sm} ${quantumTokens.spacing.md}`,
                borderRadius: quantumTokens.radius.lg,
                position: 'relative',
                minWidth: isMobile ? '36px' : 'auto',
                height: isMobile ? '36px' : 'auto',
              }}
            >
              <CartIcon />
              {getCartItemCount() > 0 && (
                <span style={{
                  background: quantumTokens.colors.accent,
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '600',
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '36px',
                  height: '36px',
                }}
              >
                <MenuIcon />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Category Selection */}
      {isMobile && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(40px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
          padding: quantumTokens.spacing.md,
          overflowX: 'auto',
          display: 'flex',
          gap: quantumTokens.spacing.sm,
          whiteSpace: 'nowrap',
        }}>
          <button
            onClick={() => handleCategorySelect('all')}
            style={{
              background: activeCategory === 'all' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '20px',
              padding: '8px 16px',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            All
          </button>
          {Object.values(PRODUCT_CATEGORIES).map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              style={{
                background: activeCategory === category.id ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '20px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Main Layout */}
      <div style={{
        display: 'flex',
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        gap: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.xl,
        padding: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.lg,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Sidebar */}
        <div className="sidebar-enhanced" style={{
          width: '280px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px',
          borderRadius: quantumTokens.radius.xxl,
          padding: quantumTokens.spacing.xl,
          display: isMobile ? 'none' : 'block',
        }}>
          {/* Logo */}
          <div style={{
            marginBottom: quantumTokens.spacing.xxl,
            textAlign: 'center',
          }}>
            <a href="/" style={{
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              <img 
                src="/assets/PetersenGames-horizontal-logo.svg" 
                alt="Petersen Games"
                style={{
                  height: '48px',
                  width: 'auto',
                  filter: 'brightness(1.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.3) drop-shadow(0 0 15px rgba(99, 102, 241, 0.5))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
              />
            </a>
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: quantumTokens.spacing.sm,
            marginBottom: quantumTokens.spacing.xxl,
          }}>
            <motion.button
              onClick={() => window.location.href = '/'}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              🏠 Home
            </motion.button>

            <motion.button
              onClick={() => handleCategorySelect('all')}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                background: activeCategory === 'all' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              🛍️ Shop
            </motion.button>

            <motion.button
              onClick={() => handleCategorySelect('core-games')}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                background: activeCategory === 'core-games' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              🎯 Core Games
            </motion.button>

            <motion.button
              onClick={() => handleCategorySelect('expansions')}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                background: activeCategory === 'expansions' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              📦 Expansions
            </motion.button>

            <motion.button
              onClick={() => handleCategorySelect('miniatures')}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                background: activeCategory === 'miniatures' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              🗿 Miniatures
            </motion.button>

            <motion.button
              onClick={() => window.location.href = '/cthulhu-wars'}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              🐙 Cthulhu Wars
            </motion.button>
          </div>

          {/* Filters */}
          <FilterComponent
            activeCategory={activeCategory}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Epic Cthulhu Hero Section */}
          <section style={{
            position: 'relative',
            height: isMobile ? '70vh' : '100vh',
            minHeight: isMobile ? '400px' : '600px',
            maxHeight: isMobile ? '500px' : '800px',
            marginBottom: quantumTokens.spacing.xxl,
            borderRadius: isMobile ? quantumTokens.radius.lg : quantumTokens.radius.xxl,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: `linear-gradient(135deg, 
              rgba(0, 0, 0, 0.7) 0%, 
              rgba(45, 27, 105, 0.6) 25%, 
              rgba(76, 29, 149, 0.5) 50%, 
              rgba(99, 102, 241, 0.4) 75%, 
              rgba(0, 0, 0, 0.8) 100%
            ), url('/assets/cthulhu-dire.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
            {/* Glass overlay for better text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(45, 27, 105, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%)',
              backdropFilter: 'blur(2px) saturate(150%)',
              WebkitBackdropFilter: 'blur(2px) saturate(150%)',
            }} />
            
            {/* Hero Content */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: isMobile ? '100%' : '800px',
              padding: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.xl,
            }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  marginBottom: quantumTokens.spacing.lg,
                  background: 'linear-gradient(135deg, #00D4FF 0%, #6366F1 25%, #8B5CF6 50%, #EC4899 75%, #00FFB7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))',
                }}>
                  Built for<br />cosmic horror.
                </h1>
                
                <p style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  marginBottom: quantumTokens.spacing.xl,
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(99, 102, 241, 0.3)',
                  letterSpacing: '0.02em',
                }}>
                  Strategic mastery. Legendary gameplay.<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #FF453A 0%, #EC4899 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '600',
                  }}>
                    Personal terror.
                  </span>
                </p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                >
                  <button
                    onClick={() => handleCategorySelect('miniatures')}
                    style={{
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '25px',
                      color: 'white',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                      fontWeight: '700',
                      padding: '20px 50px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 48px rgba(99, 102, 241, 0.6), 0 0 80px rgba(139, 92, 246, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    🐙 Shop Demons
                  </button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Floating particles effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
              `,
              animation: 'pulse 4s ease-in-out infinite',
            }} />
          </section>
          
          {/* Product Carousel Section */}
          <section style={{
            marginBottom: quantumTokens.spacing.xxl,
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: quantumTokens.spacing.xxl,
            }}>
              <h2 className="hig-title" style={{
                marginBottom: quantumTokens.spacing.md,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Featured Miniatures
              </h2>
              <p className="hig-body" style={{
                color: quantumTokens.colors.textSecondary,
                maxWidth: '600px',
                margin: '0 auto',
              }}>
                Command armies of cosmic horror with our detailed miniatures collection
              </p>
            </div>
            
            {/* Product Carousel */}
            <div className="product-carousel-scroll" style={{
              display: 'flex',
              gap: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.lg,
              overflowX: 'auto',
              padding: `${quantumTokens.spacing.md} 0`,
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}>
              {/* Featured Product Cards - Filter for miniatures or create sample ones */}
              {filteredProducts
                .filter(product => 
                  product.category === 'miniatures' || 
                  product.tags?.some(tag => 
                    tag.toLowerCase().includes('miniature') ||
                    tag.toLowerCase().includes('cthulhu') ||
                    tag.toLowerCase().includes('planet') ||
                    tag.toLowerCase().includes('apocalypse')
                  )
                )
                .slice(0, 6)
                .map((product) => (
                  <motion.div
                    key={product.id}
                    className="product-card-enhanced"
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      minWidth: isMobile ? '280px' : '320px',
                      width: isMobile ? '280px' : '320px',
                      padding: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.lg,
                      cursor: 'pointer',
                      flexShrink: 0,
                      scrollSnapAlign: 'start',
                    }}
                  >
                    <div style={{
                      borderRadius: quantumTokens.radius.lg,
                      overflow: 'hidden',
                      marginBottom: quantumTokens.spacing.md,
                      position: 'relative',
                    }}>
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          style={{
                            width: '100%',
                            height: '280px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '280px',
                          background: `linear-gradient(135deg, 
                            rgba(99, 102, 241, 0.3) 0%, 
                            rgba(139, 92, 246, 0.2) 50%, 
                            rgba(236, 72, 153, 0.3) 100%
                          )`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: quantumTokens.colors.text,
                          fontSize: '16px',
                          fontWeight: '600',
                        }}>
                          🐙 {product.title}
                        </div>
                      )}
                      
                      {/* Horror overlay effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      className="horror-overlay"
                      />
                    </div>
                    
                    <div>
                      <h3 style={{
                        color: quantumTokens.colors.text,
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: quantumTokens.spacing.sm,
                        lineHeight: '1.4',
                      }}>{product.title}</h3>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: quantumTokens.spacing.sm,
                        marginBottom: quantumTokens.spacing.md,
                      }}>
                        <span style={{
                          color: quantumTokens.colors.primary,
                          fontSize: '24px',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                          ${product.priceRange.minVariantPrice.amount}
                        </span>
                      </div>
                      
                      <button 
                        className="btn-primary-glass"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.availableForSale}
                        style={{
                          width: '100%',
                          padding: `${quantumTokens.spacing.md} ${quantumTokens.spacing.lg}`,
                          borderRadius: quantumTokens.radius.lg,
                          fontWeight: '600',
                          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {product.availableForSale ? '🐙 Summon' : 'Sold Out'}
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>

          {/* Products Section */}
          <section style={{
            marginBottom: quantumTokens.spacing.xxl,
          }}>
            <h2 className="hig-headline" style={{
              marginBottom: quantumTokens.spacing.xl,
              color: quantumTokens.colors.text,
            }}>
              {activeCategory === 'all' 
                ? 'All Products' 
                : PRODUCT_CATEGORIES[activeCategory as keyof typeof PRODUCT_CATEGORIES]?.name || 'Products'
              }
            </h2>
          
            {/* Loading State */}
            {isLoading && (
              <div className="hig-grid" style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: quantumTokens.spacing.lg,
                marginBottom: quantumTokens.spacing.xxl,
              }}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="glass-card-enhanced" style={{ 
                    opacity: 0.6,
                    padding: quantumTokens.spacing.lg,
                  }}>
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: quantumTokens.colors.glass,
                      borderRadius: quantumTokens.radius.lg,
                      marginBottom: quantumTokens.spacing.md,
                    }} />
                    <div style={{
                      height: '24px',
                      backgroundColor: quantumTokens.colors.glass,
                      borderRadius: quantumTokens.radius.sm,
                      marginBottom: quantumTokens.spacing.sm,
                    }} />
                    <div style={{
                      height: '16px',
                      backgroundColor: quantumTokens.colors.glass,
                      borderRadius: quantumTokens.radius.sm,
                      marginBottom: quantumTokens.spacing.md,
                      width: '60%',
                    }} />
                    <div style={{
                      height: '40px',
                      backgroundColor: quantumTokens.colors.glass,
                      borderRadius: quantumTokens.radius.md,
                    }} />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="glass-card-enhanced" style={{
                textAlign: 'center',
                padding: quantumTokens.spacing.xxl,
                margin: `${quantumTokens.spacing.xl} 0`,
              }}>
                <p style={{
                  color: '#FF453A',
                  marginBottom: quantumTokens.spacing.lg,
                  fontSize: '16px',
                }}>{error}</p>
                <button 
                  onClick={loadProducts}
                  className="btn-secondary-glass"
                  style={{
                    padding: `${quantumTokens.spacing.md} ${quantumTokens.spacing.xl}`,
                  }}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Product Grid */}
            {!isLoading && !error && (
              <div className="hig-grid" style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: quantumTokens.spacing.lg,
              }}>
                {filteredProducts.length === 0 ? (
                  <div className="glass-card-enhanced" style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: quantumTokens.spacing.xxl,
                  }}>
                    <p style={{
                      color: quantumTokens.colors.textSecondary,
                      marginBottom: quantumTokens.spacing.lg,
                    }}>No products found matching your criteria.</p>
                    {(searchQuery || Object.keys(activeFilters).some(key => activeFilters[key]?.length > 0)) && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilters({});
                          setActiveCategory('all');
                          loadProducts();
                        }}
                        className="btn-secondary-glass"
                        style={{
                          padding: `${quantumTokens.spacing.md} ${quantumTokens.spacing.xl}`,
                        }}
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <motion.div 
                      key={product.id} 
                      className="product-card-enhanced"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: quantumTokens.spacing.lg,
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        borderRadius: quantumTokens.radius.lg,
                        overflow: 'hidden',
                        marginBottom: quantumTokens.spacing.md,
                      }}>
                        {product.featuredImage ? (
                          <img
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            style={{
                              width: '100%',
                              height: '240px',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '240px',
                            background: quantumTokens.colors.glass,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: quantumTokens.colors.textTertiary,
                            fontSize: '14px',
                          }}>
                            {product.title}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 style={{
                          color: quantumTokens.colors.text,
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: quantumTokens.spacing.sm,
                          lineHeight: '1.4',
                        }}>{product.title}</h3>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: quantumTokens.spacing.sm,
                          marginBottom: quantumTokens.spacing.md,
                        }}>
                          {product.compareAtPriceRange?.minVariantPrice && 
                           parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > parseFloat(product.priceRange.minVariantPrice.amount) && (
                            <span style={{
                              color: quantumTokens.colors.textTertiary,
                              textDecoration: 'line-through',
                              fontSize: '14px',
                            }}>
                              ${product.compareAtPriceRange.minVariantPrice.amount}
                            </span>
                          )}
                          <span style={{
                            color: quantumTokens.colors.primary,
                            fontSize: '20px',
                            fontWeight: '700',
                          }}>
                            ${product.priceRange.minVariantPrice.amount}
                          </span>
                        </div>
                        
                        <p style={{
                          color: quantumTokens.colors.textSecondary,
                          fontSize: '14px',
                          lineHeight: '1.5',
                          marginBottom: quantumTokens.spacing.md,
                        }}>
                          {product.description.length > 120 
                            ? product.description.substring(0, 120) + '...' 
                            : product.description}
                        </p>
                        
                        {/* Category Badge */}
                        <div style={{
                          marginBottom: quantumTokens.spacing.lg,
                          display: 'flex',
                          gap: quantumTokens.spacing.xs,
                          flexWrap: 'wrap',
                        }}>
                          <span style={{
                            fontSize: '11px',
                            padding: `${quantumTokens.spacing.xs} ${quantumTokens.spacing.sm}`,
                            background: quantumTokens.colors.primary,
                            color: 'white',
                            borderRadius: quantumTokens.radius.sm,
                            textTransform: 'capitalize',
                            fontWeight: '500',
                          }}>
                            {product.category.replace('-', ' ')}
                          </span>
                          {product.characterClass && (
                            <span style={{
                              fontSize: '11px',
                              padding: `${quantumTokens.spacing.xs} ${quantumTokens.spacing.sm}`,
                              background: quantumTokens.colors.secondary,
                              color: 'white',
                              borderRadius: quantumTokens.radius.sm,
                              fontWeight: '500',
                            }}>
                              {product.characterClass}
                            </span>
                          )}
                        </div>
                        
                        <button 
                          className="btn-primary-glass"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.availableForSale}
                          style={{
                            width: '100%',
                            padding: `${quantumTokens.spacing.md} ${quantumTokens.spacing.lg}`,
                            borderRadius: quantumTokens.radius.lg,
                            fontWeight: '600',
                            opacity: product.availableForSale ? 1 : 0.5,
                            cursor: product.availableForSale ? 'pointer' : 'not-allowed',
                          }}
                        >
                          {product.availableForSale ? 'Add to Cart' : 'Sold Out'}
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </section>

          {/* Cosmic Collective CTA Section */}
          <section style={{
            position: 'relative',
            marginBottom: quantumTokens.spacing.xxl,
            padding: `${quantumTokens.spacing.xxl} 0`,
            borderRadius: quantumTokens.radius.xxl,
            overflow: 'hidden',
            background: `
              radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 70%),
              linear-gradient(135deg, 
                rgba(30, 27, 75, 0.9) 0%, 
                rgba(45, 27, 105, 0.8) 25%, 
                rgba(76, 29, 149, 0.7) 50%, 
                rgba(99, 102, 241, 0.6) 75%, 
                rgba(30, 27, 75, 0.9) 100%
              )
            `,
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}>
            {/* Animated cosmic background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
              `,
              animation: 'pulse 6s ease-in-out infinite',
            }} />

            {/* Floating orbs */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
              filter: 'blur(20px)',
              animation: 'pulse 8s ease-in-out infinite',
            }} />
            
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '15%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
              filter: 'blur(15px)',
              animation: 'pulse 10s ease-in-out infinite reverse',
            }} />

            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '20%',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'pulse 12s ease-in-out infinite',
            }} />

            {/* Main content */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              padding: `0 ${quantumTokens.spacing.xl}`,
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <h2 style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: '800',
                  lineHeight: '1.2',
                  marginBottom: quantumTokens.spacing.lg,
                  background: 'linear-gradient(135deg, #00D4FF 0%, #6366F1 25%, #8B5CF6 50%, #EC4899 75%, #00FFB7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(99, 102, 241, 0.5)',
                  animation: 'cosmic-glow 4s ease-in-out infinite',
                }}>
                  Join the<br />cosmic collective.
                </h2>

                <p style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: '500',
                  lineHeight: '1.6',
                  marginBottom: quantumTokens.spacing.xxl,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                  maxWidth: '600px',
                  margin: `0 auto ${quantumTokens.spacing.xxl} auto`,
                }}>
                  Get <span style={{
                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '700',
                  }}>20% off</span> your first order plus exclusive early access to new releases and behind-the-scenes content from <span style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '600',
                  }}>Sandy Petersen</span>.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    gap: quantumTokens.spacing.md,
                    alignItems: isMobile ? 'stretch' : 'center',
                    justifyContent: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexWrap: isMobile ? 'nowrap' : 'wrap',
                    maxWidth: isMobile ? '100%' : '500px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    flex: isMobile ? 'none' : 1,
                    minWidth: isMobile ? 'auto' : '280px',
                    width: isMobile ? '100%' : 'auto',
                  }}>
                    <input
                      type="email"
                      placeholder="Enter your email to join the collective..."
                      style={{
                        width: '100%',
                        padding: `${quantumTokens.spacing.lg} ${quantumTokens.spacing.xl}`,
                        borderRadius: '25px',
                        border: '2px solid rgba(139, 92, 246, 0.4)',
                        background: `
                          linear-gradient(135deg, 
                            rgba(0, 0, 0, 0.8) 0%, 
                            rgba(45, 27, 105, 0.6) 50%, 
                            rgba(0, 0, 0, 0.8) 100%
                          )
                        `,
                        backdropFilter: 'blur(20px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '500',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.2), 0 8px 32px rgba(99, 102, 241, 0.4)';
                        e.currentTarget.style.background = `
                          linear-gradient(135deg, 
                            rgba(45, 27, 105, 0.9) 0%, 
                            rgba(76, 29, 149, 0.7) 50%, 
                            rgba(45, 27, 105, 0.9) 100%
                          )
                        `;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.background = `
                          linear-gradient(135deg, 
                            rgba(0, 0, 0, 0.8) 0%, 
                            rgba(45, 27, 105, 0.6) 50%, 
                            rgba(0, 0, 0, 0.8) 100%
                          )
                        `;
                      }}
                    />
                    
                    {/* Cosmic input glow effect */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '20px',
                      transform: 'translateY(-50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                      filter: 'blur(4px)',
                      opacity: 0.6,
                      animation: 'pulse 2s ease-in-out infinite',
                    }} />
                  </div>

                  <button
                    className="cosmic-button"
                    style={{
                      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '25px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      padding: `${quantumTokens.spacing.lg} ${quantumTokens.spacing.xxl}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      minWidth: isMobile ? 'auto' : '160px',
                      width: isMobile ? '100%' : 'auto',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 48px rgba(99, 102, 241, 0.6), 0 0 80px rgba(139, 92, 246, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    🌌 Join Now
                  </button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  style={{
                    marginTop: quantumTokens.spacing.xl,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: quantumTokens.spacing.lg,
                    flexWrap: 'wrap',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: quantumTokens.spacing.xs,
                  }}>
                    <span style={{ color: '#30D158' }}>✓</span>
                    No spam, ever
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: quantumTokens.spacing.xs,
                  }}>
                    <span style={{ color: '#30D158' }}>✓</span>
                    Unsubscribe anytime
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: quantumTokens.spacing.xs,
                  }}>
                    <span style={{ color: '#30D158' }}>✓</span>
                    Exclusive content
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onCategorySelect={(categoryId) => {
          handleCategorySelect(categoryId);
          setIsMobileMenuOpen(false);
        }}
      />

      {/* Cart Mini */}
      <CartMini />
    </div>
  );
};

export default PetersenGamesHomepage;
export type { PetersenGamesHomepageProps };