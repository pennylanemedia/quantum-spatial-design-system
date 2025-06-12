import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SideMenu, { defaultMenuSections, MenuItem } from './SideMenu';

// Quantum-Spatial Design Tokens
const designTokens = {
  colors: {
    primary: '#060715',
    secondary: '#131A36',
    tertiary: '#331F4A',
    accent: '#5AC8FA',
    accentSecondary: '#BF4080',
    accentTertiary: '#6A3093',
    success: '#34C759',
    warning: '#FF9F0A',
    error: '#FF2D55',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
  },
  gradients: {
    background: 'linear-gradient(135deg, #0A0621 0%, #131A36 40%, #331F4A 80%, #0D0D15 100%)',
    card: 'linear-gradient(135deg, rgba(19, 26, 54, 0.6) 0%, rgba(51, 31, 74, 0.4) 100%)',
    primary: 'linear-gradient(135deg, rgba(90, 200, 250, 0.15) 0%, rgba(106, 48, 147, 0.1) 100%)',
    secondary: 'linear-gradient(135deg, rgba(191, 64, 128, 0.15) 0%, rgba(255, 45, 85, 0.1) 100%)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    subtle: '0 2px 4px rgba(10, 6, 33, 0.2)',
    medium: '0 4px 8px rgba(10, 6, 33, 0.3)',
    prominent: '0 8px 16px rgba(10, 6, 33, 0.4)',
    quantum: '0 8px 24px rgba(90, 200, 250, 0.25)',
  },
  animation: {
    fast: '150ms',
    medium: '300ms',
    slow: '500ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  }
};

// Type Definitions
interface DashboardStats {
  activePlayers: {
    value: number;
    change: string;
    trend: 'up' | 'down';
  };
  revenue: {
    value: string;
    change: string;
    trend: 'up' | 'down';
  };
  gameSessions: {
    value: number;
    change: string;
    trend: 'up' | 'down';
  };
  serverStatus: {
    value: string;
    status: 'operational' | 'warning' | 'error';
  };
}

interface GameActivity {
  id: string;
  type: 'player_joined' | 'achievement' | 'tournament' | 'maintenance';
  message: string;
  timestamp: string;
  color: string;
}

interface TopGame {
  id: string;
  name: string;
  players: number;
  percentage: number;
  color: string;
}

interface SystemMetric {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  color: string;
}

// Mock Data
const mockStats: DashboardStats = {
  activePlayers: { value: 2847, change: '+12.5% from yesterday', trend: 'up' },
  revenue: { value: '$12,450', change: '+8.2% from yesterday', trend: 'up' },
  gameSessions: { value: 8924, change: '+15.7% from yesterday', trend: 'up' },
  serverStatus: { value: '99.9%', status: 'operational' }
};

const mockActivities: GameActivity[] = [
  { id: '1', type: 'player_joined', message: 'New player joined "Mystic Realms"', timestamp: '2 minutes ago', color: designTokens.colors.success },
  { id: '2', type: 'achievement', message: 'Achievement unlocked: "Dragon Slayer"', timestamp: '5 minutes ago', color: designTokens.colors.accent },
  { id: '3', type: 'tournament', message: 'Guild tournament started', timestamp: '12 minutes ago', color: designTokens.colors.accentSecondary },
  { id: '4', type: 'maintenance', message: 'Server maintenance completed', timestamp: '1 hour ago', color: designTokens.colors.warning }
];

const mockTopGames: TopGame[] = [
  { id: '1', name: 'Mystic Realms', players: 1247, percentage: 80, color: designTokens.colors.accent },
  { id: '2', name: 'Dragon Quest', players: 892, percentage: 60, color: designTokens.colors.accentSecondary },
  { id: '3', name: 'Space Odyssey', players: 634, percentage: 40, color: designTokens.colors.accentTertiary }
];

const mockSystemMetrics: SystemMetric[] = [
  { name: 'CPU Usage', value: 42, percentage: 42, color: designTokens.colors.success },
  { name: 'Memory Usage', value: 68, percentage: 68, color: designTokens.colors.warning },
  { name: 'Network', value: 23, percentage: 23, color: designTokens.colors.success }
];

const mockNotifications: Notification[] = [
  { id: '1', message: 'Server maintenance in 2 hours', type: 'error', color: designTokens.colors.error },
  { id: '2', message: 'New game update available', type: 'warning', color: designTokens.colors.warning },
  { id: '3', message: 'Tournament results published', type: 'info', color: designTokens.colors.accent }
];

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon, gradient, borderColor }) => {
  const cardVariants = {
    idle: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -2, transition: { duration: 0.15 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      style={{
        width: '300px',
        height: '140px',
        background: gradient,
        border: `1px solid ${borderColor}`,
        borderRadius: designTokens.radius.lg,
        padding: designTokens.spacing.lg,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            color: designTokens.colors.textSecondary,
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: designTokens.spacing.sm,
          }}>
            {title}
          </div>
          <div style={{
            color: designTokens.colors.text,
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: 1,
          }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: `${borderColor.replace('0.3', '0.2')}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon}
        </div>
      </div>

      {/* Change Indicator */}
      <div style={{
        color: trend === 'up' ? designTokens.colors.success : designTokens.colors.error,
        fontSize: '14px',
        fontWeight: 600,
      }}>
        {change}
      </div>
    </motion.div>
  );
};

// Activity Feed Component
const ActivityFeed: React.FC<{ activities: GameActivity[] }> = ({ activities }) => (
  <div style={{
    background: designTokens.gradients.card,
    border: `1px solid rgba(90, 200, 250, 0.2)`,
    borderRadius: designTokens.radius.lg,
    padding: designTokens.spacing.lg,
    width: '612px',
    height: '320px',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
  }}>
    <h3 style={{
      color: designTokens.colors.text,
      fontSize: '20px',
      fontWeight: 600,
      margin: `0 0 ${designTokens.spacing.sm}`,
    }}>
      Recent Games Activity
    </h3>
    <p style={{
      color: designTokens.colors.textSecondary,
      fontSize: '14px',
      margin: `0 0 ${designTokens.spacing.lg}`,
    }}>
      Live player interactions and game sessions
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.lg }}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: designTokens.spacing.md }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: activity.color,
            marginTop: '6px',
            flexShrink: 0,
          }} />
          <div>
            <div style={{
              color: designTokens.colors.text,
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}>
              {activity.message}
            </div>
            <div style={{
              color: designTokens.colors.textTertiary,
              fontSize: '12px',
            }}>
              {activity.timestamp}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Top Games Component
const TopGamesChart: React.FC<{ games: TopGame[] }> = ({ games }) => (
  <div style={{
    background: designTokens.gradients.card,
    border: `1px solid rgba(90, 200, 250, 0.2)`,
    borderRadius: designTokens.radius.lg,
    padding: designTokens.spacing.lg,
    width: '612px',
    height: '260px',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
  }}>
    <h3 style={{
      color: designTokens.colors.text,
      fontSize: '20px',
      fontWeight: 600,
      margin: `0 0 ${designTokens.spacing.sm}`,
    }}>
      Top Games Today
    </h3>
    <p style={{
      color: designTokens.colors.textSecondary,
      fontSize: '14px',
      margin: `0 0 ${designTokens.spacing.lg}`,
    }}>
      Most popular games by player count
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.xl }}>
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <div style={{ marginBottom: designTokens.spacing.sm }}>
            <div style={{
              width: '200px',
              height: '16px',
              backgroundColor: `${game.color}30`,
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${game.percentage}%` }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: game.color,
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 0 8px currentColor)',
                }}
              />
            </div>
          </div>
          <div style={{
            color: designTokens.colors.text,
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '4px',
          }}>
            {game.name}
          </div>
          <div style={{
            color: designTokens.colors.textSecondary,
            fontSize: '12px',
          }}>
            {game.players.toLocaleString()} players
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const PetersenGamesDashboard: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('pet-games');
  const [currentTime, setCurrentTime] = useState<string>('');

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

  const handleMenuItemClick = (item: MenuItem) => {
    setActiveMenuItem(item.id);
  };

  // Quick Action Items
  const quickActions = [
    { id: 'tournament', title: 'Create Tournament', description: 'Set up new competition', color: designTokens.colors.accent },
    { id: 'players', title: 'Manage Players', description: 'Review player accounts', color: designTokens.colors.accentSecondary },
    { id: 'reports', title: 'View Reports', description: 'Analytics & insights', color: designTokens.colors.accentTertiary }
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      background: designTokens.gradients.background,
      overflow: 'hidden',
    }}>
      {/* Quantum Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(90, 200, 250, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(90, 200, 250, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        opacity: 0.3,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Side Menu */}
      <SideMenu
        sections={defaultMenuSections}
        activeItem={activeMenuItem}
        onItemClick={handleMenuItemClick}
        collapsed={false}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: designTokens.spacing.lg,
        overflow: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: designTokens.spacing.xl,
        }}>
          <div>
            <h1 style={{
              color: designTokens.colors.text,
              fontSize: '32px',
              fontWeight: 700,
              margin: 0,
              marginBottom: designTokens.spacing.sm,
            }}>
              Welcome back, Game Master
            </h1>
            <p style={{
              color: designTokens.colors.textSecondary,
              fontSize: '16px',
              fontWeight: 500,
              margin: 0,
            }}>
              Here's what's happening with your games today • {currentTime}
            </p>
          </div>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            width: '320px',
          }}>
            <input
              type="text"
              placeholder="Search games, players, stats..."
              style={{
                width: '100%',
                height: '48px',
                background: designTokens.gradients.card,
                border: `1px solid rgba(90, 200, 250, 0.3)`,
                borderRadius: designTokens.radius.md,
                padding: `0 ${designTokens.spacing.md}`,
                color: designTokens.colors.text,
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </header>

        {/* Stats Cards */}
        <div style={{
          display: 'flex',
          gap: designTokens.spacing.md,
          marginBottom: designTokens.spacing.xl,
        }}>
          <StatCard
            title="Active Players"
            value={mockStats.activePlayers.value}
            change={mockStats.activePlayers.change}
            trend={mockStats.activePlayers.trend}
            icon={<div style={{ width: '16px', height: '16px', backgroundColor: 'currentColor', borderRadius: '50%' }} />}
            gradient={designTokens.gradients.primary}
            borderColor="rgba(90, 200, 250, 0.3)"
          />
          <StatCard
            title="Today's Revenue"
            value={mockStats.revenue.value}
            change={mockStats.revenue.change}
            trend={mockStats.revenue.trend}
            icon={<div style={{ width: '16px', height: '16px', backgroundColor: 'currentColor', borderRadius: '2px' }} />}
            gradient={designTokens.gradients.secondary}
            borderColor="rgba(191, 64, 128, 0.3)"
          />
          <StatCard
            title="Game Sessions"
            value={mockStats.gameSessions.value}
            change={mockStats.gameSessions.change}
            trend={mockStats.gameSessions.trend}
            icon={<div style={{ width: '16px', height: '16px', backgroundColor: 'currentColor', borderRadius: '2px' }} />}
            gradient={designTokens.gradients.card}
            borderColor="rgba(106, 48, 147, 0.3)"
          />
          <StatCard
            title="Server Status"
            value={mockStats.serverStatus.value}
            change="All systems operational"
            trend="neutral"
            icon={<div style={{ width: '8px', height: '8px', backgroundColor: designTokens.colors.success, borderRadius: '50%' }} />}
            gradient={designTokens.gradients.card}
            borderColor="rgba(90, 200, 250, 0.3)"
          />
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'flex',
          gap: designTokens.spacing.lg,
        }}>
          {/* Left Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.xl,
          }}>
            <ActivityFeed activities={mockActivities} />
            
            {/* Quick Actions */}
            <div style={{
              background: designTokens.gradients.card,
              border: `1px solid rgba(106, 48, 147, 0.2)`,
              borderRadius: designTokens.radius.lg,
              padding: designTokens.spacing.lg,
              width: '612px',
              height: '200px',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
            }}>
              <h3 style={{
                color: designTokens.colors.text,
                fontSize: '20px',
                fontWeight: 600,
                margin: `0 0 ${designTokens.spacing.lg}`,
              }}>
                Quick Actions
              </h3>
              
              <div style={{ display: 'flex', gap: designTokens.spacing.md }}>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '180px',
                      height: '72px',
                      background: `${action.color}1A`,
                      border: `1px solid ${action.color}4D`,
                      borderRadius: designTokens.radius.md,
                      padding: designTokens.spacing.md,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{
                      color: designTokens.colors.text,
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}>
                      {action.title}
                    </div>
                    <div style={{
                      color: designTokens.colors.textSecondary,
                      fontSize: '12px',
                    }}>
                      {action.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.xl,
          }}>
            <TopGamesChart games={mockTopGames} />
            
            <div style={{ display: 'flex', gap: designTokens.spacing.md }}>
              {/* System Health */}
              <div style={{
                background: designTokens.gradients.card,
                border: `1px solid rgba(52, 199, 89, 0.2)`,
                borderRadius: designTokens.radius.lg,
                padding: designTokens.spacing.lg,
                width: '300px',
                height: '260px',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
              }}>
                <h3 style={{
                  color: designTokens.colors.text,
                  fontSize: '18px',
                  fontWeight: 600,
                  margin: `0 0 ${designTokens.spacing.lg}`,
                }}>
                  System Health
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.lg }}>
                  {mockSystemMetrics.map((metric, index) => (
                    <div key={metric.name}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: designTokens.spacing.sm,
                      }}>
                        <span style={{
                          color: designTokens.colors.textSecondary,
                          fontSize: '14px',
                        }}>
                          {metric.name}
                        </span>
                        <span style={{
                          color: designTokens.colors.text,
                          fontSize: '14px',
                          fontWeight: 600,
                        }}>
                          {metric.value}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage}%` }}
                          transition={{ delay: index * 0.2, duration: 0.8 }}
                          style={{
                            height: '100%',
                            backgroundColor: metric.color,
                            borderRadius: '2px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Notifications */}
              <div style={{
                background: designTokens.gradients.card,
                border: `1px solid rgba(255, 159, 10, 0.2)`,
                borderRadius: designTokens.radius.lg,
                padding: designTokens.spacing.lg,
                width: '296px',
                height: '260px',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
              }}>
                <h3 style={{
                  color: designTokens.colors.text,
                  fontSize: '18px',
                  fontWeight: 600,
                  margin: `0 0 ${designTokens.spacing.lg}`,
                }}>
                  Notifications
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.lg }}>
                  {mockNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}
                    >
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: notification.color,
                        flexShrink: 0,
                      }} />
                      <span style={{
                        color: designTokens.colors.text,
                        fontSize: '12px',
                        fontWeight: 500,
                      }}>
                        {notification.message}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetersenGamesDashboard;