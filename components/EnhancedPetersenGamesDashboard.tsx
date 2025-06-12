import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PetersenGamesSideMenu, { PetersenMenuItem } from './PetersenGamesSideMenu';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';

// Apple Dark Mode Navigation Component with Unified Design
const AppleNavigation: React.FC<{ isMobile: boolean; currentTime: string; showInternalNav?: boolean; sections?: Array<{ id: string; label: string }>; onSectionChange?: (section: string) => void; title?: string; subtitle?: string }> = ({ 
  isMobile, 
  currentTime, 
  showInternalNav = false,
  sections = [],
  onSectionChange,
  title,
  subtitle
}) => (
  <nav style={{
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 15, 0.9) 50%, rgba(15, 15, 20, 0.95) 100%)',
    backdropFilter: 'blur(40px) saturate(200%) brightness(60%)',
    borderBottom: `1px solid rgba(76, 29, 149, 0.15)`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  }}>
    <div style={{
      width: '100%',
      margin: '0',
      padding: `0 ${unifiedDesignTokens.spacing.medium}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: unifiedDesignTokens.components.navigation.height,
    }}>
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <div style={{
          ...unifiedDesignTokens.typography.title3,
          color: unifiedDesignTokens.colors.label,
          letterSpacing: unifiedDesignTokens.typography.title3.letterSpacing,
        }}>
          {showInternalNav && title ? title : 'Petersen Games'}
        </div>
        {showInternalNav && subtitle && (
          <div style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '300px',
            lineHeight: '1.3'
          }}>
            {subtitle}
          </div>
        )}
      </motion.div>
      
      {!isMobile && showInternalNav && sections.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => onSectionChange?.(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '6px 12px',
                color: '#f5f5f7',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '500',
                opacity: 0.9,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.div>
      )}
      
      {!isMobile && !showInternalNav && (
        <motion.ul 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '32px',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          {['Dashboard', 'Games', 'Community', 'Analytics', 'Settings'].map((item, index) => (
            <motion.li key={item}>
              <motion.a
                href="#"
                whileHover={{ opacity: 1 }}
                style={{
                  color: '#f5f5f7',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '400',
                  opacity: index === 0 ? 1 : 0.8,
                  transition: 'opacity 0.3s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                {item}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      )}
      
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {!isMobile && (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search"
              style={{
                background: unifiedDesignTokens.components.input.background,
                border: `${unifiedDesignTokens.components.input.borderWidth} solid ${unifiedDesignTokens.components.input.borderColor}`,
                borderRadius: unifiedDesignTokens.cornerRadius.small,
                padding: `6px ${unifiedDesignTokens.spacing.small} 6px 32px`,
                fontSize: unifiedDesignTokens.typography.caption1.size,
                color: unifiedDesignTokens.colors.label,
                width: '200px',
                outline: 'none',
                transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
              }}
            />
            <svg style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              opacity: 0.6,
            }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        )}
        
        <div style={{
          fontSize: '11px',
          color: 'rgba(245, 245, 247, 0.6)',
          letterSpacing: '-0.01em',
        }}>
          {currentTime}
        </div>
      </motion.div>
    </div>
  </nav>
);

// Vimeo Video Module Component
interface VimeoModuleProps {
  videoId: string;
  title: string;
  description?: string;
  autoplay?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
  isMobile?: boolean;
}

const VimeoModule: React.FC<VimeoModuleProps> = ({
  videoId,
  title,
  description,
  autoplay = false,
  loop = false,
  width = 640,
  height = 360,
  isMobile = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(!autoplay);

  const aspectRatio = (height / width) * 100;
  const finalWidth = isMobile ? '100%' : `${width}px`;
  const finalHeight = isMobile ? 'auto' : `${height}px`;

  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?h=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479${autoplay ? '&amp;autoplay=1' : ''}${loop ? '&amp;loop=1' : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        ...designUtils.getGlassCard('medium'),
        padding: unifiedDesignTokens.spacing.large,
        width: '100%',
        maxWidth: isMobile ? '100%' : `${width + 40}px`,
      }}
    >
      <div style={{
        marginBottom: unifiedDesignTokens.spacing.medium,
      }}>
        <h3 style={{
          ...unifiedDesignTokens.typography.title3,
          color: unifiedDesignTokens.colors.label,
          margin: `0 0 ${unifiedDesignTokens.spacing.small}`,
          textShadow: unifiedDesignTokens.typography.title3.textShadow,
        }}>
          {title}
        </h3>
        {description && (
          <p style={{
            ...unifiedDesignTokens.typography.subheadline,
            color: unifiedDesignTokens.colors.secondaryLabel,
            margin: 0,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}>
            {description}
          </p>
        )}
      </div>

      <div style={{
        position: 'relative',
        paddingBottom: isMobile ? `${aspectRatio}%` : '0',
        height: isMobile ? '0' : finalHeight,
        width: finalWidth,
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {showPlayButton && !isLoaded && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLoaded(true);
              setShowPlayButton(false);
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.button>
        )}

        {(isLoaded || autoplay) && (
          <iframe
            src={vimeoUrl}
            style={{
              position: isMobile ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}

        {!isLoaded && !autoplay && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, rgba(79, 195, 247, 0.1), rgba(171, 71, 188, 0.1))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '14px' : '16px',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            padding: '20px',
          }}>
            Click play to load video
          </div>
        )}
      </div>

      {/* Video Controls Info */}
      <div style={{
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.5)',
      }}>
        <span>Vimeo Player</span>
        <span>{width} × {height}</span>
      </div>
    </motion.div>
  );
};

// Artwork Space Component with Specifications
interface ArtworkSpaceProps {
  title: string;
  width: number;
  height: number;
  description: string;
  placement: 'header' | 'sidebar' | 'feature' | 'background';
  format: string;
  isMobile?: boolean;
}

const ArtworkSpace: React.FC<ArtworkSpaceProps> = ({
  title,
  width,
  height,
  description,
  placement,
  format,
  isMobile = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        background: isDragOver 
          ? 'linear-gradient(135deg, rgba(79, 195, 247, 0.2), rgba(171, 71, 188, 0.15))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
        borderRadius: '12px',
        padding: '16px',
        border: `2px dashed ${isDragOver ? '#4FC3F7' : 'rgba(255, 255, 255, 0.2)'}`,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: isMobile ? '120px' : '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        background: 'rgba(79, 195, 247, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4FC3F7" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
      </div>

      <h4 style={{
        color: '#FFFFFF',
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '600',
        margin: '0 0 4px',
      }}>
        {title}
      </h4>

      <p style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: isMobile ? '11px' : '12px',
        margin: '0 0 8px',
        lineHeight: 1.4,
      }}>
        {description}
      </p>

      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '6px',
        padding: '6px 10px',
        fontSize: '10px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: 'monospace',
      }}>
        {width} × {height}px • {format}
      </div>

      <div style={{
        fontSize: '9px',
        color: 'rgba(255, 255, 255, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginTop: '4px',
      }}>
        {placement} placement
      </div>
    </motion.div>
  );
};

// Enhanced Design Tokens with Apple Navigation Integration
const enhancedDesignTokens = {
  colors: {
    // Softer, more sophisticated base colors
    primary: '#0A0D1C',
    secondary: '#1A2332',
    tertiary: '#2A334A',
    quaternary: '#3A4562',
    
    // Refined accent palette with better harmony
    accent: '#4FC3F7',        // Softer cyan
    accentSecondary: '#AB47BC', // Refined purple
    accentTertiary: '#EC407A',  // Softer rose
    accentSuccess: '#66BB6A',   // Gentle green
    accentWarning: '#FFA726',   // Warm orange
    accentInfo: '#42A5F5',      // Information blue
    
    // Enhanced text hierarchy
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    textQuaternary: 'rgba(255, 255, 255, 0.45)',
    
    // Glassmorphic surface layers
    glassLight: 'rgba(255, 255, 255, 0.12)',
    glassMedium: 'rgba(255, 255, 255, 0.08)',
    glassDark: 'rgba(255, 255, 255, 0.04)',
    glassUltra: 'rgba(255, 255, 255, 0.02)',
  },
  
  gradients: {
    // Enhanced background gradients with deeper blending
    background: 'linear-gradient(135deg, #000000 0%, #0A0A0F 25%, #0F0F14 50%, #0A0A0F 75%, #000000 100%)',
    backgroundTexture: 'radial-gradient(circle at 20% 80%, rgba(79, 195, 247, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(171, 71, 188, 0.03) 0%, transparent 50%)',
    
    // Refined glassmorphic effects
    glassCard: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 15, 0.7) 100%)',
    glassCardHover: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 10, 15, 0.75) 100%)',
    glassButton: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(10, 10, 15, 0.6) 100%)',
    glassActive: 'linear-gradient(135deg, rgba(45, 27, 105, 0.4) 0%, rgba(76, 29, 149, 0.3) 100%)',
    
    // Sophisticated accent blending
    accentPrimary: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
    accentSecondary: 'linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)',
    accentTertiary: 'linear-gradient(135deg, #EC407A 0%, #E91E63 100%)',
    accentSuccess: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
    accentWarning: 'linear-gradient(135deg, #FFA726 0%, #FF9800 100%)',
    
    // Multi-layer surface gradients
    surfacePrimary: 'linear-gradient(135deg, rgba(26, 35, 50, 0.9) 0%, rgba(42, 51, 74, 0.7) 50%, rgba(26, 35, 50, 0.9) 100%)',
    surfaceSecondary: 'linear-gradient(135deg, rgba(42, 51, 74, 0.8) 0%, rgba(58, 69, 98, 0.6) 100%)',
  },
  
  shadows: {
    // Enhanced shadow system with multiple layers
    glassSubtle: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.05)',
    glassMedium: '0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 0 rgba(255, 255, 255, 0.08)',
    glassProminent: '0 16px 48px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 0 rgba(255, 255, 255, 0.1)',
    quantumGlow: '0 0 32px rgba(79, 195, 247, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    cardElevated: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    xxxxl: '40px',
  },
  
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    full: '50%',
  },
  
  blur: {
    subtle: '8px',
    medium: '16px',
    strong: '24px',
    extreme: '32px',
    ultra: '40px',
  },
  
  animation: {
    fast: '200ms',
    medium: '300ms',
    slow: '500ms',
    slower: '700ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }
};

// Enhanced Mock Data with More Gaming Context
const enhancedMockStats = {
  activePlayers: { value: 2847, change: '+12.5% from yesterday', trend: 'up' as const, peak: 3250 },
  revenue: { value: '$12,450', change: '+8.2% from yesterday', trend: 'up' as const, goal: '$15000' },
  gameSessions: { value: 8924, change: '+15.7% from yesterday', trend: 'up' as const, avgDuration: '24m' },
  serverStatus: { value: '99.9%', status: 'operational' as const, response: '12ms', load: '42%' }
};

const enhancedMockActivities = [
  { id: '1', type: 'achievement', message: 'Guild "Dragon Slayers" completed Epic Raid', timestamp: '2 minutes ago', color: enhancedDesignTokens.colors.accentSuccess, priority: 'high' },
  { id: '2', type: 'tournament', message: 'Championship Tournament: Round 3 begins', timestamp: '5 minutes ago', color: enhancedDesignTokens.colors.accentSecondary, priority: 'high' },
  { id: '3', type: 'player_joined', message: 'VIP Player "ShadowMaster" joined server', timestamp: '8 minutes ago', color: enhancedDesignTokens.colors.accent, priority: 'medium' },
  { id: '4', type: 'achievement', message: 'Rare item "Mystic Sword" discovered', timestamp: '12 minutes ago', color: enhancedDesignTokens.colors.accentTertiary, priority: 'medium' },
  { id: '5', type: 'maintenance', message: 'Auto-scaling activated for high traffic', timestamp: '15 minutes ago', color: enhancedDesignTokens.colors.accentWarning, priority: 'low' },
];

const enhancedTopGames = [
  { id: '1', name: 'Mystic Realms', players: 1247, percentage: 85, color: enhancedDesignTokens.colors.accent, revenue: '$3,240', sessions: 2840 },
  { id: '2', name: 'Dragon Quest Chronicles', players: 892, percentage: 65, color: enhancedDesignTokens.colors.accentSecondary, revenue: '$2,180', sessions: 1965 },
  { id: '3', name: 'Space Odyssey Elite', players: 634, percentage: 45, color: enhancedDesignTokens.colors.accentTertiary, revenue: '$1,650', sessions: 1340 },
  { id: '4', name: 'Fantasy Kingdom', players: 423, percentage: 30, color: enhancedDesignTokens.colors.accentSuccess, revenue: '$980', sessions: 890 },
];

// Enhanced Stat Card Component with Sophisticated Glassmorphism
interface EnhancedStatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  isMobile?: boolean;
  extraInfo?: string;
}

const EnhancedStatCard: React.FC<EnhancedStatCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  gradient, 
  accentColor,
  isMobile = false,
  extraInfo 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    idle: { 
      scale: 1, 
      y: 0,
      rotateX: 0,
      rotateY: 0,
    },
    hover: { 
      scale: 1.03, 
      y: -4,
      rotateX: 2,
      rotateY: 2,
      transition: { 
        duration: 0.3, 
        ease: enhancedDesignTokens.animation.elastic 
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: isMobile ? '120px' : '140px',
        background: enhancedDesignTokens.gradients.glassCard,
        borderRadius: enhancedDesignTokens.radius.lg,
        padding: enhancedDesignTokens.spacing.xl,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
        WebkitBackdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
        boxShadow: isHovered ? enhancedDesignTokens.shadows.glassMedium : enhancedDesignTokens.shadows.glassSubtle,
        overflow: 'hidden',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Accent Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: gradient,
        opacity: isHovered ? 0.15 : 0.08,
        transition: `opacity ${enhancedDesignTokens.animation.medium} ${enhancedDesignTokens.animation.easing}`,
      }} />

      {/* Top Glossy Highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent)',
        borderRadius: `${enhancedDesignTokens.radius.lg} ${enhancedDesignTokens.radius.lg} 0 0`,
        opacity: isHovered ? 1 : 0.7,
        transition: `opacity ${enhancedDesignTokens.animation.fast} ${enhancedDesignTokens.animation.easing}`,
      }} />

      {/* Header Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 2,
      }}>
        <div>
          <div style={{
            color: enhancedDesignTokens.colors.textTertiary,
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 600,
            marginBottom: enhancedDesignTokens.spacing.sm,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.5px',
          }}>
            {title}
          </div>
          <div style={{
            color: enhancedDesignTokens.colors.text,
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 800,
            lineHeight: 1,
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            background: `linear-gradient(135deg, ${enhancedDesignTokens.colors.text}, ${accentColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>

        {/* Enhanced Icon Container */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: enhancedDesignTokens.radius.md,
            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 4px 16px ${accentColor}25, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
            backdropFilter: `blur(${enhancedDesignTokens.blur.subtle})`,
          }}
        >
          <div style={{ color: accentColor, filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}>
            {icon}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div style={{
          color: trend === 'up' ? enhancedDesignTokens.colors.accentSuccess : enhancedDesignTokens.colors.accentTertiary,
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: 700,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}>
          {change}
        </div>
        
        {extraInfo && (
          <div style={{
            color: enhancedDesignTokens.colors.textQuaternary,
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}>
            {extraInfo}
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '60px',
        height: '60px',
        background: `radial-gradient(circle at center, ${accentColor}20, transparent 70%)`,
        borderRadius: `50% 0 ${enhancedDesignTokens.radius.lg} 0`,
      }} />
    </motion.div>
  );
};

// Enhanced Activity Feed with Rich Interactions
const EnhancedActivityFeed: React.FC<{ activities: any[]; isMobile?: boolean }> = ({ 
  activities, 
  isMobile = false 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      background: enhancedDesignTokens.gradients.glassCard,
      border: `1px solid rgba(255, 255, 255, 0.08)`,
      borderRadius: enhancedDesignTokens.radius.lg,
      padding: enhancedDesignTokens.spacing.xl,
      width: '100%',
      minHeight: isMobile ? '280px' : '360px',
      backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
      WebkitBackdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
      boxShadow: enhancedDesignTokens.shadows.glassSubtle,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <div style={{ marginBottom: enhancedDesignTokens.spacing.xl }}>
      <h3 style={{
        color: enhancedDesignTokens.colors.text,
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: 700,
        margin: 0,
        marginBottom: enhancedDesignTokens.spacing.sm,
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      }}>
        Live Game Activity
      </h3>
      <p style={{
        color: enhancedDesignTokens.colors.textTertiary,
        fontSize: isMobile ? '13px' : '14px',
        margin: 0,
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
      }}>
        Real-time events across all game servers
      </p>
    </div>

    {/* Activity List */}
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: enhancedDesignTokens.spacing.lg,
      maxHeight: isMobile ? '200px' : '280px',
      overflowY: 'auto',
    }}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02, x: 4 }}
          style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: enhancedDesignTokens.spacing.md,
            padding: enhancedDesignTokens.spacing.md,
            borderRadius: enhancedDesignTokens.radius.sm,
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${activity.color}20`,
            cursor: 'pointer',
          }}
        >
          {/* Priority Indicator */}
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${activity.color}, ${activity.color}CC)`,
            marginTop: '6px',
            flexShrink: 0,
            boxShadow: `0 0 12px ${activity.color}50, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
            border: `1px solid ${activity.color}80`,
          }} />
          
          <div style={{ flex: 1 }}>
            <div style={{
              color: enhancedDesignTokens.colors.textSecondary,
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: 600,
              marginBottom: '4px',
              lineHeight: 1.4,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              {activity.message}
            </div>
            <div style={{
              color: enhancedDesignTokens.colors.textQuaternary,
              fontSize: isMobile ? '11px' : '12px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              {activity.timestamp}
            </div>
          </div>

          {/* Priority Badge */}
          {activity.priority === 'high' && (
            <div style={{
              background: `linear-gradient(135deg, ${activity.color}40, ${activity.color}20)`,
              color: enhancedDesignTokens.colors.text,
              borderRadius: enhancedDesignTokens.radius.full,
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              border: `1px solid ${activity.color}50`,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)',
            }}>
              High
            </div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Background Texture */}
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100px',
      height: '100px',
      background: `radial-gradient(circle, ${enhancedDesignTokens.colors.accent}10, transparent 70%)`,
      borderRadius: '50%',
      transform: 'translate(30px, -30px)',
    }} />
  </motion.div>
);

// Main Enhanced Dashboard Component with Mobile Support
interface EnhancedPetersenGamesDashboardProps {
  isMobile?: boolean;
  showInternalNav?: boolean;
  sections?: Array<{ id: string; label: string }>;
  onSectionChange?: (section: string) => void;
  title?: string;
  subtitle?: string;
}

const EnhancedPetersenGamesDashboard: React.FC<EnhancedPetersenGamesDashboardProps> = ({ 
  isMobile = false,
  showInternalNav = false,
  sections = [],
  onSectionChange,
  title,
  subtitle
}) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('main-dashboard');
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(isMobile);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Detect mobile screen size
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const actuallyMobile = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSideMenuCollapsed(actuallyMobile);
  }, [actuallyMobile]);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuItemClick = (item: PetersenMenuItem) => {
    setActiveMenuItem(item.id);
    if (actuallyMobile) {
      setSideMenuCollapsed(true);
    }
  };

  const toggleSideMenu = () => {
    setSideMenuCollapsed(!sideMenuCollapsed);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      background: enhancedDesignTokens.gradients.background,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Apple Navigation */}
      <AppleNavigation 
        isMobile={actuallyMobile} 
        currentTime={currentTime}
        showInternalNav={showInternalNav}
        sections={sections}
        onSectionChange={onSectionChange}
        title={title}
        subtitle={subtitle}
      />

      {/* Main Layout Container */}
      <div style={{
        display: 'flex',
        flexDirection: actuallyMobile ? 'column' : 'row',
        flex: 1,
        overflow: 'hidden',
      }}>
        {/* Enhanced Background Texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: enhancedDesignTokens.gradients.backgroundTexture,
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Quantum Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79, 195, 247, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 195, 247, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: actuallyMobile ? '24px 24px' : '32px 32px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

      {/* Mobile Menu Toggle */}
      {actuallyMobile && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleSideMenu}
          style={{
            position: 'fixed',
            top: enhancedDesignTokens.spacing.lg,
            left: enhancedDesignTokens.spacing.lg,
            width: '48px',
            height: '48px',
            borderRadius: enhancedDesignTokens.radius.md,
            background: enhancedDesignTokens.gradients.glassCard,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
            zIndex: 1000,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: enhancedDesignTokens.shadows.glassSubtle,
          }}
        >
          <div style={{ color: enhancedDesignTokens.colors.text }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </div>
        </motion.button>
      )}

      {/* Side Menu */}
      <AnimatePresence>
        {(!actuallyMobile || !sideMenuCollapsed) && (
          <motion.div
            initial={actuallyMobile ? { x: -280 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={actuallyMobile ? { x: -280 } : { x: 0 }}
            transition={{ duration: 0.3, ease: enhancedDesignTokens.animation.easing }}
            style={{
              position: actuallyMobile ? 'fixed' : 'relative',
              zIndex: actuallyMobile ? 999 : 10,
              height: actuallyMobile ? '100vh' : 'auto',
            }}
          >
            <PetersenGamesSideMenu
              activeItem={activeMenuItem}
              onItemClick={handleMenuItemClick}
              collapsed={false}
              isMobile={actuallyMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {actuallyMobile && !sideMenuCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSideMenu}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            backdropFilter: `blur(${enhancedDesignTokens.blur.subtle})`,
          }}
        />
      )}

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: actuallyMobile ? enhancedDesignTokens.spacing.lg : enhancedDesignTokens.spacing.xl,
        paddingTop: actuallyMobile ? '80px' : enhancedDesignTokens.spacing.xl,
        overflow: 'auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          flexDirection: actuallyMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: actuallyMobile ? 'flex-start' : 'center',
          marginBottom: enhancedDesignTokens.spacing.xxl,
          gap: actuallyMobile ? enhancedDesignTokens.spacing.lg : 0,
        }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: enhancedDesignTokens.colors.text,
                fontSize: actuallyMobile ? '24px' : '32px',
                fontWeight: 800,
                margin: 0,
                marginBottom: enhancedDesignTokens.spacing.sm,
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                background: enhancedDesignTokens.gradients.accentPrimary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome back, Game Master
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                color: enhancedDesignTokens.colors.textTertiary,
                fontSize: actuallyMobile ? '14px' : '16px',
                fontWeight: 500,
                margin: 0,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Managing your gaming empire • {currentTime}
            </motion.p>
          </div>

          {/* Search Bar */}
          {!actuallyMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ position: 'relative', width: '22%', minWidth: '240px' }}
            >
              <input
                type="text"
                placeholder="Search games, players, stats..."
                style={{
                  width: '100%',
                  height: '48px',
                  background: enhancedDesignTokens.gradients.glassCard,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: enhancedDesignTokens.radius.md,
                  padding: `0 ${enhancedDesignTokens.spacing.lg}`,
                  color: enhancedDesignTokens.colors.text,
                  fontSize: '14px',
                  outline: 'none',
                  backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
                  WebkitBackdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
                  boxShadow: enhancedDesignTokens.shadows.glassSubtle,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                }}
              />
            </motion.div>
          )}
        </header>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: actuallyMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: enhancedDesignTokens.spacing.lg,
            marginBottom: enhancedDesignTokens.spacing.xxl,
            width: '100%',
          }}
        >
          <EnhancedStatCard
            title="Active Players"
            value={enhancedMockStats.activePlayers.value}
            change={enhancedMockStats.activePlayers.change}
            trend={enhancedMockStats.activePlayers.trend}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/></svg>}
            gradient={enhancedDesignTokens.gradients.accentPrimary}
            accentColor={enhancedDesignTokens.colors.accent}
            isMobile={actuallyMobile}
            extraInfo={`Peak: ${enhancedMockStats.activePlayers.peak}`}
          />
          <EnhancedStatCard
            title="Today's Revenue"
            value={enhancedMockStats.revenue.value}
            change={enhancedMockStats.revenue.change}
            trend={enhancedMockStats.revenue.trend}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v20m8-10H4"/></svg>}
            gradient={enhancedDesignTokens.gradients.accentSecondary}
            accentColor={enhancedDesignTokens.colors.accentSecondary}
            isMobile={actuallyMobile}
            extraInfo={`Goal: ${enhancedMockStats.revenue.goal}`}
          />
          <EnhancedStatCard
            title="Game Sessions"
            value={enhancedMockStats.gameSessions.value}
            change={enhancedMockStats.gameSessions.change}
            trend={enhancedMockStats.gameSessions.trend}
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3V3zm0 4h18v12H3V8zm2 2v8h12v-8H6z"/></svg>}
            gradient={enhancedDesignTokens.gradients.accentTertiary}
            accentColor={enhancedDesignTokens.colors.accentTertiary}
            isMobile={actuallyMobile}
            extraInfo={`Avg: ${enhancedMockStats.gameSessions.avgDuration}`}
          />
          <EnhancedStatCard
            title="Server Health"
            value={enhancedMockStats.serverStatus.value}
            change="All systems operational"
            trend="neutral"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/></svg>}
            gradient={enhancedDesignTokens.gradients.accentSuccess}
            accentColor={enhancedDesignTokens.colors.accentSuccess}
            isMobile={actuallyMobile}
            extraInfo={`${enhancedMockStats.serverStatus.response} • Load: ${enhancedMockStats.serverStatus.load}`}
          />
        </motion.div>

        {/* Featured Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: actuallyMobile ? '1fr' : '1fr 1fr',
            gap: enhancedDesignTokens.spacing.xl,
            marginBottom: enhancedDesignTokens.spacing.xxl,
          }}
        >
          {/* Vimeo Video Module */}
          <VimeoModule
            videoId="76979871"
            title="Game Development Showcase"
            description="Behind the scenes of our latest game development process and upcoming releases."
            width={640}
            height={360}
            autoplay={false}
            loop={false}
            isMobile={actuallyMobile}
          />

          {/* Featured Artwork Space */}
          <ArtworkSpace
            title="Featured Game Art"
            width={640}
            height={360}
            description="Showcase your latest game artwork, concept art, or promotional materials here."
            placement="feature"
            format="JPG/PNG/WebP"
            isMobile={actuallyMobile}
          />
        </motion.div>

        {/* Artwork Spaces Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: actuallyMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: enhancedDesignTokens.spacing.lg,
            marginBottom: enhancedDesignTokens.spacing.xxl,
            width: '100%',
          }}
        >
          <ArtworkSpace
            title="Header Banner"
            width={1200}
            height={300}
            description="Wide banner for dashboard header or promotional use."
            placement="header"
            format="JPG/PNG"
            isMobile={actuallyMobile}
          />

          <ArtworkSpace
            title="Character Portrait"
            width={400}
            height={600}
            description="Vertical character art or game portraits for sidebar display."
            placement="sidebar"
            format="PNG with transparency"
            isMobile={actuallyMobile}
          />

          <ArtworkSpace
            title="Background Art"
            width={1920}
            height={1080}
            description="Full HD background images for dashboard environments."
            placement="background"
            format="JPG/WebP optimized"
            isMobile={actuallyMobile}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: actuallyMobile ? '1fr' : '1fr 1fr',
          gap: enhancedDesignTokens.spacing.xl,
          width: '100%',
        }}>
          <EnhancedActivityFeed activities={enhancedMockActivities} isMobile={actuallyMobile} />
          
          {/* Top Games Chart - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              background: enhancedDesignTokens.gradients.glassCard,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: enhancedDesignTokens.radius.lg,
              padding: enhancedDesignTokens.spacing.xl,
              backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
              WebkitBackdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
              boxShadow: enhancedDesignTokens.shadows.glassSubtle,
              height: 'fit-content',
            }}
          >
            <h3 style={{
              color: enhancedDesignTokens.colors.text,
              fontSize: actuallyMobile ? '18px' : '20px',
              fontWeight: 700,
              margin: 0,
              marginBottom: enhancedDesignTokens.spacing.sm,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}>
              Top Performing Games
            </h3>
            <p style={{
              color: enhancedDesignTokens.colors.textTertiary,
              fontSize: actuallyMobile ? '13px' : '14px',
              margin: `0 0 ${enhancedDesignTokens.spacing.xl}`,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              Revenue and engagement metrics
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: enhancedDesignTokens.spacing.xl }}>
              {enhancedTopGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: enhancedDesignTokens.spacing.md,
                    borderRadius: enhancedDesignTokens.radius.sm,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${game.color}20`,
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: enhancedDesignTokens.spacing.sm,
                  }}>
                    <span style={{
                      color: enhancedDesignTokens.colors.textSecondary,
                      fontSize: actuallyMobile ? '14px' : '15px',
                      fontWeight: 600,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}>
                      {game.name}
                    </span>
                    <span style={{
                      color: game.color,
                      fontSize: actuallyMobile ? '13px' : '14px',
                      fontWeight: 700,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}>
                      {game.revenue}
                    </span>
                  </div>
                  
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: `${game.color}20`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: enhancedDesignTokens.spacing.sm,
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${game.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${game.color}, ${game.color}CC)`,
                        borderRadius: '4px',
                        boxShadow: `0 0 8px ${game.color}60`,
                      }}
                    />
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: actuallyMobile ? '11px' : '12px',
                    color: enhancedDesignTokens.colors.textQuaternary,
                  }}>
                    <span>{game.players.toLocaleString()} players</span>
                    <span>{game.sessions.toLocaleString()} sessions</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EnhancedPetersenGamesDashboard;
export { AppleNavigation, VimeoModule, ArtworkSpace };