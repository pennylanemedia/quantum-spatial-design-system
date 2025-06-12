import React from 'react';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';

// Filter Page Enhancement Components for your existing collections/all.tsx
// These enhancements work with your current SidebarLayout and filter structure

export const FilterPageEnhancementStyles = () => (
  <style jsx global>{`
    /* FILTER PAGE ENHANCEMENT STYLES */
    /* Apply these to your existing filter page elements */

    /* Enhanced Filter Tabs Container */
    .filter-tabs-container.unified-enhanced {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      -webkit-backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border-bottom: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large} !important;
    }

    /* Enhanced Individual Filter Tabs */
    .filter-tab.unified-enhanced {
      background: rgba(255, 255, 255, 0.05) !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.small} !important;
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium} !important;
      font-size: ${unifiedDesignTokens.typography.subheadline.size} !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      backdrop-filter: blur(10px) !important;
    }

    .filter-tab.unified-enhanced:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      transform: translateY(-1px) !important;
      color: ${unifiedDesignTokens.colors.label} !important;
    }

    .filter-tab.unified-enhanced.active {
      background: ${unifiedDesignTokens.gradients.primaryButton} !important;
      border-color: rgba(79, 195, 247, 0.6) !important;
      color: white !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
    }

    .filter-tab.unified-enhanced.active:hover {
      transform: translateY(-2px) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.medium} !important;
    }

    /* Enhanced Search Bar Section */
    .search-section.unified-enhanced {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border-bottom: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large} !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      gap: ${unifiedDesignTokens.spacing.medium} !important;
    }

    /* Enhanced Search Input Container */
    .search-container.unified-enhanced {
      position: relative !important;
      flex: 1 !important;
      max-width: 480px !important;
    }

    .search-container.unified-enhanced input {
      width: 100% !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.medium} 48px !important;
      background: ${designUtils.getGlassCard('prominent').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.medium} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
      font-size: ${unifiedDesignTokens.typography.body.size} !important;
      outline: none !important;
      transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
    }

    .search-container.unified-enhanced input:focus {
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2) !important;
      background: rgba(255, 255, 255, 0.1) !important;
    }

    .search-container.unified-enhanced input::placeholder {
      color: ${unifiedDesignTokens.colors.tertiaryLabel} !important;
    }

    .search-container.unified-enhanced::before {
      content: '🔍' !important;
      position: absolute !important;
      left: ${unifiedDesignTokens.spacing.medium} !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      font-size: 1.1rem !important;
      pointer-events: none !important;
      z-index: 1 !important;
    }

    /* Enhanced Controls Section */
    .controls-section.unified-enhanced {
      display: flex !important;
      align-items: center !important;
      gap: ${unifiedDesignTokens.spacing.medium} !important;
    }

    .product-count.unified-enhanced {
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      font-size: ${unifiedDesignTokens.typography.subheadline.size} !important;
      font-weight: 500 !important;
    }

    /* Enhanced Sort Dropdown */
    select.unified-enhanced {
      background: ${designUtils.getGlassCard('prominent').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.small} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
      padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium} !important;
      font-size: ${unifiedDesignTokens.typography.subheadline.size} !important;
      cursor: pointer !important;
      transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
    }

    select.unified-enhanced:hover {
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      background: rgba(255, 255, 255, 0.08) !important;
    }

    select.unified-enhanced:focus {
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2) !important;
      outline: none !important;
    }

    /* Enhanced Product Grid */
    .products-grid.unified-enhanced {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)) !important;
      gap: ${unifiedDesignTokens.spacing.large} !important;
      padding: ${unifiedDesignTokens.spacing.xlarge} 0 !important;
    }

    /* Enhanced Product Items */
    .product-item.unified-enhanced {
      background: ${designUtils.getGlassCard('prominent').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      -webkit-backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.large} !important;
      overflow: hidden !important;
      transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard} !important;
      cursor: pointer !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.glassSubtle} !important;
    }

    .product-item.unified-enhanced:hover {
      transform: translateY(-8px) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium} !important;
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
    }

    /* Enhanced Product Image */
    .product-image.unified-enhanced {
      position: relative !important;
      height: 240px !important;
      overflow: hidden !important;
      background: linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%) !important;
    }

    .product-image.unified-enhanced img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      transition: transform ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard} !important;
    }

    .product-item.unified-enhanced:hover .product-image.unified-enhanced img {
      transform: scale(1.05) !important;
    }

    /* Enhanced Game Stats Badges */
    .game-stats.unified-enhanced {
      position: absolute !important;
      top: ${unifiedDesignTokens.spacing.medium} !important;
      right: ${unifiedDesignTokens.spacing.medium} !important;
      display: flex !important;
      gap: ${unifiedDesignTokens.spacing.small} !important;
    }

    .game-stat-badge.unified-enhanced {
      background: rgba(0, 0, 0, 0.9) !important;
      backdrop-filter: blur(20px) !important;
      border: ${unifiedDesignTokens.lineWeights.hairline} solid rgba(255, 255, 255, 0.1) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.small} !important;
      padding: ${unifiedDesignTokens.spacing.tiny} ${unifiedDesignTokens.spacing.small} !important;
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
    }

    .game-stat-badge.unified-enhanced span {
      color: white !important;
      font-size: ${unifiedDesignTokens.typography.caption2.size} !important;
      font-weight: 500 !important;
    }

    /* Enhanced Product Info */
    .product-info.unified-enhanced {
      padding: ${unifiedDesignTokens.spacing.large} !important;
    }

    .product-title.unified-enhanced {
      font-size: ${unifiedDesignTokens.typography.headline.size} !important;
      font-weight: ${unifiedDesignTokens.typography.headline.weight} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
      margin-bottom: ${unifiedDesignTokens.spacing.small} !important;
      line-height: ${unifiedDesignTokens.typography.headline.lineHeight} !important;
    }

    .product-description.unified-enhanced {
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      font-size: ${unifiedDesignTokens.typography.body.size} !important;
      line-height: 1.5 !important;
      margin-bottom: ${unifiedDesignTokens.spacing.medium} !important;
    }

    /* Enhanced Price and Actions Row */
    .price-actions-row.unified-enhanced {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: ${unifiedDesignTokens.spacing.medium} !important;
    }

    .product-price.unified-enhanced {
      font-size: ${unifiedDesignTokens.typography.title2.size} !important;
      font-weight: 700 !important;
      background: ${unifiedDesignTokens.gradients.quantumPrimary} !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }

    .add-to-cart-btn.unified-enhanced {
      background: ${unifiedDesignTokens.gradients.primaryButton} !important;
      border: none !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.medium} !important;
      color: white !important;
      padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium} !important;
      font-size: ${unifiedDesignTokens.typography.callout.size} !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
      display: flex !important;
      align-items: center !important;
      gap: ${unifiedDesignTokens.spacing.tiny} !important;
    }

    .add-to-cart-btn.unified-enhanced:hover {
      transform: translateY(-1px) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.medium} !important;
    }

    .add-to-cart-btn.unified-enhanced:active {
      transform: translateY(0) !important;
    }

    /* Enhanced Loading States */
    .loading-item.unified-enhanced {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.large} !important;
      overflow: hidden !important;
      height: 400px !important;
    }

    .loading-shimmer.unified-enhanced {
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.05) 25%, 
        rgba(255, 255, 255, 0.1) 50%, 
        rgba(255, 255, 255, 0.05) 75%
      ) !important;
      background-size: 200% 100% !important;
      animation: shimmer 1.5s infinite !important;
    }

    .loading-image.unified-enhanced {
      height: 250px !important;
      background: rgba(255, 255, 255, 0.02) !important;
    }

    .loading-text.unified-enhanced {
      padding: ${unifiedDesignTokens.spacing.medium} !important;
    }

    .loading-title.unified-enhanced {
      height: 18px !important;
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.micro} !important;
      margin-bottom: ${unifiedDesignTokens.spacing.small} !important;
    }

    .loading-description.unified-enhanced {
      height: 14px !important;
      background: rgba(255, 255, 255, 0.05) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.micro} !important;
      margin-bottom: ${unifiedDesignTokens.spacing.medium} !important;
    }

    .loading-button.unified-enhanced {
      height: 32px !important;
      background: rgba(79, 195, 247, 0.2) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.small} !important;
    }

    /* Enhanced Error States */
    .error-container.unified-enhanced {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.systemRed} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.large} !important;
      padding: ${unifiedDesignTokens.spacing.large} !important;
      text-align: center !important;
      margin-bottom: ${unifiedDesignTokens.spacing.xlarge} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
    }

    .error-text.unified-enhanced {
      color: ${unifiedDesignTokens.colors.systemRed} !important;
      font-size: ${unifiedDesignTokens.typography.body.size} !important;
      margin: 0 !important;
    }

    /* Enhanced No Products State */
    .no-products.unified-enhanced {
      text-align: center !important;
      padding: ${unifiedDesignTokens.spacing.xxlarge} ${unifiedDesignTokens.spacing.xlarge} !important;
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.xlarge} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
    }

    .no-products-title.unified-enhanced {
      font-size: ${unifiedDesignTokens.typography.title3.size} !important;
      font-weight: ${unifiedDesignTokens.typography.title3.weight} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
      margin-bottom: ${unifiedDesignTokens.spacing.medium} !important;
    }

    .no-products-message.unified-enhanced {
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      font-size: ${unifiedDesignTokens.typography.body.size} !important;
    }

    /* Mobile Responsive Enhancements */
    @media (max-width: 768px) {
      .products-grid.unified-enhanced {
        grid-template-columns: 1fr !important;
        gap: ${unifiedDesignTokens.spacing.medium} !important;
        padding: ${unifiedDesignTokens.spacing.large} 0 !important;
      }

      .search-section.unified-enhanced {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: ${unifiedDesignTokens.spacing.medium} !important;
      }

      .controls-section.unified-enhanced {
        justify-content: space-between !important;
      }

      .filter-tabs-container.unified-enhanced {
        padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.medium} !important;
        overflow-x: auto !important;
      }

      .filter-tabs-container.unified-enhanced > div {
        display: flex !important;
        gap: ${unifiedDesignTokens.spacing.tiny} !important;
        min-width: max-content !important;
      }
    }

    /* Enhanced focus states for accessibility */
    .filter-tab.unified-enhanced:focus-visible,
    .search-container.unified-enhanced input:focus-visible,
    select.unified-enhanced:focus-visible,
    .add-to-cart-btn.unified-enhanced:focus-visible {
      outline: 2px solid ${unifiedDesignTokens.colors.systemBlue} !important;
      outline-offset: 2px !important;
    }

    /* Animation keyframes */
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
  `}</style>
);

