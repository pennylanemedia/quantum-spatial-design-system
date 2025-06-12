import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EcommerceSideMenu, { EcommerceMenuItem, liquidGlassTokens } from './EcommerceSideMenu';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';

// Enhanced Design Tokens with Unified System Integration
const ecommerceDesignTokens = {
  ...unifiedDesignTokens,
  ...liquidGlassTokens,
  
  // Extended color system for ecommerce
  ecommerce: {
    success: '#34C759',     // Order completed, positive metrics
    warning: '#FF9500',     // Pending, needs attention
    error: '#FF3B30',       // Failed, critical issues
    info: '#007AFF',        // General information
    neutral: '#8E8E93',     // Inactive, disabled states
    
    // Revenue and financial colors
    revenue: '#30D158',     // Revenue growth
    expense: '#FF453A',     // Expenses, costs
    profit: '#64D2FF',      // Profit margins
    
    // Product status colors
    inStock: '#32D74B',     // Available inventory
    lowStock: '#FF9F0A',    // Low inventory warning
    outOfStock: '#FF453A',  // No inventory
    discontinued: '#8E8E93', // Discontinued products
  }
};

// Ecommerce-Specific Mock Data
const ecommerceMockData = {
  stats: {
    totalSales: { value: '$47,250', change: '+12.3%', trend: 'up' as const, period: 'This month' },
    orders: { value: 1247, change: '+8.7%', trend: 'up' as const, period: 'This week' },
    customers: { value: 892, change: '+15.2%', trend: 'up' as const, period: 'Active' },
    conversion: { value: '3.24%', change: '+0.45%', trend: 'up' as const, period: 'Average' }
  },
  
  recentOrders: [
    { id: '#1001', customer: 'Sarah Johnson', product: 'Wireless Headphones', amount: '$129.99', status: 'completed', timestamp: '2 minutes ago' },
    { id: '#1002', customer: 'Mike Chen', product: 'Smart Watch Pro', amount: '$299.99', status: 'processing', timestamp: '5 minutes ago' },
    { id: '#1003', customer: 'Emily Davis', product: 'Bluetooth Speaker', amount: '$79.99', status: 'shipped', timestamp: '12 minutes ago' },
    { id: '#1004', customer: 'James Wilson', product: 'Phone Case Bundle', amount: '$45.99', status: 'pending', timestamp: '18 minutes ago' },
    { id: '#1005', customer: 'Lisa Rodriguez', product: 'Laptop Stand', amount: '$89.99', status: 'completed', timestamp: '25 minutes ago' },
  ],
  
  topProducts: [
    { id: '1', name: 'Wireless Headphones Pro', sales: 245, revenue: '$31,850', trend: 85, category: 'Electronics' },
    { id: '2', name: 'Smart Watch Series 5', sales: 189, revenue: '$56,670', trend: 95, category: 'Wearables' },
    { id: '3', name: 'Bluetooth Speaker Max', sales: 156, revenue: '$12,480', trend: 65, category: 'Audio' },
    { id: '4', name: 'Phone Accessories Kit', sales: 134, revenue: '$6,164', trend: 45, category: 'Accessories' },
  ],
  
  recentActivity: [
    { id: '1', type: 'order', message: 'New order from premium customer', timestamp: '2 minutes ago', priority: 'high' },
    { id: '2', type: 'inventory', message: 'Low stock alert: Wireless Headphones', timestamp: '8 minutes ago', priority: 'medium' },
    { id: '3', type: 'customer', message: 'VIP customer registration', timestamp: '15 minutes ago', priority: 'high' },
    { id: '4', type: 'review', message: 'New 5-star product review', timestamp: '22 minutes ago', priority: 'low' },
    { id: '5', type: 'promotion', message: 'Flash sale campaign launched', timestamp: '35 minutes ago', priority: 'medium' },
  ]
};

// Filter Configuration Based on Wireframes
const filterCategories = [
  { id: 'all', label: 'All Products', active: true },
  { id: 'electronics', label: 'Electronics', active: false },
  { id: 'wearables', label: 'Wearables', active: false },
  { id: 'audio', label: 'Audio', active: false },
  { id: 'accessories', label: 'Accessories', active: false },
];

