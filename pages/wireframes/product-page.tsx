// Quantum Spatial Wireframe - Immersive Product Page
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductPageWireframe() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [cartAnimation, setCartAnimation] = useState(false)

  const product = {
    id: 1,
    title: "Cthulhu Wars Core Set",
    subtitle: "Ultimate Cosmic Horror Strategy Experience",
    price: 149.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviews: 324,
    inStock: true,
    stockCount: 12,
    sku: "PG-CW-CORE-001",
    gameStats: {
      players: "2-4 Players",
      time: "90-120 Minutes",
      age: "14+ Years",
      complexity: "4/5 Complexity",
      weight: "3.2 lbs",
      dimensions: "12\" x 12\" x 4\""
    },
    images: ["🐙", "🎲", "📦", "🗿", "📖"],
    badges: ["Bestseller", "Staff Pick", "Award Winner"],
    shortDescription: "Command Great Old Ones in this asymmetric strategy game featuring massive miniatures and deep tactical gameplay.",
    fullDescription: `Cthulhu Wars is a fast-moving strategy game about the end of the world. You take the part of various monstrous aliens seeking to dominate the world. You can play as Great Cthulhu himself, or you can take charge of other factions, such as the slithering Crawling Chaos, or the insane Black Goat of the Woods.

Each faction has a different style of play, and different strengths and weaknesses. The game includes dozens of miniatures, and the game board is a map of Earth. The game typically lasts about 90 minutes.`,
    features: [
      "Asymmetric faction gameplay with unique abilities",
      "Over 64 high-quality miniatures included",
      "Area control mechanics with strategic depth",
      "Multiple paths to victory",
      "Expandable with numerous faction packs",
      "Award-winning game design by Sandy Petersen"
    ],
    contents: [
      "1 Game Board (Map of Earth)",
      "64+ High-Quality Miniatures",
      "4 Faction Boards",
      "Power Markers and Tokens",
      "Doom Clock Track",
      "Rulebook and Quick Reference",
      "Custom Dice Set"
    ]
  }

  const relatedProducts = [
    { id: 2, title: "Daemon Sultan Expansion", price: 79.99, image: "👹" },
    { id: 3, title: "Crawling Chaos Faction", price: 64.99, image: "🐍" },
    { id: 4, title: "Premium Dice Set", price: 24.99, image: "🎲" },
    { id: 5, title: "Deluxe Storage Box", price: 39.99, image: "📦" }
  ]

  const reviews = [
    {
      id: 1,
      author: "CosmicGamer42",
      rating: 5,
      date: "2 weeks ago",
      title: "Absolutely incredible game!",
      content: "The miniatures are stunning and the asymmetric gameplay keeps every match fresh. Worth every penny.",
      helpful: 23,
      verified: true
    },
    {
      id: 2,
      author: "BoardGameMaster",
      rating: 4,
      date: "1 month ago", 
      title: "Great strategy depth",
      content: "Complex but rewarding. The different factions really change how you approach each game.",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      author: "HorrorFan88",
      rating: 5,
      date: "2 months ago",
      title: "Perfect theme integration",
      content: "Love how the Lovecraftian theme is woven into every mechanic. Highly recommended!",
      helpful: 31,
      verified: false
    }
  ]

  const addToCart = () => {
    setCartAnimation(true)
    setTimeout(() => setCartAnimation(false), 2000)
  }

  return (
    <div className="quantum-background min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 backdrop-blur-lg bg-black/20">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/wireframes/product-grid" className="text-2xl hover:text-purple-300 transition-colors">←</Link>
              <nav className="flex items-center space-x-2 text-sm text-tertiary">
                <Link href="/wireframes/homepage" className="hover:text-secondary">Home</Link>
                <span>/</span>
                <Link href="/wireframes/product-grid" className="hover:text-secondary">Games</Link>
                <span>/</span>
                <span className="text-primary">Cthulhu Wars</span>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-lg">🔍</span>
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative">
                <span className="text-lg">🛒</span>
                {cartAnimation && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs">✓</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="glass-card p-8 relative">
              <div className="text-8xl text-center mb-4 transition-transform duration-300 hover:scale-110">
                {product.images[activeImageIndex]}
              </div>
              
              {/* Image Navigation */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button 
                  onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  disabled={activeImageIndex === 0}
                >
                  ←
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button 
                  onClick={() => setActiveImageIndex(Math.min(product.images.length - 1, activeImageIndex + 1))}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  disabled={activeImageIndex === product.images.length - 1}
                >
                  →
                </button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.map(badge => (
                  <span key={badge} className={`px-3 py-1 rounded-full text-xs font-medium ${
                    badge === 'Bestseller' ? 'bg-yellow-500/20 text-yellow-300' :
                    badge === 'Staff Pick' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Wishlist */}
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <span className={`text-xl ${isWishlisted ? 'text-red-400' : 'text-white'}`}>
                  {isWishlisted ? '♥' : '♡'}
                </span>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 glass-card flex items-center justify-center text-2xl transition-all ${
                    activeImageIndex === index ? 'ring-2 ring-purple-500' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              <p className="text-lg text-secondary mb-4">{product.subtitle}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-secondary">{product.rating}</span>
                </div>
                <span className="text-tertiary">({product.reviews} reviews)</span>
                <span className="text-tertiary">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-gradient-energy">${product.price}</div>
              {product.originalPrice && (
                <div className="text-lg text-tertiary line-through">${product.originalPrice}</div>
              )}
              {product.originalPrice && (
                <div className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={product.inStock ? 'text-green-300' : 'text-red-300'}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Game Stats */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Game Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span>👥</span>
                  <span className="text-tertiary">Players:</span>
                  <span>{product.gameStats.players}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⏱️</span>
                  <span className="text-tertiary">Time:</span>
                  <span>{product.gameStats.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🎯</span>
                  <span className="text-tertiary">Age:</span>
                  <span>{product.gameStats.age}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🧩</span>
                  <span className="text-tertiary">Complexity:</span>
                  <span>{product.gameStats.complexity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⚖️</span>
                  <span className="text-tertiary">Weight:</span>
                  <span>{product.gameStats.weight}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📏</span>
                  <span className="text-tertiary">Size:</span>
                  <span>{product.gameStats.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm text-tertiary">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="btn-primary flex-1 relative overflow-hidden"
                >
                  {cartAnimation ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Added to Cart!</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>🛒</span>
                      <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                    </span>
                  )}
                </button>
                <button className="btn-secondary px-6">
                  ♡ Wishlist
                </button>
              </div>

              <button className="btn-accent w-full">
                🚀 Buy Now - Fast Checkout
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="glass-card p-4">
                <div className="text-2xl mb-2">🚚</div>
                <div className="font-medium">Free Shipping</div>
                <div className="text-tertiary">Orders $75+</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl mb-2">↩️</div>
                <div className="font-medium">Easy Returns</div>
                <div className="text-tertiary">30-day policy</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-medium">Expert Help</div>
                <div className="text-tertiary">Live chat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="glass-card">
          {/* Tab Navigation */}
          <div className="border-b border-white/10">
            <div className="flex space-x-8 p-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'contents', label: 'What\'s Included' },
                { id: 'reviews', label: `Reviews (${product.reviews})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`pb-4 font-medium transition-colors relative ${
                    selectedTab === tab.id 
                      ? 'text-purple-300 border-b-2 border-purple-500' 
                      : 'text-tertiary hover:text-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About This Game</h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    {product.shortDescription}
                  </p>
                  
                  <div className={`text-secondary leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
                    {product.fullDescription}
                  </div>
                  
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-purple-300 hover:text-purple-200 mt-2"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <span className="text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'contents' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Box Contents</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    {product.contents.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span className="text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold mb-3">Additional Info</h4>
                    <div className="space-y-2 text-sm text-tertiary">
                      <div>Publisher: Petersen Games</div>
                      <div>Designer: Sandy Petersen</div>
                      <div>Year Published: 2015</div>
                      <div>Language: English</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <button className="btn-secondary">Write Review</button>
                </div>

                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-white/10 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="font-medium">{review.author}</span>
                            {review.verified && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                            <span className="text-tertiary text-sm">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-secondary mb-3">{review.content}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="text-tertiary hover:text-secondary">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="text-tertiary hover:text-secondary">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="glass-card p-4">
                        <h4 className="font-medium mb-2">🚚 Standard Shipping</h4>
                        <p className="text-tertiary text-sm">5-7 business days • $9.99</p>
                        <p className="text-tertiary text-sm">Free on orders $75+</p>
                      </div>
                      <div className="glass-card p-4">
                        <h4 className="font-medium mb-2">⚡ Express Shipping</h4>
                        <p className="text-tertiary text-sm">2-3 business days • $19.99</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">📦 Return Policy</h4>
                      <ul className="space-y-2 text-sm text-tertiary">
                        <li>• 30-day return window</li>
                        <li>• Free returns on defective items</li>
                        <li>• Original packaging required</li>
                        <li>• Refund processed within 5-7 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(related => (
              <div key={related.id} className="glass-card p-6 group cursor-pointer">
                <div className="text-4xl text-center mb-4 group-hover:scale-110 transition-transform">
                  {related.image}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">{related.title}</h3>
                <div className="text-xl font-bold text-center text-gradient-energy mb-4">
                  ${related.price}
                </div>
                <button className="btn-primary w-full">Quick Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}