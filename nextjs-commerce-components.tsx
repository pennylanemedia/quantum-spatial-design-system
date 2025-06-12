// ========================================
// PETERSEN GAMES - NEXTJS COMMERCE COMPONENTS
// Ready-to-use React components for NextJS Commerce
// ========================================

import Link from 'next/link'
import Image from 'next/image'
import { Product, ProductVariant } from '@/lib/shopify/types'

// === PRODUCT CARD COMPONENT ===
interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <div className="product-card">
      <Link href={`/product/${product.handle}`}>
        <div className="product-image-container">
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              width={400}
              height={400}
              className="product-image"
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          )}
        </div>
        
        <div className="product-content">
          <h3 className="product-title">{product.title}</h3>
          
          <div className="product-price">
            {product.compareAtPriceRange?.maxVariantPrice?.amount && 
             product.compareAtPriceRange.maxVariantPrice.amount !== product.priceRange.minVariantPrice.amount && (
              <span className="shopify-compare-price">
                ${product.compareAtPriceRange.maxVariantPrice.amount}
              </span>
            )}
            <span className="shopify-price">
              ${product.priceRange.minVariantPrice.amount}
            </span>
          </div>
          
          <p className="product-description">
            {product.description ? 
              product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '') 
              : ''
            }
          </p>
        </div>
      </Link>
    </div>
  )
}

// === PRODUCT GRID COMPONENT ===
interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4 | 'auto'
}

export function ProductGrid({ products, columns = 'auto' }: ProductGridProps) {
  const gridClass = columns === 'auto' ? 'grid-auto' : `grid-${columns}`
  
  return (
    <div className={gridClass}>
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={index < 4} // Priority loading for first 4 products
        />
      ))}
    </div>
  )
}

// === HERO SECTION COMPONENT ===
interface HeroSectionProps {
  title: string
  subtitle: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
}