const orderFilters = [
  { id: 'all', label: 'All Orders', active: true },
  { id: 'pending', label: 'Pending', active: false },
  { id: 'processing', label: 'Processing', active: false },
  { id: 'shipped', label: 'Shipped', active: false },
  { id: 'completed', label: 'Completed', active: false },
];

// Apple HIG Compliant Filter Component
interface FilterTabProps {
  filters: Array<{ id: string; label: string; active: boolean }>;
  onFilterChange: (filterId: string) => void;
  isMobile?: boolean;
}

const FilterTabs: React.FC<FilterTabProps> = ({ filters, onFilterChange, isMobile = false }) => {
  return (
    <div style={{
      display: 'flex',
      gap: liquidGlassTokens.spacing.tiny,
      padding: liquidGlassTokens.spacing.small,
      backgroundColor: liquidGlassTokens.colors.secondarySystemFill,
      borderRadius: liquidGlassTokens.cornerRadius.medium,
      marginBottom: liquidGlassTokens.spacing.medium,
      overflowX: isMobile ? 'auto' : 'visible',
      WebkitOverflowScrolling: 'touch',
    }}>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: `${liquidGlassTokens.spacing.small} ${liquidGlassTokens.spacing.medium}`,
            borderRadius: liquidGlassTokens.cornerRadius.small,
            border: 'none',
            backgroundColor: filter.active 
              ? liquidGlassTokens.colors.systemBlue 
              : 'transparent',
            color: filter.active 
              ? 'white' 
              : liquidGlassTokens.colors.secondaryLabel,
            fontSize: liquidGlassTokens.typography.subheadline.size,
            fontWeight: filter.active ? '600' : '400',
            cursor: 'pointer',
            transition: `all ${liquidGlassTokens.animation.duration.short} ${liquidGlassTokens.animation.easing.standard}`,
            whiteSpace: 'nowrap',
            minWidth: 'fit-content',
          }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

// Enhanced Stat Card Component
interface EcommerceStatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  period: string;
  icon: React.ReactNode;
  accentColor: string;
  isMobile?: boolean;
}

