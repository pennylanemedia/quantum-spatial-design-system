// Quantum Spatial Wireframe - Advanced Product Grid with Filtering
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductGridWireframe() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid, list
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [cartItems, setCartItems] = useState<number[]>([])

  const categories = [
    { id: 'all', label: 'All Games', icon: '🎲', count: 42 },
    { id: 'horror', label: 'Cosmic Horror', icon: '🐙', count: 12 },
    { id: 'strategy', label: 'Strategy', icon: '⚔️', count: 18 },
    { id: 'expansions', label: 'Expansions', icon: '🧩', count: 25 },
    { id: 'miniatures', label: 'Miniatures', icon: '🗿', count: 8 },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', count: 6 }
  ]

  const products = [
    {
      id: 1,
      title: "Cthulhu Wars Core Set",
      price: 149.99,
      originalPrice: 169.99,
      category: 'horror',
      image: "🐙",
      rating: 4.8,
      reviews: 324,
      gameStats: { players: "2-4", time: "90-120m", age: "14+", complexity: "4/5" },
      badges: ["Bestseller", "Staff Pick"],
      inStock: true,
      description: "The ultimate cosmic horror strategy experience with massive miniatures."
    },
    {
      id: 2,
      title: "Planet Apocalypse",
      price: 129.99,
      category: 'horror',
      image: "🌍",
      rating: 4.6,
      reviews: 187,
      gameStats: { players: "1-5", time: "60-90m", age: "13+", complexity: "3/5" },
      badges: ["New Release"],
      inStock: true,
      description: "Defend Earth from invading demons in this intense survival game."
    },
    {
      id: 3,
      title: "Evil High Priest Expansion",
      price: 89.99,
      category: 'expansions',
      image: "⚡",
      rating: 4.7,
      reviews: 156,
      gameStats: { players: "2-4", time: "45-60m", age: "14+", complexity: "4/5" },
      badges: ["Popular"],
      inStock: false,
      description: "Add supernatural terror to your Cthulhu Wars experience."
    },
    {
      id: 4,
      title: "Onslaught Miniatures Set",
      price: 64.99,
      category: 'miniatures',
      image: "🗿",
      rating: 4.9,
      reviews: 89,
      gameStats: { players: "2-6", time: "30-45m", age: "12+", complexity: "2/5" },
      badges: ["Limited Edition"],
      inStock: true,
      description: "Premium painted miniatures for enhanced gameplay."
    },
    {
      id: 5,
      title: "Theomachy Strategy Game",
      price: 99.99,
      category: 'strategy',
      image: "⚔️",
      rating: 4.5,
      reviews: 203,
      gameStats: { players: "2-4", time: "60-90m", age: "14+", complexity: "4/5" },
      badges: [],
      inStock: true,
      description: "Command mythological armies in epic strategic battles."
    },
    {
      id: 6,
      title: "Orcs Must Die! Board Game",
      price: 79.99,
      category: 'family',
      image: "🧌",
      rating: 4.4,
      reviews: 142,
      gameStats: { players: "1-4", time: "45-60m", age: "10+", complexity: "2/5" },
      badges: ["Family Friendly"],
      inStock: true,
      description: "Tower defense mechanics in a fun board game format."
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesCategory && matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId])
  }

  return (
    <div className="quantum-background min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 backdrop-blur-lg bg-black/20">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/wireframes/homepage" className="text-2xl">←</Link>
              <h1 className="text-2xl font-bold">Game Collection</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-lg">🔍</span>
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative">
                <span className="text-lg">🛒</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container hig-section">
        <div className="hig-sidebar-layout">
          {/* Sidebar Filters */}
          <div className={`hig-stack-large ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="glass-card-elevated p-6">
              <h3 className="hig-headline mb-4">Categories</h3>
              <div className="hig-stack-small">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-12 transition-all min-h-44 ${
                      activeCategory === category.id
                        ? 'bg-apple-blue/20 text-apple-blue border border-apple-blue/30'
                        : 'bg-elevated-background hover:bg-tertiary-background text-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="hig-callout font-medium">{category.label}</span>
                    </div>
                    <span className="hig-caption">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="glass-card-elevated p-6">
              <h3 className="hig-headline mb-4">Price Range</h3>
              <div className="hig-stack">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between">
                  <span className="hig-subheadline">${priceRange[0]}</span>
                  <span className="hig-subheadline">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Game Stats Filters */}
            <div className="glass-card-elevated p-6">
              <h3 className="hig-headline mb-4">Game Stats</h3>
              <div className="hig-stack">
                <div>
                  <label className="hig-subheadline mb-2">Player Count</label>
                  <div className="flex flex-wrap gap-2">
                    {['1', '2', '3', '4', '5+'].map(count => (
                      <button key={count} className="px-3 py-2 rounded-full bg-elevated-background hover:bg-tertiary-background hig-footnote min-h-32">
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="hig-subheadline mb-2">Play Time</label>
                  <div className="flex flex-wrap gap-2">
                    {['<30m', '30-60m', '60-90m', '90m+'].map(time => (
                      <button key={time} className="px-3 py-2 rounded-full bg-elevated-background hover:bg-tertiary-background hig-footnote min-h-32">
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Special Filters */}
            <div className="glass-card-elevated p-6">
              <h3 className="hig-headline mb-4">Special</h3>
              <div className="hig-stack-small">
                {['On Sale', 'New Releases', 'Staff Picks', 'In Stock Only'].map(filter => (
                  <label key={filter} className="hig-hstack cursor-pointer p-2 rounded-lg hover:bg-elevated-background">
                    <input type="checkbox" className="accent-apple-blue" />
                    <span className="hig-callout">{filter}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Controls */}
            <div className="glass-card-elevated p-6 mb-8">
              <div className="hig-stack md:hig-hstack">
                {/* Search */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-glass pl-10"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary">🔍</span>
                </div>

                {/* View Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden btn-secondary"
                  >
                    🔧 Filters
                  </button>
                  
                  <div className="hig-hstack-small">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-colors min-h-44 ${
                        viewMode === 'grid' ? 'bg-apple-blue/20 text-apple-blue' : 'bg-elevated-background hover:bg-tertiary-background'
                      }`}
                    >
                      ⬜
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-colors min-h-44 ${
                        viewMode === 'list' ? 'bg-apple-blue/20 text-apple-blue' : 'bg-elevated-background hover:bg-tertiary-background'
                      }`}
                    >
                      ☰
                    </button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-glass bg-transparent"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <p className="hig-subheadline">
                  Showing {sortedProducts.length} of {products.length} games
                </p>
                <div className="hig-hstack-small">
                  <span className="hig-subheadline">Per page:</span>
                  <select className="bg-transparent hig-subheadline">
                    <option>12</option>
                    <option>24</option>
                    <option>48</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map(product => (
                <div key={product.id} className={`glass-card group cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center space-x-6 p-6' : 'p-6'
                }`}>
                  {/* Product Image & Badges */}
                  <div className={`relative ${viewMode === 'list' ? 'w-24 h-24' : 'w-full'}`}>
                    {viewMode === 'grid' && (
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-wrap gap-2">
                          {product.badges.map(badge => (
                            <span key={badge} className={`px-2 py-1 rounded-full text-xs font-medium ${
                              badge === 'Bestseller' ? 'bg-yellow-500/20 text-yellow-300' :
                              badge === 'New Release' ? 'bg-green-500/20 text-green-300' :
                              badge === 'Staff Pick' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-purple-500/20 text-purple-300'
                            }`}>
                              {badge}
                            </span>
                          ))}
                        </div>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          ♡
                        </button>
                      </div>
                    )}

                    <div className={`text-center ${viewMode === 'list' ? 'text-4xl' : 'text-6xl mb-4'}`}>
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                      </div>
                    </div>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <span className="text-red-400 font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'flex items-start justify-between' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <Link href="/wireframes/product-page" className="block">
                          <h3 className={`font-semibold mb-2 group-hover:text-purple-300 transition-colors ${
                            viewMode === 'list' ? 'text-lg' : 'text-xl'
                          }`}>
                            {product.title}
                          </h3>
                        </Link>

                        {viewMode === 'list' && (
                          <p className="text-tertiary text-sm mb-2">{product.description}</p>
                        )}

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                          </div>
                          <span className="text-sm text-tertiary">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Game Stats */}
                        <div className={`flex text-sm text-tertiary mb-4 ${
                          viewMode === 'list' ? 'space-x-6' : 'justify-between'
                        }`}>
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
                          <div className="flex items-center space-x-1">
                            <span>🧩</span>
                            <span>{product.gameStats.complexity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className={`${viewMode === 'list' ? 'ml-6 text-right' : ''}`}>
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-gradient-energy">
                            ${product.price}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-tertiary line-through">
                              ${product.originalPrice}
                            </div>
                          )}
                        </div>

                        <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col' : ''}`}>
                          <button
                            onClick={() => addToCart(product.id)}
                            disabled={!product.inStock}
                            className={`btn-primary ${viewMode === 'list' ? 'px-6' : 'flex-1'} ${
                              !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {cartItems.includes(product.id) ? 'Added ✓' : 'Add to Cart'}
                          </button>
                          <Link 
                            href="/wireframes/product-page"
                            className={`btn-secondary ${viewMode === 'list' ? 'px-6' : 'px-4'}`}
                          >
                            👁️
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-4 mt-12">
              <button className="btn-secondary">← Previous</button>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(page => (
                  <button key={page} className={`w-10 h-10 rounded-lg transition-colors ${
                    page === 1 ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 hover:bg-white/10'
                  }`}>
                    {page}
                  </button>
                ))}
              </div>
              <button className="btn-secondary">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}