export function HeroSection({ title, subtitle, primaryButton, secondaryButton }: HeroSectionProps) {
  return (
    <section className="hero">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      
      {(primaryButton || secondaryButton) && (
        <div className="hero-buttons">
          {primaryButton && (
            <Link href={primaryButton.href} className="btn btn-primary">
              {primaryButton.text}
            </Link>
          )}
          {secondaryButton && (
            <Link href={secondaryButton.href} className="btn btn-secondary">
              {secondaryButton.text}
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

// === NAVIGATION COMPONENT ===
interface NavigationItem {
  label: string
  href: string
}

interface NavigationProps {
  logo: string
  items: NavigationItem[]
  cartItemCount?: number
}

export function Navigation({ logo, items, cartItemCount = 0 }: NavigationProps) {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-container">
          <Link href="/" className="nav-logo">{logo}</Link>
          
          <ul className="nav-menu">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="nav-link">
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

// === SECTION COMPONENT ===
interface SectionProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function Section({ title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section className={`section ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </section>
  )
}

// === GLASS CARD COMPONENT ===
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function GlassCard({ children, className = '', padding = 'xl' }: GlassCardProps) {
  return (
    <div className={`glass-card p-${padding} ${className}`}>
      {children}
    </div>
  )
}

// === ADD TO CART BUTTON (placeholder for your existing component) ===
interface AddToCartButtonProps {
  product: Product
  selectedVariant?: ProductVariant
  className?: string
}

export function AddToCartButton({ product, selectedVariant, className = '' }: AddToCartButtonProps) {
  // This should integrate with your existing cart logic
  const handleAddToCart = () => {
    // Your add to cart logic here
    console.log('Add to cart:', product.id, selectedVariant?.id)
  }
  
  return (
    <button 
      onClick={handleAddToCart}
      className={`btn btn-primary w-full ${className}`}
      disabled={!product.availableForSale}
    >
      {product.availableForSale ? 'Add to Cart' : 'Sold Out'}
    </button>
  )
}

// === PRODUCT IMAGE GALLERY (basic version) ===
interface ProductImageGalleryProps {
  images: Array<{
    url: string
    altText?: string
    width: number
    height: number
  }>
  productTitle: string
}

export function ProductImageGallery({ images, productTitle }: ProductImageGalleryProps) {
  if (!images || images.length === 0) return null
  
  return (
    <div className="product-image-gallery">
      <Image
        src={images[0].url}
        alt={images[0].altText || productTitle}
        width={images[0].width}
        height={images[0].height}
        className="w-full h-auto"
        style={{ borderRadius: 'var(--radius-md)' }}
        priority
      />
      
      {images.length > 1 && (
        <div className="grid-4 mt-md">
          {images.slice(1, 5).map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={image.altText || `${productTitle} ${index + 2}`}
              width={100}
              height={100}
              className="w-full h-auto"
              style={{ borderRadius: 'var(--radius-sm)' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// === LOADING SKELETON COMPONENTS ===
export function ProductCardSkeleton() {
  return (
    <div className="glass-card" style={{ opacity: 0.6 }}>
      <div className="w-full h-48 bg-gray-700 rounded-md mb-md"></div>
      <div className="h-6 bg-gray-700 rounded mb-sm"></div>
      <div className="h-4 bg-gray-700 rounded mb-sm w-3/4"></div>
      <div className="h-10 bg-gray-700 rounded"></div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid-auto">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// === LAYOUT COMPONENTS ===
export function Container({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  )
}

export function QuantumBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="quantum-background">
      {children}
    </div>
  )
}

// === SEARCH/FILTER COMPONENTS ===
interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({ placeholder = "Search games...", onSearch, className = '' }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    onSearch?.(query)
  }
  
  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="form-group">
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          className="form-input"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  )
}

// === PRICE COMPONENT ===
interface PriceProps {
  amount: string
  currencyCode: string
  compareAtAmount?: string
  className?: string
}

export function Price({ amount, currencyCode, compareAtAmount, className = '' }: PriceProps) {
  return (
    <div className={`product-price ${className}`}>
      {compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount) && (
        <span className="shopify-compare-price">
          {currencyCode === 'USD' ? '$' : ''}{compareAtAmount}
        </span>
      )}
      <span className="shopify-price">
        {currencyCode === 'USD' ? '$' : ''}{amount}
      </span>
    </div>
  )
}

// === EXPORT ALL COMPONENTS ===
export {
  ProductCard,
  ProductGrid,
  HeroSection,
  Navigation,
  Section,
  GlassCard,
  AddToCartButton,
  ProductImageGallery,
  ProductCardSkeleton,
  ProductGridSkeleton,
  Container,
  QuantumBackground,
  SearchBar,
  Price
}

// === SAMPLE PAGE LAYOUTS ===

// Homepage Layout
export function HomepageLayout({ featuredProducts }: { featuredProducts: Product[] }) {
  return (
    <QuantumBackground>
      <Container>
        <HeroSection
          title="Epic Tabletop Adventures"
          subtitle="Discover immersive games that bring your imagination to life"
          primaryButton={{ text: "Shop All Games", href: "/search" }}
          secondaryButton={{ text: "New Releases", href: "/search?collection=new" }}
        />
        
        <Section
          title="Featured Games"
          subtitle="Our most popular and acclaimed tabletop experiences"
        >
          <ProductGrid products={featuredProducts} columns={4} />
        </Section>
      </Container>
    </QuantumBackground>
  )
}

// Collection Page Layout
export function CollectionPageLayout({ 
  products, 
  collectionTitle, 
  collectionDescription 
}: { 
  products: Product[]
  collectionTitle: string
  collectionDescription?: string 
}) {
  return (
    <QuantumBackground>
      <Container>
        <HeroSection
          title={collectionTitle}
          subtitle={collectionDescription || "Epic tabletop adventures await"}
        />
        
        <Section>
          <ProductGrid products={products} />
        </Section>
      </Container>
    </QuantumBackground>
  )
}

// Product Page Layout
export function ProductPageLayout({ product }: { product: Product }) {
  return (
    <QuantumBackground>
      <Container>
        <Section>
          <div className="grid-2">
            <GlassCard>
              <ProductImageGallery 
                images={product.images?.edges?.map(edge => edge.node) || []} 
                productTitle={product.title}
              />
            </GlassCard>
            
            <GlassCard>
              <h1 className="section-title text-left mb-lg">{product.title}</h1>
              
              <Price
                amount={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
                compareAtAmount={product.compareAtPriceRange?.maxVariantPrice?.amount}
                className="mb-lg"
              />
              
              <div className="mb-xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {product.description}
              </div>
              
              <AddToCartButton product={product} />
            </GlassCard>
          </div>
        </Section>
      </Container>
    </QuantumBackground>
  )
}