const EcommerceStatCard: React.FC<EcommerceStatCardProps> = ({ 
  title, 
  value, 
  change, 
  trend,
  period,
  icon, 
  accentColor,
  isMobile = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: liquidGlassTokens.colors.secondarySystemFill,
        borderRadius: liquidGlassTokens.cornerRadius.large,
        padding: liquidGlassTokens.spacing.medium,
        border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
        backdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
        WebkitBackdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
        transition: `all ${liquidGlassTokens.animation.duration.short} ${liquidGlassTokens.animation.easing.standard}`,
        cursor: 'pointer',
        width: '100%',
        minHeight: isMobile ? '120px' : '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            color: liquidGlassTokens.colors.tertiaryLabel,
            fontSize: liquidGlassTokens.typography.footnote.size,
            fontWeight: '500',
            marginBottom: liquidGlassTokens.spacing.tiny,
          }}>
            {title}
          </div>
          <div style={{
            color: liquidGlassTokens.colors.label,
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '700',
            lineHeight: '1.1',
          }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>
        
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: liquidGlassTokens.cornerRadius.small,
          backgroundColor: `${accentColor}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
        }}>
          {icon}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{
          color: trend === 'up' ? ecommerceDesignTokens.ecommerce.success : ecommerceDesignTokens.ecommerce.error,
          fontSize: liquidGlassTokens.typography.caption1.size,
          fontWeight: '600',
        }}>
          {change}
        </div>
        <div style={{
          color: liquidGlassTokens.colors.quaternaryLabel,
          fontSize: liquidGlassTokens.typography.caption2.size,
        }}>
          {period}
        </div>
      </div>
    </motion.div>
  );
};

// Recent Orders Component
const RecentOrdersCard: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return ecommerceDesignTokens.ecommerce.success;
      case 'processing': return ecommerceDesignTokens.ecommerce.warning;
      case 'shipped': return ecommerceDesignTokens.ecommerce.info;
      case 'pending': return ecommerceDesignTokens.ecommerce.neutral;
      default: return ecommerceDesignTokens.ecommerce.neutral;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: liquidGlassTokens.colors.secondarySystemFill,
        borderRadius: liquidGlassTokens.cornerRadius.large,
        padding: liquidGlassTokens.spacing.medium,
        border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
        backdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
        width: '100%',
        minHeight: isMobile ? '300px' : '400px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: liquidGlassTokens.spacing.medium }}>
        <h3 style={{
          color: liquidGlassTokens.colors.label,
          fontSize: liquidGlassTokens.typography.title3.size,
          fontWeight: liquidGlassTokens.typography.title3.weight,
          margin: `0 0 ${liquidGlassTokens.spacing.tiny}`,
        }}>
          Recent Orders
        </h3>
        <p style={{
          color: liquidGlassTokens.colors.tertiaryLabel,
          fontSize: liquidGlassTokens.typography.footnote.size,
          margin: 0,
        }}>
          Latest customer orders and status
        </p>
      </div>

      {/* Filter Tabs */}
      <FilterTabs 
        filters={orderFilters} 
        onFilterChange={setSelectedFilter}
        isMobile={isMobile}
      />

      {/* Orders List */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: liquidGlassTokens.spacing.small,
        maxHeight: isMobile ? '200px' : '250px',
        overflowY: 'auto',
      }}>
        {ecommerceMockData.recentOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01, backgroundColor: liquidGlassTokens.colors.tertiarySystemFill }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: liquidGlassTokens.spacing.small,
              borderRadius: liquidGlassTokens.cornerRadius.small,
              backgroundColor: liquidGlassTokens.colors.quaternarySystemFill,
              transition: `all ${liquidGlassTokens.animation.duration.short} ${liquidGlassTokens.animation.easing.standard}`,
              cursor: 'pointer',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                color: liquidGlassTokens.colors.label,
                fontSize: liquidGlassTokens.typography.subheadline.size,
                fontWeight: '600',
                marginBottom: '2px',
              }}>
                {order.id} • {order.customer}
              </div>
              <div style={{
                color: liquidGlassTokens.colors.secondaryLabel,
                fontSize: liquidGlassTokens.typography.caption1.size,
              }}>
                {order.product} • {order.timestamp}
              </div>
            </div>
            
            <div style={{ textAlign: 'right', marginLeft: liquidGlassTokens.spacing.small }}>
              <div style={{
                color: liquidGlassTokens.colors.label,
                fontSize: liquidGlassTokens.typography.subheadline.size,
                fontWeight: '600',
                marginBottom: '2px',
              }}>
                {order.amount}
              </div>
              <div style={{
                backgroundColor: getStatusColor(order.status),
                color: 'white',
                padding: '2px 6px',
                borderRadius: liquidGlassTokens.cornerRadius.small,
                fontSize: liquidGlassTokens.typography.caption2.size,
                fontWeight: '600',
                textTransform: 'capitalize',
              }}>
                {order.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Top Products Component
const TopProductsCard: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        backgroundColor: liquidGlassTokens.colors.secondarySystemFill,
        borderRadius: liquidGlassTokens.cornerRadius.large,
        padding: liquidGlassTokens.spacing.medium,
        border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
        backdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
        width: '100%',
        minHeight: isMobile ? '300px' : '400px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: liquidGlassTokens.spacing.medium }}>
        <h3 style={{
          color: liquidGlassTokens.colors.label,
          fontSize: liquidGlassTokens.typography.title3.size,
          fontWeight: liquidGlassTokens.typography.title3.weight,
          margin: `0 0 ${liquidGlassTokens.spacing.tiny}`,
        }}>
          Top Products
        </h3>
        <p style={{
          color: liquidGlassTokens.colors.tertiaryLabel,
          fontSize: liquidGlassTokens.typography.footnote.size,
          margin: 0,
        }}>
          Best performing products by revenue
        </p>
      </div>

      {/* Filter Tabs */}
      <FilterTabs 
        filters={filterCategories} 
        onFilterChange={setSelectedFilter}
        isMobile={isMobile}
      />

      {/* Products List */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: liquidGlassTokens.spacing.medium,
      }}>
        {ecommerceMockData.topProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            style={{
              padding: liquidGlassTokens.spacing.small,
              borderRadius: liquidGlassTokens.cornerRadius.small,
              backgroundColor: liquidGlassTokens.colors.quaternarySystemFill,
              cursor: 'pointer',
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: liquidGlassTokens.spacing.small,
            }}>
              <div>
                <div style={{
                  color: liquidGlassTokens.colors.label,
                  fontSize: liquidGlassTokens.typography.subheadline.size,
                  fontWeight: '600',
                  marginBottom: '2px',
                }}>
                  {product.name}
                </div>
                <div style={{
                  color: liquidGlassTokens.colors.secondaryLabel,
                  fontSize: liquidGlassTokens.typography.caption1.size,
                }}>
                  {product.category} • {product.sales} sales
                </div>
              </div>
              <div style={{
                color: liquidGlassTokens.colors.systemGreen,
                fontSize: liquidGlassTokens.typography.subheadline.size,
                fontWeight: '700',
              }}>
                {product.revenue}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: liquidGlassTokens.colors.systemFill,
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${product.trend}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                style={{
                  height: '100%',
                  backgroundColor: liquidGlassTokens.colors.systemGreen,
                  borderRadius: '2px',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Ecommerce Dashboard Component
interface EcommerceDashboardProps {
  isMobile?: boolean;
}

const EcommerceDashboard: React.FC<EcommerceDashboardProps> = ({ isMobile = false }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('dashboard');
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(isMobile);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Detect mobile screen size
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const actuallyMobile = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSideMenuCollapsed(actuallyMobile);
  }, [actuallyMobile]);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuItemClick = (item: EcommerceMenuItem) => {
    setActiveMenuItem(item.id);
    if (actuallyMobile) {
      setSideMenuCollapsed(true);
    }
  };

  const toggleSideMenu = () => {
    setSideMenuCollapsed(!sideMenuCollapsed);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: actuallyMobile ? 'column' : 'row',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      backgroundColor: liquidGlassTokens.colors.primary,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Mobile Menu Toggle */}
      {actuallyMobile && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleSideMenu}
          style={{
            position: 'fixed',
            top: liquidGlassTokens.spacing.medium,
            left: liquidGlassTokens.spacing.medium,
            width: '44px',
            height: '44px',
            borderRadius: liquidGlassTokens.cornerRadius.medium,
            backgroundColor: liquidGlassTokens.colors.systemFill,
            border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
            backdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
            zIndex: 1000,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: liquidGlassTokens.colors.label }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </div>
        </motion.button>
      )}

      {/* Side Menu */}
      <AnimatePresence>
        {(!actuallyMobile || !sideMenuCollapsed) && (
          <motion.div
            initial={actuallyMobile ? { x: -240 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={actuallyMobile ? { x: -240 } : { x: 0 }}
            transition={{ 
              duration: parseFloat(liquidGlassTokens.animation.duration.medium),
              ease: liquidGlassTokens.animation.easing.standard 
            }}
            style={{
              position: actuallyMobile ? 'fixed' : 'relative',
              zIndex: actuallyMobile ? 999 : 10,
              height: actuallyMobile ? '100vh' : 'auto',
            }}
          >
            <EcommerceSideMenu
              activeItem={activeMenuItem}
              onItemClick={handleMenuItemClick}
              collapsed={false}
              isMobile={actuallyMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {actuallyMobile && !sideMenuCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSideMenu}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 998,
            backdropFilter: `blur(${liquidGlassTokens.effects.blur})`,
          }}
        />
      )}

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: actuallyMobile ? liquidGlassTokens.spacing.medium : liquidGlassTokens.spacing.large,
        paddingTop: actuallyMobile ? '80px' : liquidGlassTokens.spacing.large,
        overflow: 'auto',
        backgroundColor: liquidGlassTokens.colors.primary,
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          flexDirection: actuallyMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: actuallyMobile ? 'flex-start' : 'center',
          marginBottom: liquidGlassTokens.spacing.large,
          gap: actuallyMobile ? liquidGlassTokens.spacing.medium : 0,
        }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: liquidGlassTokens.colors.label,
                fontSize: actuallyMobile ? liquidGlassTokens.typography.title1.size : liquidGlassTokens.typography.largeTitle.size,
                fontWeight: '700',
                margin: 0,
                marginBottom: liquidGlassTokens.spacing.tiny,
              }}
            >
              Store Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                color: liquidGlassTokens.colors.secondaryLabel,
                fontSize: liquidGlassTokens.typography.body.size,
                margin: 0,
              }}
            >
              Monitor your ecommerce performance • {currentTime}
            </motion.p>
          </div>

          {/* Search Bar */}
          {!actuallyMobile && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ position: 'relative', width: '280px' }}
            >
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                style={{
                  width: '100%',
                  height: '36px',
                  backgroundColor: liquidGlassTokens.colors.systemFill,
                  border: `0.5px solid ${liquidGlassTokens.colors.separator}`,
                  borderRadius: liquidGlassTokens.cornerRadius.medium,
                  padding: `0 ${liquidGlassTokens.spacing.medium}`,
                  color: liquidGlassTokens.colors.label,
                  fontSize: liquidGlassTokens.typography.body.size,
                  outline: 'none',
                  backdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
                  WebkitBackdropFilter: `blur(${liquidGlassTokens.effects.thinMaterialBlur})`,
                }}
              />
            </motion.div>
          )}
        </header>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: actuallyMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: liquidGlassTokens.spacing.medium,
            marginBottom: liquidGlassTokens.spacing.large,
          }}
        >
          <EcommerceStatCard
            title="Total Sales"
            value={ecommerceMockData.stats.totalSales.value}
            change={ecommerceMockData.stats.totalSales.change}
            trend={ecommerceMockData.stats.totalSales.trend}
            period={ecommerceMockData.stats.totalSales.period}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v20m8-10H4"/></svg>}
            accentColor={ecommerceDesignTokens.ecommerce.revenue}
            isMobile={actuallyMobile}
          />
          <EcommerceStatCard
            title="Orders"
            value={ecommerceMockData.stats.orders.value}
            change={ecommerceMockData.stats.orders.change}
            trend={ecommerceMockData.stats.orders.trend}
            period={ecommerceMockData.stats.orders.period}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 14l-5-5 1.5-1.5L9 11l7-7L17.5 5.5 9 14z"/></svg>}
            accentColor={liquidGlassTokens.colors.systemBlue}
            isMobile={actuallyMobile}
          />
          <EcommerceStatCard
            title="Customers"
            value={ecommerceMockData.stats.customers.value}
            change={ecommerceMockData.stats.customers.change}
            trend={ecommerceMockData.stats.customers.trend}
            period={ecommerceMockData.stats.customers.period}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
            accentColor={liquidGlassTokens.colors.systemPurple}
            isMobile={actuallyMobile}
          />
          <EcommerceStatCard
            title="Conversion Rate"
            value={ecommerceMockData.stats.conversion.value}
            change={ecommerceMockData.stats.conversion.change}
            trend={ecommerceMockData.stats.conversion.trend}
            period={ecommerceMockData.stats.conversion.period}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v18h18M9 17V9l4 4 4-4v8"/></svg>}
            accentColor={liquidGlassTokens.colors.systemTeal}
            isMobile={actuallyMobile}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: actuallyMobile ? '1fr' : '1fr 1fr',
          gap: liquidGlassTokens.spacing.medium,
        }}>
          <RecentOrdersCard isMobile={actuallyMobile} />
          <TopProductsCard isMobile={actuallyMobile} />
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;