// Component to apply enhancements to your existing filter page
export const EnhancedFilterPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="unified-filter-page-wrapper">
      <FilterPageEnhancementStyles />
      {children}
    </div>
  );
};

// Instructions for applying enhancements to your existing filter page
export const FilterPageEnhancementInstructions = `
=================================================================
FILTER PAGE ENHANCEMENT INTEGRATION GUIDE
=================================================================

STEP 1: Add CSS classes to your existing collections/all.tsx elements
---------------------------------------------------------------------

Filter Tabs Container:
- Add class="unified-enhanced" to the div containing your filter tabs

Individual Filter Tabs:
- Add class="filter-tab unified-enhanced" to each filter button
- Add class="active" to the currently active tab

Search Section:
- Add class="search-section unified-enhanced" to the search bar container
- Add class="search-container unified-enhanced" to the search input wrapper
- Add class="controls-section unified-enhanced" to the controls container

Product Count and Sort:
- Add class="product-count unified-enhanced" to your product count text
- Add class="unified-enhanced" to your sort dropdown

Product Grid:
- Add class="products-grid unified-enhanced" to your grid container
- Add class="product-item unified-enhanced" to each product card
- Add class="product-image unified-enhanced" to image containers
- Add class="game-stats unified-enhanced" to game stats container
- Add class="game-stat-badge unified-enhanced" to individual stat badges

Product Info:
- Add class="product-info unified-enhanced" to product info containers
- Add class="product-title unified-enhanced" to product titles
- Add class="product-description unified-enhanced" to descriptions
- Add class="price-actions-row unified-enhanced" to price/button containers
- Add class="product-price unified-enhanced" to price displays
- Add class="add-to-cart-btn unified-enhanced" to add to cart buttons

Loading States:
- Add class="loading-item unified-enhanced" to loading containers
- Add class="loading-shimmer unified-enhanced" to shimmer elements

Error States:
- Add class="error-container unified-enhanced" to error containers
- Add class="error-text unified-enhanced" to error text

STEP 2: Example implementations
-------------------------------

Your existing filter tabs container:
<div style={{padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', gap: '8px'}}>

Enhanced version:
<div className="filter-tabs-container unified-enhanced">

Your existing filter button:
<button style={{background: 'rgba(0, 122, 255, 0.3)', ...}}>
  All Games
</button>

Enhanced version:
<button className="filter-tab unified-enhanced active">
  All Games
</button>

Your existing search container:
<div style={{position: 'relative', width: '400px'}}>

Enhanced version:
<div className="search-container unified-enhanced">

Your existing product grid:
<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'}}>

Enhanced version:
<div className="products-grid unified-enhanced">

Your existing product card:
<div style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', ...}}>

Enhanced version:
<div className="product-item unified-enhanced">

STEP 3: Wrap your filter page component
---------------------------------------

import { EnhancedFilterPageWrapper } from '../components/FilterPageEnhancements'

export default function AllProductsCollection() {
  return (
    <EnhancedFilterPageWrapper>
      <SidebarLayout>
        {/* Your existing filter page content */}
      </SidebarLayout>
    </EnhancedFilterPageWrapper>
  )
}

STEP 4: What stays the same
---------------------------
✅ All your existing functionality
✅ Shopify API calls and real product data
✅ Product links (/products/\${product.handle})
✅ Add to cart functionality
✅ Search and filtering logic
✅ Loading states and error handling
✅ Mobile responsiveness

STEP 5: What gets enhanced
-------------------------
🎨 Glassmorphic filter tabs and search bar
🎨 Unified design system styling
🎨 Smooth hover animations and transitions
🎨 Enhanced product cards with depth
🎨 Improved game stats badges
🎨 Better loading and error states
🎨 Apple HIG compliant interactions
🎨 Enhanced accessibility features

=================================================================
`;

export default FilterPageEnhancementStyles;