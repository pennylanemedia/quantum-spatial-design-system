import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Quantum-Spatial Design Tokens with Refined Color Blending
const designTokens = {
  colors: {
    // Softer, more refined base colors
    primary: '#0A0D1C',      // Softer dark base
    secondary: '#1A2332',     // Warmer secondary
    tertiary: '#2A334A',      // Gentler tertiary
    quaternary: '#3A4562',    // Additional depth layer
    
    // Refined accent palette with better blending
    accent: '#4FC3F7',        // Softer cyan
    accentSecondary: '#AB47BC', // Refined purple
    accentTertiary: '#EC407A',  // Softer rose
    accentSuccess: '#66BB6A',   // Gentle green
    accentWarning: '#FFA726',   // Warm orange
    
    // Text with better contrast ratios
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    textQuaternary: 'rgba(255, 255, 255, 0.45)',
    
    // Glassy surface colors
    glassLight: 'rgba(255, 255, 255, 0.12)',
    glassMedium: 'rgba(255, 255, 255, 0.08)',
    glassDark: 'rgba(255, 255, 255, 0.04)',
  },
  
  gradients: {
    // Enhanced glassmorphic gradients
    glassCard: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    glassButton: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    glassActive: 'linear-gradient(135deg, rgba(79, 195, 247, 0.2) 0%, rgba(171, 71, 188, 0.15) 100%)',
    
    // Refined color blending
    primaryBlend: 'linear-gradient(135deg, #0A0D1C 0%, #1A2332 50%, #2A334A 100%)',
    accentBlend: 'linear-gradient(135deg, #4FC3F7 0%, #AB47BC 50%, #EC407A 100%)',
    surfaceBlend: 'linear-gradient(135deg, rgba(26, 35, 50, 0.8) 0%, rgba(42, 51, 74, 0.6) 100%)',
  },
  
  shadows: {
    // Enhanced shadow system for depth
    glassSubtle: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    glassMedium: '0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    glassProminent: '0 16px 48px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    quantumGlow: '0 0 24px rgba(79, 195, 247, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%',
  },
  
  blur: {
    subtle: '8px',
    medium: '16px',
    strong: '24px',
    extreme: '32px',
  },
  
  animation: {
    fast: '200ms',
    medium: '300ms',
    slow: '500ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
};

// Gaming-Focused Menu Items for Petersen Games
interface PetersenMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  isActive?: boolean;
  badge?: string | number;
  subItems?: PetersenMenuItem[];
  category: 'dashboard' | 'games' | 'players' | 'analytics' | 'admin' | 'tools';
}

// Gaming-Specific Icons
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
  </svg>
);

const GameControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm-4 4h2v2H6v-2zm8-4h2v2h-2V9zm0 4h2v2h-2v-2z"/>
    <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PlayersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/>
  </svg>
);

const TournamentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
  </svg>
);

const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3v18h18M9 17V9l4 4 4-4v8"/>
  </svg>
);

const LeaderboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14l5-5 5 5M7 14h10M7 14v6h10v-6"/>
    <rect x="9" y="3" width="6" height="5" rx="1"/>
  </svg>
);

const GuildIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
);

const InventoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v2H4V4zm0 4h16v12H4V8zm2 2v8h12v-8H6z"/>
    <path d="M8 12h2v2H8v-2zm4 0h2v2h-2v-2z"/>
  </svg>
);

const ServerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="3" width="20" height="4" rx="1"/>
    <rect x="2" y="9" width="20" height="4" rx="1"/>
    <rect x="2" y="15" width="20" height="4" rx="1"/>
    <circle cx="6" cy="5" r="1"/>
    <circle cx="6" cy="11" r="1"/>
    <circle cx="6" cy="17" r="1"/>
  </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/>
    <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1"/>
  </svg>
);

