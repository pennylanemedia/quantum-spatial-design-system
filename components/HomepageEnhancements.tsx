import React from 'react';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';

// Homepage Enhancement Components for your existing Petersen Games site
// These components integrate seamlessly with your current homepage structure

export const HomepageEnhancementStyles = () => (
  <style jsx global>{`
    /* HOMEPAGE ENHANCEMENT STYLES */
    /* Apply these to your existing homepage elements */

    /* Enhanced Hero Section */
    #hero.unified-enhanced {
      position: relative;
      background: linear-gradient(135deg, 
        rgba(147, 51, 234, 0.15) 0%, 
        rgba(79, 70, 229, 0.12) 25%, 
        rgba(236, 72, 153, 0.10) 50%, 
        rgba(245, 158, 11, 0.12) 75%, 
        rgba(147, 51, 234, 0.15) 100%
      ) !important;
      backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial} !important;
      -webkit-backdrop-filter: ${unifiedDesignTokens.depth.backdrop.thickMaterial} !important;
    }

    #hero.unified-enhanced::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: ${unifiedDesignTokens.lineWeights.hairline} solid rgba(255, 255, 255, 0.1);
      border-radius: ${unifiedDesignTokens.cornerRadius.xlarge};
      pointer-events: none;
      z-index: 1;
    }

    #hero.unified-enhanced > * {
      position: relative;
      z-index: 2;
    }

    /* Enhanced Typography */
    #hero h1 {
      font-size: ${unifiedDesignTokens.typography.largeTitle.size} !important;
      font-weight: ${unifiedDesignTokens.typography.largeTitle.weight} !important;
      line-height: ${unifiedDesignTokens.typography.largeTitle.lineHeight} !important;
      letter-spacing: ${unifiedDesignTokens.typography.largeTitle.letterSpacing} !important;
      text-shadow: ${unifiedDesignTokens.typography.largeTitle.textShadow} !important;
    }

    #hero p {
      font-size: ${unifiedDesignTokens.typography.title3.size} !important;
      font-weight: ${unifiedDesignTokens.typography.title3.weight} !important;
      line-height: ${unifiedDesignTokens.typography.title3.lineHeight} !important;
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
    }

    /* Enhanced CTA Buttons */
    #hero button.unified-enhanced,
    #hero a.unified-enhanced {
      background: ${unifiedDesignTokens.gradients.primaryButton} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid rgba(79, 195, 247, 0.3) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.medium} !important;
      color: white !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.xlarge} !important;
      font-size: ${unifiedDesignTokens.typography.callout.size} !important;
      font-weight: ${unifiedDesignTokens.typography.callout.weight} !important;
      cursor: pointer !important;
      transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
      backdrop-filter: blur(20px) !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: ${unifiedDesignTokens.spacing.small} !important;
    }

    #hero button.unified-enhanced:hover,
    #hero a.unified-enhanced:hover {
      transform: translateY(-2px) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.medium} !important;
      border-color: rgba(79, 195, 247, 0.6) !important;
    }

    #hero button.unified-enhanced.secondary,
    #hero a.unified-enhanced.secondary {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
    }

    #hero button.unified-enhanced.secondary:hover,
    #hero a.unified-enhanced.secondary:hover {
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      background: rgba(255, 255, 255, 0.1) !important;
    }

    /* Enhanced Product Carousel */
    .product-carousel.unified-enhanced {
      padding: ${unifiedDesignTokens.spacing.large} 0 !important;
    }

    .product-carousel.unified-enhanced .product-card {
      background: ${designUtils.getGlassCard('prominent').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      -webkit-backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.xlarge} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium} !important;
      transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard} !important;
      overflow: hidden !important;
    }

    .product-carousel.unified-enhanced .product-card:hover {
      transform: translateY(-12px) scale(1.02) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.glassLarge} !important;
      border-color: rgba(79, 195, 247, 0.6) !important;
    }

    .product-carousel.unified-enhanced .product-card h3 {
      font-size: ${unifiedDesignTokens.typography.headline.size} !important;
      font-weight: ${unifiedDesignTokens.typography.headline.weight} !important;
      line-height: ${unifiedDesignTokens.typography.headline.lineHeight} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
    }

    .product-carousel.unified-enhanced .product-card p {
      font-size: ${unifiedDesignTokens.typography.body.size} !important;
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      line-height: ${unifiedDesignTokens.typography.body.lineHeight} !important;
    }

    .product-carousel.unified-enhanced .product-card button {
      background: ${unifiedDesignTokens.gradients.primaryButton} !important;
      border: none !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.continuous} !important;
      color: white !important;
      padding: ${unifiedDesignTokens.spacing.small} ${unifiedDesignTokens.spacing.large} !important;
      font-size: ${unifiedDesignTokens.typography.callout.size} !important;
      font-weight: ${unifiedDesignTokens.typography.callout.weight} !important;
      cursor: pointer !important;
      transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
    }

    .product-carousel.unified-enhanced .product-card button:hover {
      transform: translateY(-1px) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.medium} !important;
    }

    /* Enhanced Game Stats Overlay */
    .product-carousel.unified-enhanced .product-card [style*="position: absolute"][style*="top: 16px"] {
      background: rgba(0, 0, 0, 0.9) !important;
      backdrop-filter: blur(20px) !important;
      border: ${unifiedDesignTokens.lineWeights.hairline} solid rgba(255, 255, 255, 0.1) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.medium} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
    }

    /* Enhanced Pricing */
    .product-carousel.unified-enhanced .product-card [style*="font-size: 1.75rem"] {
      background: ${unifiedDesignTokens.gradients.quantumPrimary} !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
      font-weight: 700 !important;
    }

    /* Enhanced Newsletter Section */
    #community.unified-enhanced {
      background: linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(79, 70, 229, 0.03) 100%) !important;
      position: relative !important;
    }

    #community.unified-enhanced::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${designUtils.getGlassCard('subtle').background};
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter};
      border: ${unifiedDesignTokens.lineWeights.hairline} solid rgba(255, 255, 255, 0.05);
      pointer-events: none;
    }

    #community.unified-enhanced > * {
      position: relative;
      z-index: 1;
    }

    #community h2 {
      font-size: ${unifiedDesignTokens.typography.largeTitle.size} !important;
      font-weight: ${unifiedDesignTokens.typography.largeTitle.weight} !important;
      line-height: ${unifiedDesignTokens.typography.largeTitle.lineHeight} !important;
      text-shadow: ${unifiedDesignTokens.typography.largeTitle.textShadow} !important;
    }

    #community p {
      font-size: ${unifiedDesignTokens.typography.title3.size} !important;
      color: ${unifiedDesignTokens.colors.secondaryLabel} !important;
      line-height: ${unifiedDesignTokens.typography.title3.lineHeight} !important;
    }

    /* Enhanced Newsletter Form */
    .newsletter-form-modern.unified-enhanced {
      background: ${designUtils.getGlassCard('prominent').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      -webkit-backdrop-filter: ${designUtils.getGlassCard('prominent').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.xlarge} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.glassMedium} !important;
      padding: ${unifiedDesignTokens.spacing.xxlarge} !important;
    }

    .newsletter-form-modern.unified-enhanced input {
      background: rgba(255, 255, 255, 0.08) !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid rgba(255, 255, 255, 0.2) !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.continuous} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
      font-size: ${unifiedDesignTokens.typography.body.size} !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.large} !important;
      transition: all ${unifiedDesignTokens.animation.duration.fast} ${unifiedDesignTokens.animation.easing.standard} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
    }

    .newsletter-form-modern.unified-enhanced input:focus {
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2) !important;
      background: rgba(255, 255, 255, 0.12) !important;
      outline: none !important;
    }

    .newsletter-form-modern.unified-enhanced input::placeholder {
      color: ${unifiedDesignTokens.colors.tertiaryLabel} !important;
    }

    .newsletter-form-modern.unified-enhanced button {
      background: ${unifiedDesignTokens.gradients.primaryButton} !important;
      border: none !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.continuous} !important;
      color: white !important;
      font-size: ${unifiedDesignTokens.typography.callout.size} !important;
      font-weight: ${unifiedDesignTokens.typography.callout.weight} !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.xlarge} !important;
      cursor: pointer !important;
      transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
    }

    .newsletter-form-modern.unified-enhanced button:hover {
      transform: translateY(-2px) !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.medium} !important;
    }

    /* Enhanced Section Headers */
    #games h2,
    #community h2 {
      font-size: clamp(2rem, 4vw, ${unifiedDesignTokens.typography.largeTitle.size}) !important;
      font-weight: ${unifiedDesignTokens.typography.largeTitle.weight} !important;
      line-height: ${unifiedDesignTokens.typography.largeTitle.lineHeight} !important;
      letter-spacing: ${unifiedDesignTokens.typography.largeTitle.letterSpacing} !important;
      text-shadow: ${unifiedDesignTokens.typography.largeTitle.textShadow} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
    }

    /* Enhanced "View All Games" CTA */
    a[href="/collections/all"].unified-enhanced {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.continuous} !important;
      color: ${unifiedDesignTokens.colors.label} !important;
      padding: ${unifiedDesignTokens.spacing.medium} ${unifiedDesignTokens.spacing.xlarge} !important;
      font-size: ${unifiedDesignTokens.typography.callout.size} !important;
      font-weight: ${unifiedDesignTokens.typography.callout.weight} !important;
      text-decoration: none !important;
      transition: all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard} !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: ${unifiedDesignTokens.spacing.small} !important;
      min-height: ${unifiedDesignTokens.components.button.minHeight} !important;
    }

    a[href="/collections/all"].unified-enhanced:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: ${unifiedDesignTokens.colors.systemBlue} !important;
      transform: translateY(-2px) !important;
    }

    /* Enhanced Loading States */
    .loading.unified-enhanced {
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.05) 25%, 
        rgba(255, 255, 255, 0.1) 50%, 
        rgba(255, 255, 255, 0.05) 75%
      ) !important;
      background-size: 200% 100% !important;
      animation: shimmer 1.5s infinite !important;
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }

    /* Enhanced Error States */
    .error-message.unified-enhanced {
      background: ${designUtils.getGlassCard('subtle').background} !important;
      backdrop-filter: ${designUtils.getGlassCard('subtle').backdropFilter} !important;
      border: ${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.systemRed} !important;
      border-radius: ${unifiedDesignTokens.cornerRadius.large} !important;
      color: ${unifiedDesignTokens.colors.systemRed} !important;
      padding: ${unifiedDesignTokens.spacing.large} !important;
      box-shadow: ${unifiedDesignTokens.depth.shadows.soft} !important;
    }

    /* Mobile Enhancements */
    @media (max-width: 768px) {
      .product-carousel.unified-enhanced .product-card {
        width: 300px !important;
        min-width: 300px !important;
        max-width: 300px !important;
        height: 420px !important;
      }

      .newsletter-form-modern.unified-enhanced {
        padding: ${unifiedDesignTokens.spacing.large} !important;
      }

      .newsletter-form-modern.unified-enhanced > div {
        flex-direction: column !important;
        gap: ${unifiedDesignTokens.spacing.medium} !important;
      }

      .newsletter-form-modern.unified-enhanced button {
        width: 100% !important;
      }
    }

    /* Smooth scrolling enhancement */
    html {
      scroll-behavior: smooth !important;
    }

    /* Enhanced focus states for accessibility */
    button:focus-visible,
    a:focus-visible,
    input:focus-visible {
      outline: 2px solid ${unifiedDesignTokens.colors.systemBlue} !important;
      outline-offset: 2px !important;
    }
  `}</style>
);

