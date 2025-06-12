import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Quantum-Spatial Design Tokens
const designTokens = {
  colors: {
    background: '#060715',
    backgroundSecondary: '#131A36',
    backgroundTertiary: '#331F4A',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accent: '#5AC8FA',
    accentSecondary: '#BF4080',
    gradient: {
      primary: 'linear-gradient(135deg, #9EE1EC 0%, #E5A7E0 100%)',
      figma: 'linear-gradient(135deg, #0ACF83 0%, #A259FF 50%, #F24E1E 100%)',
      sketch: 'linear-gradient(135deg, #FDB300 0%, #EA6C00 50%, #FDAD00 100%)',
    }
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
  },
  animation: {
    fast: '150ms',
    medium: '300ms',
    slow: '500ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  }
};

// Icon Components
const PetGamesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5v3A1.5 1.5 0 0 0 6.5 7h3A1.5 1.5 0 0 0 11 5.5v-3A1.5 1.5 0 0 0 9.5 1h-3ZM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Z"/>
    <path d="M2 8.5A1.5 1.5 0 0 1 3.5 7h1A1.5 1.5 0 0 1 6 8.5v1A1.5 1.5 0 0 1 4.5 11h-1A1.5 1.5 0 0 1 2 9.5v-1Zm8 0A1.5 1.5 0 0 1 11.5 7h1A1.5 1.5 0 0 1 14 8.5v1A1.5 1.5 0 0 1 12.5 11h-1A1.5 1.5 0 0 1 10 9.5v-1Z"/>
  </svg>
);

const SubscriptionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2V4Zm0 1.383 6.4 3.84a.5.5 0 0 0 .4 0L14 5.383V12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.383Z"/>
  </svg>
);

const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path d="M5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5H8V2.5C8 1.11929 6.88071 0 5.5 0Z" fill="#F24E1E"/>
    <path d="M8 0H10.5C11.8807 0 13 1.11929 13 2.5C13 3.88071 11.8807 5 10.5 5H8V0Z" fill="#A259FF"/>
    <path d="M8 5H10.5C11.8807 5 13 6.11929 13 7.5C13 8.88071 11.8807 10 10.5 10H8V5Z" fill="#1ABCFE"/>
    <path d="M3 7.5C3 6.11929 4.11929 5 5.5 5H8V10H5.5C4.11929 10 3 8.88071 3 7.5Z" fill="#0ACF83"/>
    <path d="M3 12.5C3 11.1193 4.11929 10 5.5 10H8V12.5C8 13.8807 6.88071 15 5.5 15C4.11929 15 3 13.8807 3 12.5Z" fill="#F24E1E"/>
    <circle cx="10.5" cy="7.5" r="2.5" fill="#1ABCFE"/>
  </svg>
);

const SketchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path d="M8 1L13 6L8 15L3 6L8 1Z" fill="#FDB300"/>
    <path d="M8 1L10.5 6H5.5L8 1Z" fill="#EA6C00"/>
    <path d="M3 6L8 15L5.5 6H3Z" fill="#FDAD00"/>
    <path d="M13 6L8 15L10.5 6H13Z" fill="#FDD231"/>
    <path d="M5.5 6L8 15L10.5 6H5.5Z" fill="#FEEEB7"/>
  </svg>
);

const SplineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z"/>
    <path d="M5.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0V8.5h3a2.5 2.5 0 0 0 0-5h-3.5ZM6 5h3a1.5 1.5 0 0 1 0 3H6V5Z"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
  </svg>
);

const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
  </svg>
);

const WatchLaterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
  </svg>
);

const ShowMoreIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const MusicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
    <path fillRule="evenodd" d="M9 3v10a3 3 0 1 1-2-2.83V5.85l2-.73V3zm1-1v1.73l4.4-1.27A.5.5 0 0 1 15 3v7a.5.5 0 0 1-.6.49L10 9.27v-.77l4-1.16V2.06l-4 1.16z"/>
  </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
  </svg>
);

// Type Definitions
interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  badge?: string | number;
  iconType?: 'custom' | 'brand';
}

interface MenuSection {
  id: string;
  items: MenuItem[];
}

interface SideMenuProps {
  sections: MenuSection[];
  activeItem?: string;
  onItemClick?: (item: MenuItem) => void;
  collapsed?: boolean;
  className?: string;
}

// Menu Divider Component
const MenuDivider: React.FC = React.memo(() => (
  <div
    style={{
      height: '1px',
      background: designTokens.colors.gradient.primary,
      opacity: 0.6,
      mixBlendMode: 'overlay',
      margin: `${designTokens.spacing.lg} 0`,
    }}
  />
));

MenuDivider.displayName = 'MenuDivider';

