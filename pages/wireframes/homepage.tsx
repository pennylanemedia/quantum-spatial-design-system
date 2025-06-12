// Quantum Spatial Wireframe - Petersen Games Homepage
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomepageWireframe() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featuredProducts = [
    {
      id: 1,
      title: "Cthulhu Wars Core Set",
      price: "$149.99",
      image: "🐙",
      gameStats: { players: "2-4", time: "90-120m", age: "14+" },
      badge: "Bestseller"
    },
    {
      id: 2,
      title: "Planet Apocalypse",
      price: "$129.99", 
      image: "🌍",
      gameStats: { players: "1-5", time: "60-90m", age: "13+" },
      badge: "New"
    },
    {
      id: 3,
      title: "Evil High Priest",
      price: "$89.99",
      image: "⚡",
      gameStats: { players: "2-4", time: "45-60m", age: "14+" },
      badge: "Popular"
    }
  ]

  return (
    <div className="quantum-background min-h-screen">
      {/* Quantum Navigation Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'backdrop-blur-lg bg-black/20' : 'bg-transparent'
        }`}
        style={{
          backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <div className="container">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">PG</span>
              </div>
              <span className="text-xl font-semibold text-primary">Petersen Games</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/games" className="text-secondary hover:text-primary transition-colors">Games</Link>
              <Link href="/collections" className="text-secondary hover:text-primary transition-colors">Collections</Link>
              <Link href="/expansions" className="text-secondary hover:text-primary transition-colors">Expansions</Link>
              <Link href="/about" className="text-secondary hover:text-primary transition-colors">About</Link>
            </div>

            {/* Cart & Search */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-lg">🔍</span>
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative">
                <span className="text-lg">🛒</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              <button 
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="text-lg">☰</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-sm text-tertiary">🎮 New Release</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-cosmic">Legendary</span><br />
                <span className="text-primary">Horror Gaming</span>
              </h1>
              
              <p className="text-xl text-secondary max-w-lg leading-relaxed">
                Immerse yourself in cosmic horror and strategic warfare with Sandy Petersen's legendary board game collection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  <span>🎲</span>
                  Shop Games
                </button>
                <button className="btn-secondary">
                  <span>▶️</span>
                  Watch Trailer
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-tertiary">Games</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1M+</div>
                  <div className="text-sm text-tertiary">Players</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-tertiary">Years</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="glass-card p-8 relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(106, 48, 147, 0.3), transparent)',
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="text-8xl mb-4">🐙</div>
                  <h3 className="text-2xl font-semibold mb-2">Cthulhu Wars</h3>
                  <p className="text-secondary mb-6">The ultimate cosmic horror strategy experience</p>
                  <button className="btn-accent">Pre-order Now</button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 glass-card p-3 w-20 h-20 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="absolute bottom-4 left-4 glass-card p-3 w-20 h-20 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Games</h2>
            <p className="text-secondary text-lg">Discover our most popular cosmic horror experiences</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="glass-card p-6 group cursor-pointer">
                {/* Product Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.badge === 'Bestseller' ? 'bg-yellow-500/20 text-yellow-300' :
                    product.badge === 'New' ? 'bg-green-500/20 text-green-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {product.badge}
                  </span>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-sm">♡</span>
                  </button>
                </div>

                {/* Product Image */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <div className="text-2xl font-bold text-gradient-energy">{product.price}</div>
                </div>

                {/* Game Stats */}
                <div className="flex justify-between text-sm text-tertiary mb-6">
                  <div className="flex items-center space-x-1">
                    <span>👥</span>
                    <span>{product.gameStats.players}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⏱️</span>
                    <span>{product.gameStats.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🎯</span>
                    <span>{product.gameStats.age}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="btn-primary flex-1">Add to Cart</button>
                  <button className="btn-secondary px-4">👁️</button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/wireframes/product-grid" className="btn-secondary">
              View All Games
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Game Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🐙", title: "Cosmic Horror", count: "12 games", color: "purple" },
              { icon: "⚔️", title: "Strategy", count: "18 games", color: "blue" },
              { icon: "🧩", title: "Expansions", count: "25 games", color: "green" },
              { icon: "🎲", title: "Family Games", count: "8 games", color: "orange" }
            ].map((category, index) => (
              <Link href="/wireframes/product-grid" key={index} className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-tertiary text-sm">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container">
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join the Cosmic Collective</h2>
            <p className="text-secondary mb-8">Get exclusive updates, early access to new games, and special discounts.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="input-glass flex-1"
              />
              <button className="btn-accent whitespace-nowrap">Subscribe</button>
            </div>
            
            <p className="text-xs text-tertiary mt-4">
              No spam, unsubscribe anytime. View our privacy policy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold">PG</span>
                </div>
                <span className="font-semibold">Petersen Games</span>
              </div>
              <p className="text-tertiary text-sm">
                Creating legendary horror and strategy games since 2010.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Games</h4>
              <div className="space-y-2 text-sm text-tertiary">
                <div>Cthulhu Wars</div>
                <div>Planet Apocalypse</div>
                <div>Evil High Priest</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-tertiary">
                <div>Contact Us</div>
                <div>Rules & FAQ</div>
                <div>Shipping</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">📘</button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">🐦</button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">📺</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-tertiary text-sm">
            © 2025 Petersen Games. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}