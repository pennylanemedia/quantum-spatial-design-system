// Quantum Spatial Design System - Enhanced Main Index
import { useState } from 'react'
import Link from 'next/link'
import EnhancedPetersenGamesDashboard from '../components/EnhancedPetersenGamesDashboard'

export default function QuantumSpatialIndex() {
  const [activeSection, setActiveSection] = useState('dashboard')

  if (activeSection === 'dashboard') {
    return (
      <div className="quantum-background-enhanced" style={{ height: '100vh', overflow: 'hidden' }}>
        <EnhancedPetersenGamesDashboard 
          isMobile={false} 
          showInternalNav={true}
          sections={[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'wireframes', label: 'Wireframes' },
            { id: 'components', label: 'Components' },
            { id: 'tokens', label: 'Design Tokens' },
            { id: 'foundation', label: 'Foundation' }
          ]}
          onSectionChange={setActiveSection}
          title="Quantum Spatial Design System"
          subtitle=""
        />
      </div>
    )
  }

  return (
    <div className="quantum-background-enhanced">
      <div className="container section-padding">
        {/* Compact Header */}
        <header className="text-center mb-8">
          <nav className="flex justify-center gap-4 flex-wrap">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'wireframes', label: 'Wireframes' },
              { id: 'components', label: 'Components' },
              { id: 'tokens', label: 'Design Tokens' },
              { id: 'foundation', label: 'Foundation' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`tab-item-enhanced ${
                  activeSection === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

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
            <div className="glass-card-enhanced p-8">
              <h3 className="text-xl font-semibold mb-4">Enhanced Typography System</h3>
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
            
            <div className="glass-card-enhanced p-8">
              <h3 className="text-xl font-semibold mb-4">Enhanced Button System</h3>
              <div className="space-y-4">
                <button className="btn-primary-glass w-full">Enhanced Primary Glass</button>
                <button className="btn-secondary-glass w-full">Enhanced Secondary Glass</button>
                <button className="btn-accent-gradient w-full">Enhanced Accent Gradient</button>
                <div className="pt-4">
                  <input 
                    type="text" 
                    placeholder="Enhanced oil slick input..." 
                    className="input-enhanced"
                  />
                </div>
              </div>
            </div>
            
            <div className="glass-card-enhanced p-8">
              <h3 className="text-xl font-semibold mb-4">Enhanced Oil Slick Palette</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: 'Void Black', color: '#000000' },
                  { name: 'Deep Space', color: '#0A0A0F' },
                  { name: 'Oil Slick Purple', color: '#2D1B69' },
                  { name: 'Oil Slick Indigo', color: '#1E1B4B' },
                  { name: 'Deep Cosmic', color: '#4C1D95' },
                  { name: 'Cosmic Indigo', color: '#312E81' },
                  { name: 'Electric Indigo', color: '#4F46E5' },
                  { name: 'Subtle Violet', color: '#6366F1' }
                ].map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className="w-full h-12 rounded-lg mb-2 glow-subtle"
                      style={{ backgroundColor: color.color }}
                    />
                    <p className="text-xs text-tertiary">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card-enhanced p-8">
              <h3 className="text-xl font-semibold mb-4">Enhanced Text Contrast Levels</h3>
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
            <div className="glass-card-enhanced p-8">
              <h3 className="text-2xl font-semibold mb-6">Enhanced Oil Slick Foundation</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-secondary">
                  The Enhanced Quantum Spatial Design System is built on a foundation of <strong>deep glossy glass</strong> 
                  elements floating in a <strong>dark void black oil slick purple and indigo liquid</strong> environment. 
                  This creates an immersive, sophisticated aesthetic perfect for gaming and high-end applications with 
                  subtle glows and rich depth.
                </p>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Enhanced Core Principles</h4>
                <ul className="text-secondary space-y-2">
                  <li><strong>Oil Slick Glassmorphism:</strong> Multi-layer transparency with enhanced backdrop blur effects</li>
                  <li><strong>Deep Void Quantum Depth:</strong> Layered gradients creating dimensional oil slick space</li>
                  <li><strong>Apple HIG M4 Acceleration:</strong> Neural Engine optimized rendering and smooth animations</li>
                  <li><strong>Excellent Deep Dark Mode:</strong> Enhanced contrast ratios with oil slick accents</li>
                  <li><strong>Oil Slick Spatial Awareness:</strong> Elements suspended in liquid purple-indigo space</li>
                  <li><strong>Subtle Glow Enhancement:</strong> Not too bright but beautifully rich</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Enhanced Technical Implementation</h4>
                <ul className="text-secondary space-y-2">
                  <li><strong>SF Pro Display/Text:</strong> Apple's system fonts with enhanced dark mode readability</li>
                  <li><strong>Enhanced Backdrop Filter:</strong> 60px blur with 200% saturation for oil slick effect</li>
                  <li><strong>Oil Slick CSS Variables:</strong> Deep purple and indigo color tokens</li>
                  <li><strong>Hardware Acceleration:</strong> translateZ(0) for optimal performance</li>
                  <li><strong>Enhanced Accessibility:</strong> High contrast with subtle glow support</li>
                  <li><strong>M4 Neural Engine:</strong> Optimized for Apple Silicon performance</li>
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