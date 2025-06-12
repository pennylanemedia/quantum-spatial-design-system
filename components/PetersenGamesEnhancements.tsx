import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';
import { CheckoutIntegration, EnhancedBuyNowButton, QuickCheckoutModal } from './CheckoutIntegration';

// Enhanced Product Page Integration for your existing Petersen Games site
interface PetersenProductPageEnhancementsProps {
  product: any;
  className?: string;
}

export const PetersenProductPageEnhancements: React.FC<PetersenProductPageEnhancementsProps> = ({
  product,
  className = ''
}) => {
  const [showQuickCheckout, setShowQuickCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      {/* Enhanced CSS Integration for your existing page */}
      <style jsx global>{`
        /* Apply unified design tokens to your existing Petersen Games site */
        
        /* Homepage Enhancements */
        .enhanced-hero-section {
          background: linear-gradient(135deg, 
            rgba(147, 51, 234, 0.15) 0%, 
            rgba(79, 70, 229, 0.12) 25%, 
            rgba(236, 72, 153, 0.10) 50%, 
            rgba(245, 158, 11, 0.12) 75%, 
            rgba(147, 51, 234, 0.15) 100%
          );
          backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
          -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.xlarge};
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
        }

        /* Product Cards Enhancement */
        .product-card.enhanced {
          background: ${designUtils.getGlassCard('prominent').background};
          backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter};
          -webkit-backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.large};
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
          transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
        }

        .product-card.enhanced:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassLarge};
          border-color: ${unifiedDesignTokens.colors.systemBlue};
        }

        /* Navigation Enhancement */
        .enhanced-nav {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
          backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
          -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
          border-bottom: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
        }

        /* Filter Page Enhancements */
        .enhanced-filter-tabs {
          display: flex;
          gap: ${unifiedDesignTokens.spacing.small};
          padding: ${unifiedDesignTokens.spacing.medium};
          background: ${designUtils.getGlassCard('subtle').background};
          backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter};
          border-bottom: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
        }

        .enhanced-filter-tab {
          padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium};
          border-radius: ${unifiedDesignTokens.cornerRadius.small};
          background: rgba(255, 255, 255, 0.05);
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          color: ${unifiedDesignTokens.colors.secondaryLabel};
          transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard};
          cursor: pointer;
          font-size: ${unifiedDesignTokens.typography.subheadline.size};
          font-weight: 500;
          min-height: ${unifiedDesignTokens.components.button.minHeight};
          display: flex;
          align-items: center;
        }

        .enhanced-filter-tab.active {
          background: ${unifiedDesignTokens.gradients.primaryButton};
          color: white;
          box-shadow: ${unifiedDesignTokens.depth.shadows.soft};
        }

        .enhanced-filter-tab:hover:not(.active) {
          background: rgba(255, 255, 255, 0.1);
          border-color: ${unifiedDesignTokens.colors.systemBlue};
          transform: translateY(-1px);
        }

        /* Search Bar Enhancement */
        .enhanced-search-bar {
          position: relative;
          background: ${designUtils.getGlassCard('subtle').background};
          backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.medium};
          transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard};
        }

        .enhanced-search-bar:focus-within {
          border-color: ${unifiedDesignTokens.colors.systemBlue};
          box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2);
        }

        .enhanced-search-input {
          width: 100%;
          padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.medium} 48px;
          background: transparent;
          border: none;
          color: ${unifiedDesignTokens.colors.label};
          font-size: ${unifiedDesignTokens.typography.body.size};
          outline: none;
        }

        .enhanced-search-input::placeholder {
          color: ${unifiedDesignTokens.colors.tertiaryLabel};
        }

        .enhanced-search-icon {
          position: absolute;
          left: ${unifiedDesignTokens.spacing.medium};
          top: 50%;
          transform: translateY(-50%);
          color: ${unifiedDesignTokens.colors.secondaryLabel};
          font-size: 1.1rem;
        }

        /* Product Grid Enhancement */
        .enhanced-product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: ${unifiedDesignTokens.spacing.large};
          padding: ${unifiedDesignTokens.spacing.xlarge} 0;
        }

        .enhanced-product-item {
          background: ${designUtils.getGlassCard('prominent').background};
          backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter};
          -webkit-backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.large};
          overflow: hidden;
          transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
          cursor: pointer;
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassSubtle};
        }

        .enhanced-product-item:hover {
          transform: translateY(-8px);
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
          border-color: ${unifiedDesignTokens.colors.systemBlue};
        }

        .enhanced-product-image {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
        }

        .enhanced-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
        }

        .enhanced-product-item:hover .enhanced-product-image img {
          transform: scale(1.05);
        }

        .enhanced-game-stats {
          position: absolute;
          top: ${unifiedDesignTokens.spacing.medium};
          right: ${unifiedDesignTokens.spacing.medium};
          display: flex;
          gap: ${unifiedDesignTokens.spacing.small};
        }

        .enhanced-game-stat {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-radius: ${unifiedDesignTokens.cornerRadius.small};
          padding: ${unifiedDesignTokens.spacing.tiny} ${unifiedDesignTokens.spacing.small};
          display: flex;
          align-items: center;
          gap: 4px;
          border: ${unifiedDesignTokens.lineWeights.hairline} solid rgba(255, 255, 255, 0.1);
        }

        .enhanced-game-stat span {
          color: white;
          font-size: ${unifiedDesignTokens.typography.caption2.size};
          font-weight: 500;
        }

        .enhanced-product-info {
          padding: ${unifiedDesignTokens.spacing.large};
        }

        .enhanced-product-title {
          font-size: ${unifiedDesignTokens.typography.headline.size};
          font-weight: ${unifiedDesignTokens.typography.headline.weight};
          color: ${unifiedDesignTokens.colors.label};
          margin-bottom: ${unifiedDesignTokens.spacing.small};
          line-height: ${unifiedDesignTokens.typography.headline.lineHeight};
        }

        .enhanced-product-description {
          color: ${unifiedDesignTokens.colors.secondaryLabel};
          font-size: ${unifiedDesignTokens.typography.body.size};
          line-height: 1.5;
          margin-bottom: ${unifiedDesignTokens.spacing.medium};
        }

        .enhanced-product-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: ${unifiedDesignTokens.spacing.medium};
        }

        .enhanced-product-price {
          font-size: ${unifiedDesignTokens.typography.title2.size};
          font-weight: 700;
          background: ${unifiedDesignTokens.gradients.quantumPrimary};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .enhanced-add-to-cart {
          background: ${unifiedDesignTokens.gradients.primaryButton};
          border: none;
          border-radius: ${unifiedDesignTokens.cornerRadius.medium};
          color: white;
          padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium};
          font-size: ${unifiedDesignTokens.typography.callout.size};
          font-weight: 600;
          cursor: pointer;
          transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard};
          box-shadow: ${unifiedDesignTokens.depth.shadows.soft};
          min-height: ${unifiedDesignTokens.components.button.minHeight};
          display: flex;
          align-items: center;
          gap: ${unifiedDesignTokens.spacing.tiny};
        }

        .enhanced-add-to-cart:hover {
          transform: translateY(-1px);
          box-shadow: ${unifiedDesignTokens.depth.shadows.medium};
        }

        .enhanced-add-to-cart:active {
          transform: translateY(0);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .enhanced-product-grid {
            grid-template-columns: 1fr;
            gap: ${unifiedDesignTokens.spacing.medium};
            padding: ${unifiedDesignTokens.spacing.large} 0;
          }

          .enhanced-filter-tabs {
            flex-wrap: wrap;
            gap: ${unifiedDesignTokens.spacing.tiny};
          }

          .enhanced-search-input {
            padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.small} 40px;
          }
        }

        /* Animation for loading states */
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }

        .loading-shimmer {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);
          background-size: 468px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      {/* Quick Checkout Modal */}
      <QuickCheckoutModal
        isOpen={showQuickCheckout}
        onClose={() => setShowQuickCheckout(false)}
        product={product}
        quantity={quantity}
        isMobile={window.innerWidth <= 768}
      />
    </>
  );
};

// Enhanced Homepage Integration Component
export const EnhancedHomepageIntegration: React.FC = () => {
  return (
    <div className="enhanced-homepage-wrapper">
      <style jsx global>{`
        /* Homepage specific enhancements */
        .enhanced-homepage-wrapper {
          /* Global enhancements already applied above */
        }

        /* Hero section enhancement - apply to your existing hero */
        #hero.enhanced {
          position: relative;
          overflow: hidden;
        }

        #hero.enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(79, 70, 229, 0.03) 100%);
          backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
          z-index: 1;
        }

        #hero.enhanced .hero-content {
          position: relative;
          z-index: 2;
        }

        /* Product carousel enhancement */
        .product-carousel.enhanced .product-card {
          background: ${designUtils.getGlassCard('prominent').background};
          backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.xlarge};
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
        }

        .product-carousel.enhanced .product-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassLarge};
          border-color: ${unifiedDesignTokens.colors.systemBlue};
        }

        /* Newsletter form enhancement */
        .newsletter-form-modern.enhanced {
          background: ${designUtils.getGlassCard('prominent').background};
          backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.xlarge};
          box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
        }

        .newsletter-form-modern.enhanced input {
          background: rgba(255, 255, 255, 0.08);
          border: ${unifiedDesignTokens.lineWeights.thin} solid rgba(255, 255, 255, 0.2);
          border-radius: ${unifiedDesignTokens.cornerRadius.continuous};
        }

        .newsletter-form-modern.enhanced input:focus {
          border-color: ${unifiedDesignTokens.colors.systemBlue};
          box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2);
        }

        .newsletter-form-modern.enhanced button {
          background: ${unifiedDesignTokens.gradients.primaryButton};
          border-radius: ${unifiedDesignTokens.cornerRadius.continuous};
          box-shadow: ${unifiedDesignTokens.depth.shadows.soft};
        }

        .newsletter-form-modern.enhanced button:hover {
          transform: translateY(-1px);
          box-shadow: ${unifiedDesignTokens.depth.shadows.medium};
        }
      `}</style>
    </div>
  );
};

// Enhanced Filter Page Integration Component
export const EnhancedFilterPageIntegration: React.FC = () => {
  return (
    <div className="enhanced-filter-page-wrapper">
      <style jsx global>{`
        /* Filter page specific enhancements */
        
        /* Apply enhanced classes to your existing filter tabs */
        .filter-tabs-container {
          padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large};
          background: ${designUtils.getGlassCard('subtle').background};
          backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter};
          border-bottom: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
        }

        /* Enhance your existing search bar */
        .search-container.enhanced {
          position: relative;
          max-width: 480px;
        }

        .search-container.enhanced input {
          width: 100%;
          padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.medium} 48px;
          background: ${designUtils.getGlassCard('subtle').background};
          backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.medium};
          color: ${unifiedDesignTokens.colors.label};
          font-size: ${unifiedDesignTokens.typography.body.size};
          outline: none;
          transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard};
        }

        .search-container.enhanced input:focus {
          border-color: ${unifiedDesignTokens.colors.systemBlue};
          box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2);
        }

        .search-container.enhanced::before {
          content: '🔍';
          position: absolute;
          left: ${unifiedDesignTokens.spacing.medium};
          top: 50%;
          transform: translateY(-50%);
          color: ${unifiedDesignTokens.colors.secondaryLabel};
          font-size: 1.1rem;
          pointer-events: none;
        }

        /* Sort dropdown enhancement */
        select.enhanced-sort {
          background: ${designUtils.getGlassCard('subtle').background};
          backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter};
          border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
          border-radius: ${unifiedDesignTokens.cornerRadius.small};
          color: ${unifiedDesignTokens.colors.label};
          padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium};
          font-size: ${unifiedDesignTokens.typography.subheadline.size};
          cursor: pointer;
          transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard};
        }

        select.enhanced-sort:hover {
          border-color: ${unifiedDesignTokens.colors.systemBlue};
        }
      `}</style>
    </div>
  );
};

// Product Page Quick Buy Button Enhancement
export const EnhancedProductPageActions: React.FC<{
  product: any;
  onQuickBuy?: () => void;
}> = ({ product, onQuickBuy }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="enhanced-product-actions">
      <style jsx>{`
        .enhanced-product-actions {
          display: flex;
          gap: ${unifiedDesignTokens.spacing.medium};
          margin-top: ${unifiedDesignTokens.spacing.large};
        }
      `}</style>

      <EnhancedBuyNowButton
        product={product}
        onBuyNow={() => setShowCheckout(true)}
        className="flex-1"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onQuickBuy}
        style={{
          background: designUtils.getGlassCard('subtle').background,
          backdropFilter: designUtils.getGlassCard('subtle').backdropFilter,
          border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
          borderRadius: unifiedDesignTokens.cornerRadius.medium,
          color: unifiedDesignTokens.colors.label,
          padding: `${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large}`,
          cursor: 'pointer',
          fontSize: unifiedDesignTokens.typography.callout.size,
          fontWeight: '500',
          transition: `all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard}`,
          minHeight: unifiedDesignTokens.components.button.minHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: unifiedDesignTokens.spacing.tiny,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = unifiedDesignTokens.colors.systemBlue;
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = unifiedDesignTokens.colors.separator;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        ♡ Wishlist
      </motion.button>

      <CheckoutIntegration
        product={product}
        onClose={() => setShowCheckout(false)}
      />
    </div>
  );
};

export default PetersenProductPageEnhancements;