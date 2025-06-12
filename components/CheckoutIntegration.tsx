import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';
import EcommerceCheckout from './EcommerceCheckout';

// Integration component for your existing product page
interface CheckoutIntegrationProps {
  product?: any;
  quantity?: number;
  onClose?: () => void;
  isMobile?: boolean;
}

export const CheckoutIntegration: React.FC<CheckoutIntegrationProps> = ({
  product,
  quantity = 1,
  onClose,
  isMobile = false
}) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleBuyNow = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    onClose?.();
  };

  if (showCheckout) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: unifiedDesignTokens.gradients.primaryBackground,
      }}>
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCloseCheckout}
          style={{
            position: 'fixed',
            top: unifiedDesignTokens.spacing.large,
            right: unifiedDesignTokens.spacing.large,
            zIndex: 10000,
            ...designUtils.getButton('secondary'),
            width: '44px',
            height: '44px',
            borderRadius: unifiedDesignTokens.cornerRadius.continuous,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </motion.button>

        <EcommerceCheckout 
          isMobile={isMobile}
          onOrderComplete={(orderData) => {
            console.log('Order completed from product page:', orderData);
            handleCloseCheckout();
          }}
        />
      </div>
    );
  }

  return null;
};

// Enhanced Buy Now button for your existing product page
interface EnhancedBuyNowButtonProps {
  product?: any;
  quantity?: number;
  onBuyNow?: () => void;
  isMobile?: boolean;
  className?: string;
}

export const EnhancedBuyNowButton: React.FC<EnhancedBuyNowButtonProps> = ({
  product,
  quantity = 1,
  onBuyNow,
  isMobile = false,
  className = ''
}) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleClick = () => {
    if (onBuyNow) {
      onBuyNow();
    } else {
      setShowCheckout(true);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`unified-buy-now-btn ${className}`}
        style={{
          background: unifiedDesignTokens.gradients.primaryButton,
          border: 'none',
          borderRadius: unifiedDesignTokens.cornerRadius.medium,
          color: 'white',
          fontSize: unifiedDesignTokens.typography.body.size,
          fontWeight: '600',
          padding: `${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large}`,
          cursor: 'pointer',
          transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
          boxShadow: unifiedDesignTokens.depth.shadows.soft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: unifiedDesignTokens.spacing.small,
          minHeight: unifiedDesignTokens.components.button.minHeight,
          width: '100%',
        }}
      >
        🚀 Buy Now
      </motion.button>

      <CheckoutIntegration
        product={product}
        quantity={quantity}
        onClose={() => setShowCheckout(false)}
        isMobile={isMobile}
      />
    </>
  );
};

// Quick checkout modal that can overlay your existing page
interface QuickCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  quantity?: number;
  isMobile?: boolean;
}

export const QuickCheckoutModal: React.FC<QuickCheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  quantity = 1,
  isMobile = false
}) => {
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
              inset: 0,
              zIndex: 9998,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
              WebkitBackdropFilter: unifiedDesignTokens.depth.backdrop.thickMaterial,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              width: isMobile ? '90vw' : '80vw',
              maxWidth: '1200px',
              height: isMobile ? '90vh' : '80vh',
              ...designUtils.getGlassCard('prominent'),
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: unifiedDesignTokens.spacing.large,
              borderBottom: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
            }}>
              <h2 style={{
                ...unifiedDesignTokens.typography.title2,
                color: unifiedDesignTokens.colors.label,
                margin: 0,
              }}>
                Complete Your Order
              </h2>
              
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: unifiedDesignTokens.colors.secondaryLabel,
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: unifiedDesignTokens.spacing.small,
                  borderRadius: unifiedDesignTokens.cornerRadius.small,
                  transition: `all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = unifiedDesignTokens.colors.quaternarySystemFill;
                  e.currentTarget.style.color = unifiedDesignTokens.colors.label;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = unifiedDesignTokens.colors.secondaryLabel;
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              <EcommerceCheckout 
                isMobile={isMobile}
                onOrderComplete={(orderData) => {
                  console.log('Order completed from modal:', orderData);
                  onClose();
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// CSS for integration with your existing styles
export const CheckoutIntegrationStyles = `
/* Enhanced styles that work with your existing CSS */
.unified-buy-now-btn:hover {
  box-shadow: ${unifiedDesignTokens.depth.shadows.medium};
  transform: translateY(-1px);
}

.unified-buy-now-btn:active {
  transform: translateY(0);
}

/* Integration with your existing glass cards */
.glass-card.enhanced {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
  -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassSubtle};
}

.glass-card.enhanced:hover {
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
  border-color: rgba(79, 195, 247, 0.2);
}

/* Enhanced button styles that inherit your existing structure */
.btn-primary.unified {
  background: ${unifiedDesignTokens.gradients.primaryButton};
  box-shadow: ${unifiedDesignTokens.depth.shadows.soft};
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
}

.btn-primary.unified:hover:not(:disabled) {
  box-shadow: ${unifiedDesignTokens.depth.shadows.medium};
  transform: translateY(-1px);
}

.btn-glass.unified {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
  -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
  border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
}

.btn-glass.unified:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: ${unifiedDesignTokens.colors.systemBlue};
  transform: translateY(-1px);
}
`;

export default CheckoutIntegration;