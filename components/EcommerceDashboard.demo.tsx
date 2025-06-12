import React, { useState, useEffect } from 'react';
import EcommerceDashboard from './EcommerceDashboard';
import { liquidGlassTokens } from './EcommerceSideMenu';

// Demo wrapper component to showcase the ecommerce dashboard
const EcommerceDashboardDemo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      backgroundColor: liquidGlassTokens.colors.primary,
    }}>
      {/* Demo Controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        backgroundColor: liquidGlassTokens.colors.secondarySystemFill,
        borderRadius: liquidGlassTokens.cornerRadius.medium,
        padding: liquidGlassTokens.spacing.small,
        backdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
        border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
        display: 'flex',
        gap: liquidGlassTokens.spacing.tiny,
      }}>
        <button
          onClick={() => setIsMobile(false)}
          style={{
            padding: `${liquidGlassTokens.spacing.small} ${liquidGlassTokens.spacing.medium}`,
            borderRadius: liquidGlassTokens.cornerRadius.small,
            border: 'none',
            backgroundColor: !isMobile ? liquidGlassTokens.colors.systemBlue : 'transparent',
            color: !isMobile ? 'white' : liquidGlassTokens.colors.secondaryLabel,
            fontSize: liquidGlassTokens.typography.caption1.size,
            fontWeight: '600',
            cursor: 'pointer',
            transition: `all ${liquidGlassTokens.animation.duration.short} ${liquidGlassTokens.animation.easing.standard}`,
          }}
        >
          Desktop
        </button>
        <button
          onClick={() => setIsMobile(true)}
          style={{
            padding: `${liquidGlassTokens.spacing.small} ${liquidGlassTokens.spacing.medium}`,
            borderRadius: liquidGlassTokens.cornerRadius.small,
            border: 'none',
            backgroundColor: isMobile ? liquidGlassTokens.colors.systemBlue : 'transparent',
            color: isMobile ? 'white' : liquidGlassTokens.colors.secondaryLabel,
            fontSize: liquidGlassTokens.typography.caption1.size,
            fontWeight: '600',
            cursor: 'pointer',
            transition: `all ${liquidGlassTokens.animation.duration.short} ${liquidGlassTokens.animation.easing.standard}`,
          }}
        >
          Mobile
        </button>
      </div>

      {/* Dashboard */}
      <EcommerceDashboard isMobile={isMobile} />

      {/* Demo Information Panel */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 10000,
        backgroundColor: liquidGlassTokens.colors.tertiary,
        borderRadius: liquidGlassTokens.cornerRadius.medium,
        padding: liquidGlassTokens.spacing.medium,
        backdropFilter: `blur(${liquidGlassTokens.effects.thickMaterialBlur})`,
        border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
        maxWidth: '300px',
        color: liquidGlassTokens.colors.label,
        fontSize: liquidGlassTokens.typography.footnote.size,
        lineHeight: liquidGlassTokens.typography.footnote.lineHeight,
      }}>
        <h4 style={{ 
          margin: '0 0 8px', 
          color: liquidGlassTokens.colors.systemBlue, 
          fontSize: liquidGlassTokens.typography.subheadline.size, 
          fontWeight: '700' 
        }}>
          Apple HIG Compliant Ecommerce Dashboard
        </h4>
        <ul style={{ 
          margin: 0, 
          paddingLeft: liquidGlassTokens.spacing.medium, 
          color: liquidGlassTokens.colors.secondaryLabel 
        }}>
          <li>Liquid Glass design principles</li>
          <li>Apple's 8pt spacing system</li>
          <li>HIG-compliant filter tabs</li>
          <li>Consistent visual hierarchy</li>
          <li>Responsive mobile layout</li>
          <li>Apple system colors & typography</li>
          <li>Structured wireframe layouts</li>
          <li>Real-time ecommerce metrics</li>
        </ul>
        <div style={{ 
          marginTop: liquidGlassTokens.spacing.small, 
          padding: liquidGlassTokens.spacing.small, 
          backgroundColor: liquidGlassTokens.colors.systemFill, 
          borderRadius: liquidGlassTokens.cornerRadius.small,
          border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
        }}>
          <strong style={{ color: liquidGlassTokens.colors.systemBlue }}>Mode:</strong> {isMobile ? 'Mobile' : 'Desktop'}
          <br />
          <strong style={{ color: liquidGlassTokens.colors.systemBlue }}>Design:</strong> Apple Liquid Glass
          <br />
          <strong style={{ color: liquidGlassTokens.colors.systemBlue }}>Compliance:</strong> HIG Standards
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboardDemo;