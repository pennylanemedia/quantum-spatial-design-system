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

const CloseIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

// Mobile Dropdown Menu Component
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
          {/* Backdrop with dark oil slick effect */}
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
              background: `linear-gradient(135deg, 
                rgba(0, 0, 0, 0.85) 0%, 
                rgba(30, 27, 75, 0.8) 25%, 
                rgba(45, 27, 105, 0.75) 50%, 
                rgba(30, 27, 75, 0.8) 75%, 
                rgba(0, 0, 0, 0.85) 100%
              )`,
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              zIndex: 1000,
            }}
          />
          
          {/* Dropdown Menu Panel */}
          <motion.div
            initial={{ y: '-100%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '-100%', opacity: 0, scale: 0.95 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.4
            }}
            style={{
              position: 'fixed',
              top: '80px', // Below the nav bar
              left: '16px',
              right: '16px',
              maxHeight: '70vh',
              background: `linear-gradient(135deg, 
                rgba(0, 0, 0, 0.95) 0%, 
                rgba(15, 10, 25, 0.9) 25%, 
                rgba(30, 27, 75, 0.85) 50%, 
                rgba(15, 10, 25, 0.9) 75%, 
                rgba(0, 0, 0, 0.95) 100%
              )`,
              backdropFilter: 'blur(60px) saturate(180%) brightness(120%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(120%)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '24px',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: `
                0 32px 64px rgba(0, 0, 0, 0.8),
                0 16px 32px rgba(45, 27, 105, 0.4),
                0 0 80px rgba(139, 92, 246, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 24px 16px',
              borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Shop Categories
              </h2>
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.95 }}
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
                }}
              >
                <CloseIcon />
              </motion.button>
            </div>

            {/* Categories */}
            <div style={{ 
              flex: 1, 
              overflow: 'auto', 
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {/* All Products */}
              <motion.button
                onClick={() => {
                  onCategorySelect('all');
                  onClose();
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '16px',
                  background: activeCategory === 'all' 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${activeCategory === 'all' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '16px',
                  color: activeCategory === 'all' ? 'white' : 'rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: activeCategory === 'all' ? '600' : '500',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span style={{ marginRight: '12px', fontSize: '20px' }}>🛍️</span>
                All Products
              </motion.button>

              {Object.values(PRODUCT_CATEGORIES).map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    onCategorySelect(category.id);
                    onClose();
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + (index * 0.05) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '16px',
                    background: activeCategory === category.id 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${activeCategory === category.id ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '16px',
                    color: activeCategory === category.id ? 'white' : 'rgba(255, 255, 255, 0.9)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: activeCategory === category.id ? '600' : '500',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>
                    {category.icon}
                  </span>
                  {category.name}
                </motion.button>
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

// Enhanced Category Filter Widget Component
interface CategoryFilterWidgetProps {
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryFilterWidget: React.FC<CategoryFilterWidgetProps> = ({ activeCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const isExpanded = (categoryId: string) => expandedCategories.has(categoryId);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: quantumTokens.spacing.sm,
      marginBottom: quantumTokens.spacing.xxl,
    }}>
      {/* Home Button */}
      <motion.button
        onClick={() => window.location.href = '/'}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(139, 92, 246, 0.15) 50%, 
            rgba(255, 255, 255, 0.1) 100%
          )`,
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '14px 18px',
          color: 'rgb(245, 245, 247)',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          transition: 'all 0.3s ease',
          textAlign: 'left',
          width: '100%',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 4px 16px rgba(139, 92, 246, 0.2)
          `,
        }}
      >
        🏠 Home
      </motion.button>

      {/* All Products Button */}
      <motion.button
        onClick={() => onCategorySelect('all')}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{
          background: activeCategory === 'all' 
            ? `linear-gradient(135deg, 
                rgba(139, 92, 246, 0.5) 0%, 
                rgba(99, 102, 241, 0.4) 50%, 
                rgba(139, 92, 246, 0.5) 100%
              )`
            : `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(139, 92, 246, 0.15) 50%, 
                rgba(255, 255, 255, 0.1) 100%
              )`,
          border: `1px solid ${activeCategory === 'all' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.3)'}`,
          borderRadius: '16px',
          padding: '14px 18px',
          color: activeCategory === 'all' ? 'white' : 'rgb(245, 245, 247)',
          fontSize: '14px',
          fontWeight: activeCategory === 'all' ? '700' : '600',
          cursor: 'pointer',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          transition: 'all 0.3s ease',
          textAlign: 'left',
          width: '100%',
          boxShadow: activeCategory === 'all'
            ? `
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 8px 24px rgba(139, 92, 246, 0.4),
                0 0 32px rgba(139, 92, 246, 0.2)
              `
            : `
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 4px 16px rgba(139, 92, 246, 0.2)
              `,
        }}
      >
        🛍️ All Products
      </motion.button>

      {/* Category Buttons with Expandable Subcategories */}
      {Object.values(PRODUCT_CATEGORIES).map((category) => (
        <div key={category.id} style={{ width: '100%' }}>
          {/* Main Category Button */}
          <motion.div
            style={{
              background: activeCategory === category.id 
                ? `linear-gradient(135deg, 
                    rgba(139, 92, 246, 0.5) 0%, 
                    rgba(99, 102, 241, 0.4) 50%, 
                    rgba(139, 92, 246, 0.5) 100%
                  )`
                : `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(139, 92, 246, 0.15) 50%, 
                    rgba(255, 255, 255, 0.1) 100%
                  )`,
              border: `1px solid ${activeCategory === category.id ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.3)'}`,
              borderRadius: '16px',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              transition: 'all 0.3s ease',
              width: '100%',
              overflow: 'hidden',
              boxShadow: activeCategory === category.id
                ? `
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    0 8px 24px rgba(139, 92, 246, 0.4),
                    0 0 32px rgba(139, 92, 246, 0.2)
                  `
                : `
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 4px 16px rgba(139, 92, 246, 0.2)
                  `,
            }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <button
              onClick={() => {
                onCategorySelect(category.id);
                toggleCategory(category.id);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '14px 18px',
                color: activeCategory === category.id ? 'white' : 'rgb(245, 245, 247)',
                fontSize: '14px',
                fontWeight: activeCategory === category.id ? '700' : '600',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>{category.icon}</span>
                {category.name}
              </span>
              <motion.div
                animate={{ rotate: isExpanded(category.id) ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '12px',
                }}
              >
                ▼
              </motion.div>
            </button>

            {/* Expandable Subcategories */}
            <AnimatePresence>
              {isExpanded(category.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: 'easeInOut',
                    opacity: { duration: 0.2 }
                  }}
                  style={{
                    overflow: 'hidden',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: `linear-gradient(135deg, 
                      rgba(0, 0, 0, 0.2) 0%, 
                      rgba(139, 92, 246, 0.1) 50%, 
                      rgba(0, 0, 0, 0.2) 100%
                    )`,
                  }}
                >
                  <div style={{
                    padding: '12px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}>
                    {category.subcategories.map((subcategory, index) => (
                      <motion.button
                        key={subcategory}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05,
                          ease: 'easeOut'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCategorySelect(category.id);
                          // Additional subcategory filtering logic can be added here
                        }}
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.05) 0%, 
                            rgba(139, 92, 246, 0.1) 100%
                          )`,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, 
                            rgba(139, 92, 246, 0.2) 0%, 
                            rgba(99, 102, 241, 0.15) 100%
                          )`;
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.05) 0%, 
                            rgba(139, 92, 246, 0.1) 100%
                          )`;
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        • {subcategory}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ))}

      {/* Special Cthulhu Wars Button */}
      <motion.button
        onClick={() => window.location.href = '/cthulhu-wars'}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(135deg, 
            rgba(30, 27, 75, 0.8) 0%, 
            rgba(139, 92, 246, 0.4) 50%, 
            rgba(30, 27, 75, 0.8) 100%
          )`,
          border: '1px solid rgba(139, 92, 246, 0.5)',
          borderRadius: '16px',
          padding: '14px 18px',
          color: 'rgb(245, 245, 247)',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          transition: 'all 0.3s ease',
          textAlign: 'left',
          width: '100%',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 6px 20px rgba(139, 92, 246, 0.3),
            0 0 40px rgba(30, 27, 75, 0.2)
          `,
        }}
      >
        🐙 Cthulhu Wars
      </motion.button>
    </div>
  );
};

// Main Homepage Component
interface PetersenGamesHomepageProps {}

const PetersenGamesHomepage: React.FC<PetersenGamesHomepageProps> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  // Back to top scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="quantum-background-enhanced" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar */}
      <nav className="nav-enhanced" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: quantumTokens.spacing.md,
        background: `linear-gradient(180deg, 
          rgba(0, 0, 0, 0.95) 0%,
          rgba(15, 10, 25, 0.9) 40%,
          rgba(30, 27, 75, 0.7) 70%,
          rgba(0, 0, 0, 0.4) 90%,
          transparent 100%
        )`,
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        borderBottom: 'none',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Logo - Always visible */}
          <a href="/" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <img 
              src="./assets/PetersenGames-horizontal-logo.svg"
              alt="Petersen Games"
              style={{
                height: isMobile ? '28px' : '40px',
                width: 'auto',
                filter: 'brightness(1.3) contrast(1.2)',
                transition: 'all 0.3s ease',
                maxWidth: isMobile ? '140px' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.4) drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1.2) contrast(1.1)';
              }}
            />
          </a>


          {/* Search & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: quantumTokens.spacing.sm }}>
            {/* Mobile Search - Expandable with Opacity Animation */}
            {isMobile ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <AnimatePresence>
                  {isSearchExpanded ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0, scale: 0.8 }}
                      animate={{ width: '220px', opacity: 1, scale: 1 }}
                      exit={{ width: 0, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 40px 10px 16px',
                          height: '36px',
                          fontSize: '14px',
                          background: `linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.15) 0%, 
                            rgba(99, 102, 241, 0.1) 100%
                          )`,
                          border: '1px solid rgba(99, 102, 241, 0.4)',
                          borderRadius: '18px',
                          color: 'white',
                          outline: 'none',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          transition: 'all 0.3s ease',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        }}
                        autoFocus
                        onBlur={() => {
                          if (!searchQuery) {
                            setIsSearchExpanded(false);
                          }
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.7)';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          if (!searchQuery) {
                            setIsSearchExpanded(false);
                          }
                          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                        }}
                      />
                      <motion.button
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchExpanded(false);
                        }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          borderRadius: '50%',
                          color: 'rgba(255, 255, 255, 0.7)',
                          cursor: 'pointer',
                          padding: '4px',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <CloseIcon size={12} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={() => setIsSearchExpanded(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '36px',
                        height: '36px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{
                        opacity: 0.7,
                        transition: 'all 0.3s ease',
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.filter = 'none';
                      }}
                      >
                        <SearchIcon />
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Desktop Search - Always visible */
              <div style={{
                position: 'relative',
                width: '300px',
              }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="input-enhanced"
                  style={{
                    width: '100%',
                    paddingLeft: '45px',
                    height: '36px',
                    fontSize: '16px',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: quantumTokens.colors.textTertiary,
                }}>
                  <SearchIcon />
                </div>
              </div>
            )}
            
            <motion.button
              onClick={openCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: quantumTokens.spacing.sm,
                padding: isMobile ? '8px 12px' : `${quantumTokens.spacing.sm} ${quantumTokens.spacing.md}`,
                borderRadius: isMobile ? '18px' : quantumTokens.radius.lg,
                position: 'relative',
                minWidth: isMobile ? '36px' : 'auto',
                height: isMobile ? '36px' : 'auto',
                background: `linear-gradient(135deg, 
                  rgba(99, 102, 241, 0.8) 0%, 
                  rgba(139, 92, 246, 0.7) 50%, 
                  rgba(99, 102, 241, 0.8) 100%
                )`,
                border: '1px solid rgba(99, 102, 241, 0.4)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 4px 16px rgba(99, 102, 241, 0.3)
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, 
                  rgba(99, 102, 241, 0.9) 0%, 
                  rgba(139, 92, 246, 0.8) 50%, 
                  rgba(99, 102, 241, 0.9) 100%
                )`;
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                e.currentTarget.style.boxShadow = `
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  0 8px 24px rgba(99, 102, 241, 0.4),
                  0 0 32px rgba(139, 92, 246, 0.2)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, 
                  rgba(99, 102, 241, 0.8) 0%, 
                  rgba(139, 92, 246, 0.7) 50%, 
                  rgba(99, 102, 241, 0.8) 100%
                )`;
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                e.currentTarget.style.boxShadow = `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 4px 16px rgba(99, 102, 241, 0.3)
                `;
              }}
            >
              <CartIcon />
              {getCartItemCount() > 0 && (
                <span style={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #6366F1 100%)',
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
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 212, 255, 0.3)',
                }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.12) 0%, 
                    rgba(99, 102, 241, 0.15) 100%
                  )`,
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  borderRadius: '12px',
                  padding: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '36px',
                  height: '36px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <MenuIcon />
              </motion.button>
            )}
          </div>
        </div>
      </nav>


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

          {/* Enhanced Sticky Category Filter Widget */}
          <CategoryFilterWidget
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
          />

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
            alignItems: 'stretch',
            justifyContent: 'center',
            textAlign: 'center',
            background: `linear-gradient(135deg, 
              rgba(0, 0, 0, 0.3) 0%, 
              rgba(45, 27, 105, 0.4) 25%, 
              rgba(76, 29, 149, 0.3) 50%, 
              rgba(99, 102, 241, 0.2) 75%, 
              rgba(0, 0, 0, 0.6) 100%
            ), url('/assets/cthulhu-dire.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}>
            {/* Glass overlay for better text readability - only at bottom */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.7) 100%)',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
            }} />
            
            {/* Hero Content */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: isMobile ? '100%' : '800px',
              padding: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.xl,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '100%',
              paddingBottom: isMobile ? '60px' : '80px',
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
                  background: 'linear-gradient(135deg, #00D4FF 0%, #6366F1 30%, #8B5CF6 60%, #A855F7 80%, #00B4D8 100%)',
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
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 25%, #00B4D8 50%, #00D4FF 75%, #20E0D6 100%)',
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
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 30%, #00B4D8 60%, #00D4FF 85%, #20E0D6 100%)',
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
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(0, 180, 216, 0.3)',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 180, 216, 0.6), 0 0 80px rgba(32, 224, 214, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(0, 180, 216, 0.3)';
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
                    onClick={() => window.location.href = `/products/${product.handle || product.id}`}
                    style={{
                      minWidth: isMobile ? '280px' : '320px',
                      width: isMobile ? '280px' : '320px',
                      padding: isMobile ? quantumTokens.spacing.md : quantumTokens.spacing.lg,
                      cursor: 'pointer',
                      flexShrink: 0,
                      scrollSnapAlign: 'start',
                      background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(99, 102, 241, 0.1) 30%, 
                        rgba(139, 92, 246, 0.08) 70%, 
                        rgba(255, 255, 255, 0.12) 100%
                      )`,
                      backdropFilter: 'blur(30px) saturate(160%)',
                      WebkitBackdropFilter: 'blur(30px) saturate(160%)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '24px',
                      boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        0 12px 40px rgba(99, 102, 241, 0.2),
                        0 6px 20px rgba(255, 255, 255, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.08)
                      `,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.22) 0%, 
                        rgba(99, 102, 241, 0.15) 30%, 
                        rgba(139, 92, 246, 0.12) 70%, 
                        rgba(255, 255, 255, 0.18) 100%
                      )`;
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.boxShadow = `
                        inset 0 1px 0 rgba(255, 255, 255, 0.4),
                        0 16px 60px rgba(99, 102, 241, 0.3),
                        0 8px 30px rgba(255, 255, 255, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.12)
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(99, 102, 241, 0.1) 30%, 
                        rgba(139, 92, 246, 0.08) 70%, 
                        rgba(255, 255, 255, 0.12) 100%
                      )`;
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.boxShadow = `
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        0 12px 40px rgba(99, 102, 241, 0.2),
                        0 6px 20px rgba(255, 255, 255, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.08)
                      `;
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
                    opacity: 0.8,
                    padding: quantumTokens.spacing.lg,
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.15) 0%, 
                      rgba(99, 102, 241, 0.1) 50%, 
                      rgba(139, 92, 246, 0.08) 100%
                    )`,
                    backdropFilter: 'blur(20px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.3),
                      0 8px 32px rgba(99, 102, 241, 0.2),
                      0 4px 16px rgba(255, 255, 255, 0.1)
                    `,
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
                      onClick={() => window.location.href = `/products/${product.handle || product.id}`}
                      style={{
                        padding: quantumTokens.spacing.lg,
                        cursor: 'pointer',
                        background: `linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.12) 0%, 
                          rgba(99, 102, 241, 0.08) 30%, 
                          rgba(139, 92, 246, 0.06) 70%, 
                          rgba(255, 255, 255, 0.08) 100%
                        )`,
                        backdropFilter: 'blur(25px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(25px) saturate(150%)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        boxShadow: `
                          inset 0 1px 0 rgba(255, 255, 255, 0.25),
                          0 8px 32px rgba(99, 102, 241, 0.15),
                          0 4px 16px rgba(255, 255, 255, 0.08),
                          0 0 0 1px rgba(255, 255, 255, 0.05)
                        `,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.18) 0%, 
                          rgba(99, 102, 241, 0.12) 30%, 
                          rgba(139, 92, 246, 0.10) 70%, 
                          rgba(255, 255, 255, 0.12) 100%
                        )`;
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.boxShadow = `
                          inset 0 1px 0 rgba(255, 255, 255, 0.35),
                          0 12px 48px rgba(99, 102, 241, 0.25),
                          0 8px 24px rgba(255, 255, 255, 0.12),
                          0 0 0 1px rgba(255, 255, 255, 0.1)
                        `;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.12) 0%, 
                          rgba(99, 102, 241, 0.08) 30%, 
                          rgba(139, 92, 246, 0.06) 70%, 
                          rgba(255, 255, 255, 0.08) 100%
                        )`;
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.boxShadow = `
                          inset 0 1px 0 rgba(255, 255, 255, 0.25),
                          0 8px 32px rgba(99, 102, 241, 0.15),
                          0 4px 16px rgba(255, 255, 255, 0.08),
                          0 0 0 1px rgba(255, 255, 255, 0.05)
                        `;
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

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: isMobile ? '24px' : '32px',
              right: isMobile ? '24px' : '32px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, 
                rgba(139, 92, 246, 0.9) 0%, 
                rgba(99, 102, 241, 0.8) 50%, 
                rgba(76, 29, 149, 0.9) 100%
              )`,
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              boxShadow: `
                0 8px 32px rgba(139, 92, 246, 0.4),
                0 4px 16px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              transition: 'all 0.3s ease',
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Dark Purple Glass Footer */}
      <footer style={{
        marginTop: 'auto',
        position: 'relative',
        background: `linear-gradient(180deg, 
          rgba(0, 0, 0, 0) 0%,
          rgba(15, 10, 25, 0.4) 15%,
          rgba(30, 27, 75, 0.6) 30%,
          rgba(45, 27, 105, 0.75) 45%,
          rgba(76, 29, 149, 0.85) 60%,
          rgba(99, 102, 241, 0.9) 75%,
          rgba(139, 92, 246, 0.95) 85%,
          rgba(30, 27, 75, 0.98) 95%,
          rgba(0, 0, 0, 1) 100%
        )`,
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        borderTop: '1px solid rgba(139, 92, 246, 0.3)',
        padding: isMobile ? `${quantumTokens.spacing.xxl} ${quantumTokens.spacing.md}` : `${quantumTokens.spacing.xxl} ${quantumTokens.spacing.lg}`,
        overflow: 'hidden',
      }}>
        {/* Floating cosmic orbs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulse 12s ease-in-out infinite',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'pulse 15s ease-in-out infinite reverse',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Main Footer Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr 1fr',
            gap: isMobile ? quantumTokens.spacing.xl : quantumTokens.spacing.xxl,
            marginBottom: quantumTokens.spacing.xxl,
            alignItems: 'start',
          }}>
            
            {/* Logo Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: quantumTokens.spacing.md,
            }}>
              <img 
                src="/assets/PetersenGames-horizontal-logo.svg" 
                alt="Petersen Games"
                style={{
                  height: isMobile ? '36px' : '48px',
                  width: 'auto',
                  filter: 'brightness(1.1) saturate(130%)',
                  transition: 'all 0.3s ease',
                  marginBottom: quantumTokens.spacing.sm,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.3) saturate(150%) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1) saturate(130%)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                lineHeight: '1.5',
                textAlign: isMobile ? 'center' : 'left',
                margin: 0,
                maxWidth: '240px',
              }}>
                Creating legendary gaming experiences that blend strategic depth with cosmic horror.
              </p>
            </div>

            {/* Footer Links */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? quantumTokens.spacing.lg : quantumTokens.spacing.xl,
            }}>
              
              {/* Shop Links */}
              <div>
                <h4 style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: quantumTokens.spacing.md,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Shop</h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: quantumTokens.spacing.xs,
                }}>
                  {['All Products', 'Core Games', 'Expansions', 'Miniatures', 'Books', 'Accessories'].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'all 0.2s ease',
                          display: 'block',
                          padding: '2px 0',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'rgba(139, 92, 246, 0.9)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: quantumTokens.spacing.md,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Company</h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: quantumTokens.spacing.xs,
                }}>
                  {['About Us', 'Contact', 'News', 'Press Kit', 'Careers', 'Community'].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'all 0.2s ease',
                          display: 'block',
                          padding: '2px 0',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'rgba(139, 92, 246, 0.9)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: quantumTokens.spacing.md,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Support</h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: quantumTokens.spacing.xs,
                }}>
                  {['Help Center', 'Shipping Info', 'Returns', 'FAQ', 'Contact Support', 'Game Rules'].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'all 0.2s ease',
                          display: 'block',
                          padding: '2px 0',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'rgba(139, 92, 246, 0.9)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social & Newsletter */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-end',
              gap: quantumTokens.spacing.lg,
            }}>
              <h4 style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '16px',
                fontWeight: '600',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Connect</h4>
              
              {/* Social Links */}
              <div style={{
                display: 'flex',
                gap: quantumTokens.spacing.md,
                alignItems: 'center',
              }}>
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{
            borderTop: '1px solid rgba(139, 92, 246, 0.2)',
            paddingTop: quantumTokens.spacing.lg,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: quantumTokens.spacing.md,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: isMobile ? quantumTokens.spacing.xs : quantumTokens.spacing.lg,
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '13px',
              textAlign: isMobile ? 'center' : 'left',
            }}>
              <span>© 2024 Petersen Games. All rights reserved.</span>
              {!isMobile && <span>•</span>}
              <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              {!isMobile && <span>•</span>}
              <a href="#terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            </div>

            <div style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px',
              fontStyle: 'italic',
              textAlign: isMobile ? 'center' : 'right',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '500',
              }}>
                Built with cosmic horror in mind
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced cosmic fade effect */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `linear-gradient(90deg, 
            transparent 0%,
            rgba(139, 92, 246, 0.4) 20%,
            rgba(99, 102, 241, 0.6) 40%,
            rgba(76, 29, 149, 0.8) 50%,
            rgba(99, 102, 241, 0.6) 60%,
            rgba(139, 92, 246, 0.4) 80%,
            transparent 100%
          )`,
          filter: 'blur(2px)',
          animation: 'cosmic-glow 6s ease-in-out infinite',
        }} />
      </footer>

      {/* Cart Mini */}
      <CartMini />
    </div>
  );
};

export default PetersenGamesHomepage;
export type { PetersenGamesHomepageProps };