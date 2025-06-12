// Quantum Spatial Design System - Main Index
import { useState } from 'react'
import Link from 'next/link'

export default function QuantumSpatialIndex() {
  const [activeSection, setActiveSection] = useState('wireframes')

  return (
    <div className="quantum-background">
      <div className="container section-padding">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-gradient-quantum mb-4">
            Quantum Spatial Design System
          </h1>
          <p className="text-secondary text-large max-w-3xl mx-auto mb-8">
            Deep glossy glass dark void black deep purple liquid foundation with Apple HIG acceleration.
            A comprehensive design system for creating sophisticated, gaming-focused user interfaces.
          </p>
          
          {/* Navigation */}
          <nav className="flex justify-center gap-4 flex-wrap">
            {[
              { id: 'wireframes', label: 'Wireframes' },
              { id: 'components', label: 'Components' },
              { id: 'tokens', label: 'Design Tokens' },
              { id: 'foundation', label: 'Foundation' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-tertiary hover:text-secondary hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Content Sections */}
        {activeSection === 'wireframes' && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/wireframes/homepage" className="glass-card p-8 block group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Homepage</h3>
              <p className="text-tertiary">
                Hero section with quantum navigation and glassmorphic product showcase
              </p>
            </Link>
            
            <Link href="/wireframes/product-grid" className="glass-card p-8 block group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎲</div>
              <h3 className="text-xl font-semibold mb-2">Product Grid</h3>
              <p className="text-tertiary">
                Advanced filtering system with spatial grid layout and live search
              </p>
            </Link>
            
            <Link href="/wireframes/product-page" className="glass-card p-8 block group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-xl font-semibold mb-2">Product Page</h3>
              <p className="text-tertiary">
                Immersive product experience with quantum image gallery and stats
              </p>
            </Link>
          </section>
        )}

        {activeSection === 'components' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">Typography System</h3>
              <div className="space-y-4">
                <h1>Heading 1 - Display</h1>
                <h2>Heading 2 - Large Title</h2>
                <h3>Heading 3 - Title</h3>
                <h4>Heading 4 - Subtitle</h4>
                <p className="text-secondary">Body text with excellent readability in dark mode</p>
                <p className="text-tertiary text-small">Small text for captions and metadata</p>
                <p className="text-gradient-cosmic">Gradient text for special emphasis</p>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">Button System</h3>
              <div className="space-y-4">
                <button className="btn-primary w-full">Primary Action</button>
                <button className="btn-secondary w-full">Secondary Action</button>
                <button className="btn-accent w-full">Accent Action</button>
                <div className="pt-4">
                  <input 
                    type="text" 
                    placeholder="Glass input field..." 
                    className="input-glass"
                  />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: 'Void Black', color: '#0A0621' },
                  { name: 'Deep Space', color: '#131A36' },
                  { name: 'Quantum Violet', color: '#6A3093' },
                  { name: 'Rose Energy', color: '#BF4080' },
                  { name: 'Subtle Cyan', color: '#5AC8FA' },
                  { name: 'Apple Blue', color: '#007AFF' },
                  { name: 'Quantum Pink', color: '#FF2D55' },
                  { name: 'Cosmic Aqua', color: '#00FFC8' }
                ].map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: color.color }}
                    />
                    <p className="text-xs text-tertiary">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">Text Contrast Levels</h3>
              <div className="space-y-2">
                <p className="text-primary">Primary text (100% white)</p>
                <p className="text-secondary">Secondary text (85% opacity)</p>
                <p className="text-tertiary">Tertiary text (70% opacity)</p>
                <p className="text-quaternary">Quaternary text (60% opacity)</p>
                <p className="text-placeholder">Placeholder text (45% opacity)</p>
                <p className="text-disabled">Disabled text (30% opacity)</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'foundation' && (
          <section className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6">Quantum Spatial Foundation</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-secondary">
                  The Quantum Spatial Design System is built on a foundation of <strong>deep glossy glass</strong> 
                  elements floating in a <strong>dark void black deep purple liquid</strong> environment. 
                  This creates an immersive, sophisticated aesthetic perfect for gaming and high-end applications.
                </p>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Core Principles</h4>
                <ul className="text-secondary space-y-2">
                  <li><strong>Glassmorphism:</strong> Multi-layer transparency with backdrop blur effects</li>
                  <li><strong>Quantum Depth:</strong> Layered gradients creating dimensional space</li>
                  <li><strong>Apple HIG Acceleration:</strong> Native font rendering and smooth animations</li>
                  <li><strong>Excellent Dark Mode:</strong> Optimized contrast ratios for readability</li>
                  <li><strong>Spatial Awareness:</strong> Elements that feel suspended in liquid space</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Technical Implementation</h4>
                <ul className="text-secondary space-y-2">
                  <li><strong>SF Pro Display/Text:</strong> Apple's system fonts for optimal readability</li>
                  <li><strong>Backdrop Filter:</strong> Hardware-accelerated blur effects</li>
                  <li><strong>CSS Custom Properties:</strong> Systematic color and spacing tokens</li>
                  <li><strong>Responsive Typography:</strong> Fluid scaling with clamp() functions</li>
                  <li><strong>Accessibility:</strong> High contrast and reduced motion support</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-tertiary">
            Quantum Spatial Design System • 9Bit Studios • 2025
          </p>
        </footer>
      </div>
    </div>
  )
}