// Menu Item Component
interface MenuItemProps {
  item: MenuItem;
  isActive?: boolean;
  onClick?: (item: MenuItem) => void;
  collapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = React.memo(({ 
  item, 
  isActive = false, 
  onClick,
  collapsed = false 
}) => {
  const handleClick = useCallback(() => {
    onClick?.(item);
  }, [onClick, item]);

  const itemVariants = {
    idle: {
      backgroundColor: 'transparent',
      color: designTokens.colors.textSecondary,
      scale: 1,
    },
    hover: {
      backgroundColor: 'rgba(90, 200, 250, 0.1)',
      color: designTokens.colors.text,
      scale: 1.02,
      transition: {
        duration: 0.15,
        ease: designTokens.animation.easing,
      }
    },
    active: {
      backgroundColor: 'rgba(90, 200, 250, 0.2)',
      color: designTokens.colors.accent,
      scale: 1,
    }
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 2 },
    active: { scale: 1.05, rotate: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="idle"
      whileHover="hover"
      animate={isActive ? "active" : "idle"}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={item.label}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
        borderRadius: designTokens.radius.sm,
        cursor: 'pointer',
        minHeight: '40px',
        position: 'relative',
        userSelect: 'none',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Icon Container */}
      <motion.div
        variants={iconVariants}
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: collapsed ? 0 : designTokens.spacing.md,
          flexShrink: 0,
        }}
      >
        <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <item.icon />
        </div>
      </motion.div>

      {/* Text Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.4,
              color: 'inherit',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
            }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      <AnimatePresence>
        {!collapsed && item.badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              backgroundColor: designTokens.colors.accentSecondary,
              color: designTokens.colors.text,
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: 600,
              minWidth: '20px',
              textAlign: 'center',
              marginLeft: designTokens.spacing.sm,
            }}
          >
            {item.badge}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              width: '3px',
              height: '20px',
              background: designTokens.colors.accent,
              borderRadius: '0 2px 2px 0',
              transformOrigin: 'center',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

MenuItem.displayName = 'MenuItem';

// Main Side Menu Component
const SideMenu: React.FC<SideMenuProps> = ({
  sections,
  activeItem,
  onItemClick,
  collapsed = false,
  className = '',
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Memoized menu sections for performance
  const memoizedSections = useMemo(() => sections, [sections]);

  const containerVariants = {
    expanded: {
      width: 248,
      transition: {
        duration: 0.3,
        ease: designTokens.animation.easing,
      }
    },
    collapsed: {
      width: 72,
      transition: {
        duration: 0.3,
        ease: designTokens.animation.easing,
      }
    }
  };

  return (
    <motion.nav
      className={className}
      variants={containerVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      style={{
        height: '100vh',
        backgroundColor: designTokens.colors.background,
        borderRight: `1px solid ${designTokens.colors.backgroundSecondary}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Background Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${designTokens.colors.backgroundSecondary} 0%, transparent 100%)`,
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      {/* Menu Content */}
      <div
        style={{
          padding: designTokens.spacing.lg,
          flex: 1,
          overflow: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {memoizedSections.map((section, sectionIndex) => (
          <div key={section.id}>
            {section.items.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={onItemClick}
                collapsed={collapsed}
              />
            ))}
            
            {/* Add divider between sections (except last) */}
            {sectionIndex < memoizedSections.length - 1 && <MenuDivider />}
          </div>
        ))}
      </div>

      {/* Quantum-Spatial Glow Effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '100%',
          background: designTokens.colors.gradient.primary,
          opacity: 0.3,
          filter: 'blur(2px)',
          pointerEvents: 'none',
        }}
      />
    </motion.nav>
  );
};

// Default menu configuration
export const defaultMenuSections: MenuSection[] = [
  {
    id: 'games',
    items: [
      { id: 'pet-games', label: 'Pet Games', icon: PetGamesIcon, iconType: 'custom' },
      { id: 'subscriptions', label: 'Subscriptions', icon: SubscriptionIcon, iconType: 'custom' },
    ]
  },
  {
    id: 'design-tools',
    items: [
      { id: 'figma', label: 'Figma', icon: FigmaIcon, iconType: 'brand' },
      { id: 'sketch', label: 'Sketch', icon: SketchIcon, iconType: 'brand' },
      { id: 'spline', label: 'Spline', icon: SplineIcon, iconType: 'brand' },
    ]
  },
  {
    id: 'media',
    items: [
      { id: 'youtube', label: 'YouTube Videos', icon: YoutubeIcon, iconType: 'brand' },
      { id: 'history', label: 'History', icon: HistoryIcon, iconType: 'custom' },
      { id: 'watch-later', label: 'Watch Later', icon: WatchLaterIcon, iconType: 'custom' },
      { id: 'show-more', label: 'Show More', icon: ShowMoreIcon, iconType: 'custom' },
    ]
  },
  {
    id: 'content',
    items: [
      { id: 'music', label: 'Music', icon: MusicIcon, iconType: 'custom', badge: '12' },
      { id: 'download', label: 'Download', icon: DownloadIcon, iconType: 'custom' },
    ]
  }
];

// Export types for external use
export type { MenuItem, MenuSection, SideMenuProps };

export default SideMenu;