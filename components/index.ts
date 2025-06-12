// Quantum-Spatial Design System Components
// Export all components for easy importing

export { default as SideMenu } from './SideMenu';
export type { MenuItem, MenuSection, SideMenuProps } from './SideMenu';
export { defaultMenuSections } from './SideMenu';

export { default as PetersenGamesDashboard } from './PetersenGamesDashboard';

export { default as SideMenuExample } from './SideMenu.example';

// Enhanced Petersen Games Components
export { default as PetersenGamesSideMenu } from './PetersenGamesSideMenu';
export type { PetersenMenuItem, PetersenGamesSideMenuProps } from './PetersenGamesSideMenu';
export { petersenMenuSections } from './PetersenGamesSideMenu';

export { default as EnhancedPetersenGamesDashboard } from './EnhancedPetersenGamesDashboard';
export { default as EnhancedPetersenGamesDashboardDemo } from './EnhancedPetersenGamesDashboard.demo';

// New integrated components with Apple navigation, Vimeo, and artwork spaces
export { AppleNavigation, VimeoModule, ArtworkSpace } from './EnhancedPetersenGamesDashboard';

// Apple HIG Compliant Ecommerce Components
export { default as EcommerceSideMenu } from './EcommerceSideMenu';
export type { EcommerceMenuItem, EcommerceSideMenuProps } from './EcommerceSideMenu';
export { ecommerceMenuSections, liquidGlassTokens } from './EcommerceSideMenu';

export { default as EcommerceDashboard } from './EcommerceDashboard';
export { default as EcommerceDashboardDemo } from './EcommerceDashboard.demo';

// Unified Design System and Checkout
export { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';
export { default as EcommerceCheckout } from './EcommerceCheckout';

// Design Tokens Export
export const designTokens = {
  colors: {
    primary: '#060715',
    secondary: '#131A36',
    tertiary: '#331F4A',
    accent: '#5AC8FA',
    accentSecondary: '#BF4080',
    accentTertiary: '#6A3093',
    success: '#34C759',
    warning: '#FF9F0A',
    error: '#FF2D55',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
  },
  gradients: {
    background: 'linear-gradient(135deg, #0A0621 0%, #131A36 40%, #331F4A 80%, #0D0D15 100%)',
    card: 'linear-gradient(135deg, rgba(19, 26, 54, 0.6) 0%, rgba(51, 31, 74, 0.4) 100%)',
    primary: 'linear-gradient(135deg, rgba(90, 200, 250, 0.15) 0%, rgba(106, 48, 147, 0.1) 100%)',
    secondary: 'linear-gradient(135deg, rgba(191, 64, 128, 0.15) 0%, rgba(255, 45, 85, 0.1) 100%)',
    quantum: 'linear-gradient(135deg, #3DFF74 0%, #00FFC8 33%, #613FE7 66%, #FF2D55 100%)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    subtle: '0 2px 4px rgba(10, 6, 33, 0.2)',
    medium: '0 4px 8px rgba(10, 6, 33, 0.3)',
    prominent: '0 8px 16px rgba(10, 6, 33, 0.4)',
    quantum: '0 8px 24px rgba(90, 200, 250, 0.25)',
  },
  animation: {
    fast: '150ms',
    medium: '300ms',
    slow: '500ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    quantumEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  blur: {
    subtle: '2px',
    medium: '4px',
    strong: '6px',
    background: '20px',
  },
  opacity: {
    background: 0.2,
    content: 0.7,
    focus: 0.9,
    disabled: 0.5,
    hover: 0.85,
  }
};

// Component Props Types
export interface QuantumComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled';
  emission?: number; // 0-1 scale for quantum surfaces
  depth?: 1 | 2 | 3; // Card depth levels
  className?: string;
  children?: React.ReactNode;
}

// Quantum State Types
export type QuantumState = 'heritage' | 'transitional' | 'quantum' | 'superposition';
export type MaterialSurface = 'quantum' | 'grid' | 'heritage';
export type GridType = 'background' | 'interface' | 'feature';
export type GridDensity = 'fine' | 'medium' | 'coarse';

// Export utility functions for quantum-spatial calculations
export const quantumUtils = {
  // Calculate emission based on state
  getEmissionLevel: (state: QuantumState): number => {
    switch (state) {
      case 'heritage': return 0;
      case 'transitional': return 0.3;
      case 'quantum': return 0.7;
      case 'superposition': return 0.9;
      default: return 0;
    }
  },

  // Calculate material properties
  getMaterialProps: (surface: MaterialSurface) => {
    switch (surface) {
      case 'quantum':
        return { roughness: 0.2, metallic: 0.8 };
      case 'grid':
        return { roughness: 0.5, metallic: 0.4 };
      case 'heritage':
        return { roughness: 0.8, metallic: 0.1 };
      default:
        return { roughness: 0.5, metallic: 0.5 };
    }
  },

  // Calculate grid opacity based on type
  getGridOpacity: (type: GridType): number => {
    switch (type) {
      case 'background': return 0.1;
      case 'interface': return 0.175;
      case 'feature': return 0.225;
      default: return 0.1;
    }
  },

  // Generate quantum color based on state
  getQuantumColor: (state: QuantumState): string => {
    switch (state) {
      case 'heritage': return '#3DFF74';
      case 'transitional': return '#BF4080';
      case 'quantum': return '#5AC8FA';
      case 'superposition': return '#6A3093';
      default: return '#5AC8FA';
    }
  }
};

// Note: Apple HIG Liquid Glass Design Tokens are also available via:
// import { liquidGlassTokens } from './EcommerceSideMenu';