// Component to apply enhancements to your existing homepage
export const EnhancedHomepageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="unified-homepage-wrapper">
      <HomepageEnhancementStyles />
      {children}
    </div>
  );
};

// Instructions for applying enhancements to your existing homepage
export const HomepageEnhancementInstructions = `
=================================================================
HOMEPAGE ENHANCEMENT INTEGRATION GUIDE
=================================================================

STEP 1: Add CSS classes to your existing homepage elements
----------------------------------------------------------

Hero Section:
- Add class="unified-enhanced" to your #hero section

CTA Buttons:
- Add class="unified-enhanced" to your primary buttons
- Add class="unified-enhanced secondary" to your secondary buttons

Product Carousel:
- Add class="unified-enhanced" to your .product-carousel div

Newsletter Section:
- Add class="unified-enhanced" to your #community section
- Add class="unified-enhanced" to your .newsletter-form-modern div

View All Games Link:
- Add class="unified-enhanced" to your "View all games" link

STEP 2: Example implementations
-------------------------------

Your existing hero button:
<button style={{...}} onClick={() => window.location.href = '/collections/all'}>
  Shop games
</button>

Enhanced version:
<button className="unified-enhanced" style={{...}} onClick={() => window.location.href = '/collections/all'}>
  Shop games
</button>

Your existing product carousel:
<div className="product-carousel">

Enhanced version:
<div className="product-carousel unified-enhanced">

STEP 3: Wrap your homepage component
------------------------------------

import { EnhancedHomepageWrapper } from '../components/HomepageEnhancements'

export default function Home() {
  return (
    <EnhancedHomepageWrapper>
      <Layout>
        {/* Your existing homepage content */}
      </Layout>
    </EnhancedHomepageWrapper>
  )
}

STEP 4: What stays the same
---------------------------
✅ All your existing functionality
✅ Shopify API calls
✅ Product links and cart functionality
✅ Image loading and error handling
✅ Mobile responsiveness
✅ Accessibility features

STEP 5: What gets enhanced
-------------------------
🎨 Glassmorphic design effects
🎨 Unified typography and spacing
🎨 Smooth animations and transitions
🎨 Enhanced button and form styling
🎨 Improved visual hierarchy
🎨 Apple HIG compliant interactions

=================================================================
`;

export default HomepageEnhancementStyles;