// Petersen Games Strategic Menu Configuration
const petersenMenuSections = [
  {
    id: 'dashboard',
    label: 'Overview',
    items: [
      { 
        id: 'main-dashboard', 
        label: 'Dashboard', 
        icon: DashboardIcon, 
        category: 'dashboard' as const,
        isActive: true 
      },
      { 
        id: 'analytics', 
        label: 'Analytics', 
        icon: AnalyticsIcon, 
        category: 'analytics' as const,
        badge: 'New' 
      },
    ]
  },
  {
    id: 'game-management',
    label: 'Game Management',
    items: [
      { 
        id: 'active-games', 
        label: 'Active Games', 
        icon: GameControllerIcon, 
        category: 'games' as const,
        badge: 12 
      },
      { 
        id: 'tournaments', 
        label: 'Tournaments', 
        icon: TournamentIcon, 
        category: 'games' as const,
        subItems: [
          { id: 'create-tournament', label: 'Create Tournament', icon: TournamentIcon, category: 'games' as const },
          { id: 'manage-brackets', label: 'Manage Brackets', icon: TournamentIcon, category: 'games' as const },
          { id: 'tournament-history', label: 'Tournament History', icon: TournamentIcon, category: 'games' as const },
        ]
      },
      { 
        id: 'leaderboards', 
        label: 'Leaderboards', 
        icon: LeaderboardIcon, 
        category: 'games' as const 
      },
    ]
  },
  {
    id: 'community',
    label: 'Community',
    items: [
      { 
        id: 'players', 
        label: 'Players', 
        icon: PlayersIcon, 
        category: 'players' as const,
        badge: 2847 
      },
      { 
        id: 'guilds', 
        label: 'Guilds', 
        icon: GuildIcon, 
        category: 'players' as const,
        badge: 156 
      },
      { 
        id: 'inventory', 
        label: 'Inventory', 
        icon: InventoryIcon, 
        category: 'tools' as const 
      },
    ]
  },
  {
    id: 'administration',
    label: 'Administration',
    items: [
      { 
        id: 'servers', 
        label: 'Servers', 
        icon: ServerIcon, 
        category: 'admin' as const,
        badge: '99.9%' 
      },
      { 
        id: 'settings', 
        label: 'Settings', 
        icon: SettingsIcon, 
        category: 'admin' as const 
      },
    ]
  }
];

// Enhanced Menu Item Component with Glossy Effects
interface EnhancedMenuItemProps {
  item: PetersenMenuItem;
  isActive?: boolean;
  onClick?: (item: PetersenMenuItem) => void;
  collapsed?: boolean;
  isMobile?: boolean;
}

const EnhancedMenuItem: React.FC<EnhancedMenuItemProps> = ({ 
  item, 
  isActive = false, 
  onClick,
  collapsed = false,
  isMobile = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    onClick?.(item);
  }, [onClick, item]);

  const itemVariants = {
    idle: {
      background: designTokens.gradients.glassCard,
      scale: 1,
      y: 0,
      boxShadow: designTokens.shadows.glassSubtle,
    },
    hover: {
      background: designTokens.gradients.glassButton,
      scale: 1.02,
      y: -2,
      boxShadow: designTokens.shadows.glassMedium,
      transition: {
        duration: 0.2,
        ease: designTokens.animation.easing,
      }
    },
    active: {
      background: designTokens.gradients.glassActive,
      scale: 1,
      y: 0,
      boxShadow: designTokens.shadows.quantumGlow,
    }
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 3 },
    active: { scale: 1.05, rotate: 0 }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dashboard': return designTokens.colors.accent;
      case 'games': return designTokens.colors.accentSecondary;
      case 'players': return designTokens.colors.accentTertiary;
      case 'analytics': return designTokens.colors.accentSuccess;
      case 'admin': return designTokens.colors.accentWarning;
      case 'tools': return designTokens.colors.accent;
      default: return designTokens.colors.accent;
    }
  };

  const categoryColor = getCategoryColor(item.category);

  return (
    <motion.div
      variants={itemVariants}
      initial="idle"
      whileHover="hover"
      animate={isActive ? "active" : "idle"}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={item.label}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: collapsed ? designTokens.spacing.md : `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
        borderRadius: designTokens.radius.md,
        cursor: 'pointer',
        minHeight: isMobile ? '48px' : '44px',
        position: 'relative',
        userSelect: 'none',
        border: `1px solid rgba(255, 255, 255, 0.08)`,
        backdropFilter: `blur(${designTokens.blur.medium})`,
        WebkitBackdropFilter: `blur(${designTokens.blur.medium})`,
        marginBottom: designTokens.spacing.sm,
        overflow: 'hidden',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Category Accent Line */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '3px',
        background: `linear-gradient(to bottom, ${categoryColor}, transparent)`,
        opacity: isActive ? 1 : (isHovered ? 0.7 : 0.3),
        transition: `opacity ${designTokens.animation.fast} ${designTokens.animation.easing}`,
      }} />

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
          borderRadius: designTokens.radius.sm,
          background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}10)`,
          border: `1px solid ${categoryColor}30`,
        }}
      >
        <div style={{
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: categoryColor,
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
        }}>
          <item.icon />
        </div>
      </motion.div>

      {/* Text Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <span style={{
              fontSize: isMobile ? '16px' : '14px',
              fontWeight: 600,
              color: designTokens.colors.textSecondary,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              {item.label}
            </span>

            {/* Badge */}
            {item.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: `linear-gradient(135deg, ${categoryColor}40, ${categoryColor}20)`,
                  color: designTokens.colors.text,
                  borderRadius: designTokens.radius.full,
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  minWidth: '20px',
                  textAlign: 'center',
                  border: `1px solid ${categoryColor}50`,
                  boxShadow: `0 2px 8px ${categoryColor}30`,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)',
                }}
              >
                {typeof item.badge === 'number' && item.badge > 999 
                  ? `${Math.floor(item.badge / 1000)}k` 
                  : item.badge}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glossy Highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
        borderRadius: `${designTokens.radius.md} ${designTokens.radius.md} 0 0`,
        pointerEvents: 'none',
        opacity: isHovered ? 1 : 0.5,
        transition: `opacity ${designTokens.animation.fast} ${designTokens.animation.easing}`,
      }} />
    </motion.div>
  );
};

