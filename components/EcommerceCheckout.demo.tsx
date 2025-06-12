import React, { useState, useEffect } from 'react';
import EcommerceCheckout from './EcommerceCheckout';
import { unifiedDesignTokens } from './UnifiedDesignSystem';

// Demo wrapper for the unified checkout system
const EcommerceCheckoutDemo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setOrderCompleted(true);
    console.log('Order completed:', data);
  };

  const resetDemo = () => {
    setOrderCompleted(false);
    setOrderData(null);
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      overflow: 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      background: unifiedDesignTokens.gradients.primaryBackground,
      position: 'relative',
    }}>
      {/* Demo Controls */}
      <div style={{
        position: 'fixed',
        top: unifiedDesignTokens.spacing.medium,
        right: unifiedDesignTokens.spacing.medium,
        zIndex: 10000,
        display: 'flex',
        gap: unifiedDesignTokens.spacing.small,
        flexDirection: 'column',
      }}>
        {/* Device Toggle */}
        <div style={{
          background: unifiedDesignTokens.colors.secondarySystemFill,
          borderRadius: unifiedDesignTokens.cornerRadius.medium,
          padding: unifiedDesignTokens.spacing.small,
          backdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
          WebkitBackdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
          border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
          display: 'flex',
          gap: unifiedDesignTokens.spacing.tiny,
        }}>
          <button
            onClick={() => setIsMobile(false)}
            style={{
              padding: `${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium}`,
              borderRadius: unifiedDesignTokens.cornerRadius.small,
              border: 'none',
              background: !isMobile ? unifiedDesignTokens.colors.systemBlue : 'transparent',
              color: !isMobile ? 'white' : unifiedDesignTokens.colors.secondaryLabel,
              fontSize: unifiedDesignTokens.typography.caption1.size,
              fontWeight: unifiedDesignTokens.typography.caption1.weight,
              cursor: 'pointer',
              transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
            }}
          >
            Desktop
          </button>
          <button
            onClick={() => setIsMobile(true)}
            style={{
              padding: `${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium}`,
              borderRadius: unifiedDesignTokens.cornerRadius.small,
              border: 'none',
              background: isMobile ? unifiedDesignTokens.colors.systemBlue : 'transparent',
              color: isMobile ? 'white' : unifiedDesignTokens.colors.secondaryLabel,
              fontSize: unifiedDesignTokens.typography.caption1.size,
              fontWeight: unifiedDesignTokens.typography.caption1.weight,
              cursor: 'pointer',
              transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
            }}
          >
            Mobile
          </button>
        </div>

        {/* Reset Demo */}
        {orderCompleted && (
          <button
            onClick={resetDemo}
            style={{
              padding: `${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium}`,
              borderRadius: unifiedDesignTokens.cornerRadius.medium,
              border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.systemGreen}`,
              background: unifiedDesignTokens.gradients.successButton,
              color: 'white',
              fontSize: unifiedDesignTokens.typography.caption1.size,
              fontWeight: '600',
              cursor: 'pointer',
              transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
              backdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
              WebkitBackdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
            }}
          >
            Reset Demo
          </button>
        )}
      </div>

      {/* Checkout Component */}
      <EcommerceCheckout 
        isMobile={isMobile} 
        onOrderComplete={handleOrderComplete}
      />

      {/* Demo Information Panel */}
      <div style={{
        position: 'fixed',
        bottom: unifiedDesignTokens.spacing.medium,
        left: unifiedDesignTokens.spacing.medium,
        zIndex: 10000,
        background: unifiedDesignTokens.colors.tertiary,
        borderRadius: unifiedDesignTokens.cornerRadius.medium,
        padding: unifiedDesignTokens.spacing.medium,
        backdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
        WebkitBackdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
        border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
        maxWidth: '300px',
        color: unifiedDesignTokens.colors.label,
        fontSize: unifiedDesignTokens.typography.footnote.size,
        lineHeight: unifiedDesignTokens.typography.footnote.lineHeight,
        boxShadow: unifiedDesignTokens.depth.shadows.large,
      }}>
        <h4 style={{ 
          margin: '0 0 8px', 
          color: unifiedDesignTokens.colors.systemBlue,
          ...unifiedDesignTokens.typography.subheadline,
          fontWeight: '700' 
        }}>
          Unified Design System Checkout
        </h4>
        <ul style={{ 
          margin: 0, 
          paddingLeft: unifiedDesignTokens.spacing.medium, 
          color: unifiedDesignTokens.colors.secondaryLabel 
        }}>
          <li>Consistent line weights ({unifiedDesignTokens.lineWeights.thin}, {unifiedDesignTokens.lineWeights.regular})</li>
          <li>Unified Apple HIG typography</li>
          <li>Gaming + Ecommerce color harmony</li>
          <li>Consistent glassmorphic effects</li>
          <li>Mobile-responsive design</li>
          <li>Full working checkout flow</li>
          <li>Apple 8pt spacing system</li>
          <li>Unified animation timing</li>
        </ul>
        
        <div style={{ 
          marginTop: unifiedDesignTokens.spacing.small, 
          padding: unifiedDesignTokens.spacing.small, 
          background: unifiedDesignTokens.colors.systemFill, 
          borderRadius: unifiedDesignTokens.cornerRadius.small,
          border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
        }}>
          <strong style={{ color: unifiedDesignTokens.colors.systemBlue }}>Design System:</strong> Unified Apple + Gaming
          <br />
          <strong style={{ color: unifiedDesignTokens.colors.systemBlue }}>Mode:</strong> {isMobile ? 'Mobile' : 'Desktop'}
          <br />
          <strong style={{ color: unifiedDesignTokens.colors.systemBlue }}>Status:</strong> {orderCompleted ? 'Order Complete' : 'Shopping'}
          {orderData && (
            <>
              <br />
              <strong style={{ color: unifiedDesignTokens.colors.systemGreen }}>Total:</strong> ${orderData.total?.toFixed(2)}
            </>
          )}
        </div>

        {/* Design Token Examples */}
        <div style={{
          marginTop: unifiedDesignTokens.spacing.small,
          padding: unifiedDesignTokens.spacing.small,
          background: unifiedDesignTokens.colors.quaternarySystemFill,
          borderRadius: unifiedDesignTokens.cornerRadius.small,
          border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
        }}>
          <div style={{
            ...unifiedDesignTokens.typography.caption2,
            color: unifiedDesignTokens.colors.tertiaryLabel,
            marginBottom: unifiedDesignTokens.spacing.tiny,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Line Weight Examples
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: unifiedDesignTokens.spacing.tiny,
          }}>
            <div style={{
              height: unifiedDesignTokens.lineWeights.hairline,
              background: unifiedDesignTokens.colors.systemBlue,
              borderRadius: '1px',
            }} />
            <div style={{
              height: unifiedDesignTokens.lineWeights.thin,
              background: unifiedDesignTokens.colors.systemPurple,
              borderRadius: '1px',
            }} />
            <div style={{
              height: unifiedDesignTokens.lineWeights.regular,
              background: unifiedDesignTokens.colors.systemTeal,
              borderRadius: '1px',
            }} />
            <div style={{
              height: unifiedDesignTokens.lineWeights.medium,
              background: unifiedDesignTokens.colors.systemOrange,
              borderRadius: '1px',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceCheckoutDemo;