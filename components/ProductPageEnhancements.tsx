import React from 'react';
import { unifiedDesignTokens } from './UnifiedDesignSystem';

// Enhanced CSS styles for your existing product page
// These can be added to your globals.css or as a styled component

export const ProductPageStyles = `
/* Enhanced Product Page Styles with Unified Design System */

/* Product Detail Container */
.product-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: ${unifiedDesignTokens.spacing.xxlarge};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${unifiedDesignTokens.spacing.xxlarge};
  align-items: start;
}

/* Product Images */
.product-images {
  position: sticky;
  top: ${unifiedDesignTokens.spacing.large};
}

.product-main-image {
  aspect-ratio: 1;
  margin-bottom: ${unifiedDesignTokens.spacing.large};
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
  -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
  border-radius: ${unifiedDesignTokens.cornerRadius.large};
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
}

.product-main-image:hover {
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassLarge};
  border-color: rgba(79, 195, 247, 0.3);
}

.product-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${unifiedDesignTokens.cornerRadius.medium};
}

.product-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${unifiedDesignTokens.colors.tertiaryLabel};
  background: rgba(79, 195, 247, 0.1);
  border-radius: ${unifiedDesignTokens.cornerRadius.medium};
}

.product-image-placeholder span {
  font-size: ${unifiedDesignTokens.typography.subheadline.size};
  margin-top: ${unifiedDesignTokens.spacing.small};
}

/* Thumbnails */
.product-thumbnails {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${unifiedDesignTokens.spacing.small};
  margin-bottom: ${unifiedDesignTokens.spacing.xxlarge};
}

.product-thumbnail {
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  border-radius: ${unifiedDesignTokens.cornerRadius.medium};
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${unifiedDesignTokens.colors.tertiaryLabel};
  font-size: 1.5rem;
}

.product-thumbnail:hover {
  border-color: ${unifiedDesignTokens.colors.systemBlue};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%);
}

.product-thumbnail.active {
  border-color: ${unifiedDesignTokens.colors.systemBlue};
  background: linear-gradient(135deg, rgba(79, 195, 247, 0.2) 0%, rgba(79, 195, 247, 0.1) 100%);
  box-shadow: 0 0 0 2px rgba(79, 195, 247, 0.3);
}

.product-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${unifiedDesignTokens.cornerRadius.small};
}

/* Product Info Column */
.product-info-column {
  display: flex;
  flex-direction: column;
  gap: ${unifiedDesignTokens.spacing.large};
}

.product-badge {
  display: inline-flex;
  align-items: center;
  padding: ${unifiedDesignTokens.spacing.tiny} ${unifiedDesignTokens.spacing.small};
  border-radius: ${unifiedDesignTokens.cornerRadius.small};
  font-size: ${unifiedDesignTokens.typography.caption1.size};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
}

.product-badge.featured {
  background: ${unifiedDesignTokens.gradients.primaryButton};
  color: white;
  box-shadow: ${unifiedDesignTokens.depth.shadows.soft};
}

.product-detail-title {
  font-size: ${unifiedDesignTokens.typography.largeTitle.size};
  font-weight: ${unifiedDesignTokens.typography.largeTitle.weight};
  line-height: ${unifiedDesignTokens.typography.largeTitle.lineHeight};
  letter-spacing: ${unifiedDesignTokens.typography.largeTitle.letterSpacing};
  color: ${unifiedDesignTokens.colors.label};
  margin: 0;
  text-shadow: ${unifiedDesignTokens.typography.largeTitle.textShadow};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-detail-price {
  font-size: ${unifiedDesignTokens.typography.title1.size};
  font-weight: 700;
  color: ${unifiedDesignTokens.colors.systemGreen};
  display: flex;
  align-items: baseline;
  gap: ${unifiedDesignTokens.spacing.small};
}

.product-compare-price {
  font-size: ${unifiedDesignTokens.typography.body.size};
  color: ${unifiedDesignTokens.colors.tertiaryLabel};
  text-decoration: line-through;
}

.product-savings {
  font-size: ${unifiedDesignTokens.typography.caption1.size};
  color: ${unifiedDesignTokens.colors.systemOrange};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Product Actions */
.product-actions {
  position: relative;
}

.btn-primary {
  background: ${unifiedDesignTokens.gradients.primaryButton};
  border: ${unifiedDesignTokens.lineWeights.regular} solid transparent;
  border-radius: ${unifiedDesignTokens.cornerRadius.medium};
  color: white;
  font-size: ${unifiedDesignTokens.typography.body.size};
  font-weight: 600;
  padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large};
  cursor: pointer;
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
  box-shadow: ${unifiedDesignTokens.depth.shadows.soft};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${unifiedDesignTokens.spacing.small};
  min-height: ${unifiedDesignTokens.components.button.minHeight};
}

.btn-primary:hover:not(:disabled) {
  box-shadow: ${unifiedDesignTokens.depth.shadows.medium};
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: ${unifiedDesignTokens.colors.quaternarySystemFill};
}

.btn-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  border-radius: ${unifiedDesignTokens.cornerRadius.medium};
  color: ${unifiedDesignTokens.colors.label};
  font-size: ${unifiedDesignTokens.typography.body.size};
  font-weight: 500;
  padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large};
  cursor: pointer;
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
  backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
  -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${unifiedDesignTokens.spacing.small};
  min-height: ${unifiedDesignTokens.components.button.minHeight};
}

.btn-glass:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: ${unifiedDesignTokens.colors.systemBlue};
  transform: translateY(-1px);
}

.cart-confirmation {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${unifiedDesignTokens.gradients.successButton};
  color: white;
  padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium};
  border-radius: ${unifiedDesignTokens.cornerRadius.small};
  font-size: ${unifiedDesignTokens.typography.caption1.size};
  font-weight: 600;
  margin-top: ${unifiedDesignTokens.spacing.small};
  box-shadow: ${unifiedDesignTokens.depth.shadows.medium};
}

/* Glass Cards */
.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  border-radius: ${unifiedDesignTokens.cornerRadius.large};
  backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
  -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial};
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassSubtle};
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
}

.glass-card:hover {
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
  border-color: rgba(79, 195, 247, 0.2);
}

/* Product Specs */
.product-specs {
  display: flex;
  flex-direction: column;
  gap: ${unifiedDesignTokens.spacing.small};
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${unifiedDesignTokens.spacing.small} 0;
  border-bottom: ${unifiedDesignTokens.lineWeights.hairline} solid ${unifiedDesignTokens.colors.separator};
}

.spec-item:last-child {
  border-bottom: none;
}

.spec-item span:first-child {
  color: ${unifiedDesignTokens.colors.secondaryLabel};
  font-size: ${unifiedDesignTokens.typography.subheadline.size};
}

.spec-item span:last-child {
  color: ${unifiedDesignTokens.colors.label};
  font-size: ${unifiedDesignTokens.typography.subheadline.size};
  font-weight: 600;
}

/* Product Features */
.product-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${unifiedDesignTokens.spacing.small};
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: ${unifiedDesignTokens.spacing.small};
  color: ${unifiedDesignTokens.colors.secondaryLabel};
  font-size: ${unifiedDesignTokens.typography.body.size};
  line-height: 1.6;
}

.feature-bullet {
  color: ${unifiedDesignTokens.colors.systemBlue};
  font-weight: 700;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Related Products */
.related-products {
  margin-top: ${unifiedDesignTokens.spacing.xxlarge};
}

.related-products h3 {
  color: ${unifiedDesignTokens.colors.label};
  font-size: ${unifiedDesignTokens.typography.title3.size};
  font-weight: ${unifiedDesignTokens.typography.title3.weight};
  margin-bottom: ${unifiedDesignTokens.spacing.large};
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${unifiedDesignTokens.spacing.medium};
}

.related-card {
  cursor: pointer;
  overflow: hidden;
  transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard};
}

.related-card:hover {
  transform: translateY(-2px);
  box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium};
}

.related-card .product-image {
  aspect-ratio: 1;
  overflow: hidden;
  background: rgba(79, 195, 247, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${unifiedDesignTokens.colors.tertiaryLabel};
  font-size: 2rem;
}

.related-card .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-card .product-title {
  font-size: ${unifiedDesignTokens.typography.subheadline.size};
  font-weight: 600;
  color: ${unifiedDesignTokens.colors.label};
  margin-bottom: ${unifiedDesignTokens.spacing.tiny};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.related-card .product-price {
  font-size: ${unifiedDesignTokens.typography.body.size};
  font-weight: 700;
  color: ${unifiedDesignTokens.colors.systemGreen};
}

/* Breadcrumb Enhancement */
.nav-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-bottom: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator};
  backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
  -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thinMaterial};
}

.nav-bar {
  max-width: 1400px;
  margin: 0 auto;
  padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${unifiedDesignTokens.spacing.medium};
}

/* Utility Classes */
.text-primary { color: ${unifiedDesignTokens.colors.label}; }
.text-secondary { color: ${unifiedDesignTokens.colors.secondaryLabel}; }
.text-muted { color: ${unifiedDesignTokens.colors.tertiaryLabel}; }
.text-success { color: ${unifiedDesignTokens.colors.systemGreen}; }
.text-error { color: ${unifiedDesignTokens.colors.systemRed}; }

.mb-xs { margin-bottom: ${unifiedDesignTokens.spacing.tiny}; }
.mb-sm { margin-bottom: ${unifiedDesignTokens.spacing.small}; }
.mb-md { margin-bottom: ${unifiedDesignTokens.spacing.medium}; }
.mb-lg { margin-bottom: ${unifiedDesignTokens.spacing.large}; }
.mb-xl { margin-bottom: ${unifiedDesignTokens.spacing.xlarge}; }
.mb-xxl { margin-bottom: ${unifiedDesignTokens.spacing.xxlarge}; }

.p-sm { padding: ${unifiedDesignTokens.spacing.small}; }
.p-md { padding: ${unifiedDesignTokens.spacing.medium}; }
.p-lg { padding: ${unifiedDesignTokens.spacing.large}; }
.p-xl { padding: ${unifiedDesignTokens.spacing.xlarge}; }

.w-full { width: 100%; }

.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-sm { gap: ${unifiedDesignTokens.spacing.small}; }

/* Mobile Responsive */
@media (max-width: 768px) {
  .product-detail-container {
    padding: ${unifiedDesignTokens.spacing.large};
  }
  
  .product-detail-grid {
    grid-template-columns: 1fr;
    gap: ${unifiedDesignTokens.spacing.large};
  }
  
  .product-images {
    position: static;
  }
  
  .product-thumbnails {
    grid-template-columns: repeat(4, 1fr);
    gap: ${unifiedDesignTokens.spacing.tiny};
  }
  
  .product-detail-title {
    font-size: ${unifiedDesignTokens.typography.title1.size};
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-bar {
    padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium};
    flex-direction: column;
    align-items: flex-start;
    gap: ${unifiedDesignTokens.spacing.small};
  }
}

/* Animation Classes */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

// React component to inject these styles
export const ProductPageStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <style jsx global>{ProductPageStyles}</style>
      {children}
    </>
  );
};

export default ProductPageStyles;