// Section Header Component
const SectionHeader: React.FC<{ label: string; collapsed: boolean; isMobile: boolean }> = ({ 
  label, 
  collapsed, 
  isMobile 
}) => (
  <AnimatePresence>
    {!collapsed && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        style={{
          fontSize: isMobile ? '13px' : '11px',
          fontWeight: 700,
          color: designTokens.colors.textTertiary,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          margin: `${designTokens.spacing.xl} 0 ${designTokens.spacing.md}`,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        {label}
      </motion.div>
    )}
  </AnimatePresence>
);

// Main Enhanced Side Menu Component
interface PetersenGamesSideMenuProps {
  activeItem?: string;
  onItemClick?: (item: PetersenMenuItem) => void;
  collapsed?: boolean;
  isMobile?: boolean;
  className?: string;
}

const PetersenGamesSideMenu: React.FC<PetersenGamesSideMenuProps> = ({
  activeItem,
  onItemClick,
  collapsed = false,
  isMobile = false,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['dashboard', 'game-management']));

  const containerVariants = {
    expanded: {
      width: isMobile ? '100%' : 280,
      transition: {
        duration: 0.3,
        ease: designTokens.animation.easing,
      }
    },
    collapsed: {
      width: isMobile ? '64px' : 72,
      transition: {
        duration: 0.3,
        ease: designTokens.animation.easing,
      }
    }
  };

  const toggleSection = (sectionId: string) => {
    if (collapsed) return;
    
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <motion.nav
      className={className}
      variants={containerVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      style={{
        height: isMobile ? 'auto' : '100vh',
        background: 'linear-gradient(180deg, rgba(30, 27, 75, 0.9) 0%, rgba(45, 27, 105, 0.85) 25%, rgba(49, 46, 129, 0.8) 50%, rgba(76, 29, 149, 0.75) 75%, rgba(30, 27, 75, 0.9) 100%)',
        borderRight: isMobile ? 'none' : `1px solid rgba(76, 29, 149, 0.3)`,
        borderBottom: isMobile ? `1px solid rgba(76, 29, 149, 0.3)` : 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: `blur(40px) saturate(200%) brightness(110%)`,
        WebkitBackdropFilter: `blur(${designTokens.blur.strong})`,
        boxShadow: designTokens.shadows.glassMedium,
      }}
      role="navigation"
      aria-label="Petersen Games Navigation"
    >
      {/* Background Texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(79, 195, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(171, 71, 188, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Menu Content */}
      <div style={{
        padding: designTokens.spacing.lg,
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo/Brand Area */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginBottom: designTokens.spacing.xxl,
                textAlign: 'center',
              }}
            >
              <div style={{
                background: designTokens.gradients.glassCard,
                borderRadius: designTokens.radius.lg,
                padding: designTokens.spacing.lg,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: designTokens.shadows.glassSubtle,
              }}>
                <h2 style={{
                  color: designTokens.colors.text,
                  fontSize: isMobile ? '18px' : '16px',
                  fontWeight: 700,
                  margin: 0,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  background: designTokens.gradients.accentBlend,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Petersen Games
                </h2>
                <p style={{
                  color: designTokens.colors.textTertiary,
                  fontSize: isMobile ? '14px' : '12px',
                  margin: '4px 0 0',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                }}>
                  Game Master Portal
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Sections */}
        {petersenMenuSections.map((section) => (
          <div key={section.id}>
            {section.label && (
              <SectionHeader 
                label={section.label} 
                collapsed={collapsed} 
                isMobile={isMobile} 
              />
            )}
            
            <AnimatePresence>
              {(collapsed || expandedSections.has(section.id)) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {section.items.map((item) => (
                    <EnhancedMenuItem
                      key={item.id}
                      item={item}
                      isActive={activeItem === item.id}
                      onClick={onItemClick}
                      collapsed={collapsed}
                      isMobile={isMobile}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom Gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to top, rgba(10, 13, 28, 0.8), transparent)',
        pointerEvents: 'none',
      }} />
    </motion.nav>
  );
};

export default PetersenGamesSideMenu;
export type { PetersenMenuItem, PetersenGamesSideMenuProps };
export { petersenMenuSections };