import React, { useState } from 'react';
import SideMenu, { defaultMenuSections, MenuItem } from './SideMenu';

// Example usage component demonstrating the SideMenu
const SideMenuExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('figma');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleItemClick = (item: MenuItem) => {
    console.log('Menu item clicked:', item);
    setActiveItem(item.id);
    
    // Handle navigation logic here
    if (item.href) {
      // Navigate to URL
      window.open(item.href, '_blank');
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Side Menu */}
      <SideMenu
        sections={defaultMenuSections}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        collapsed={collapsed}
      />
      
      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        padding: '32px',
        backgroundColor: '#0A0621',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <header>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
            Quantum-Spatial Side Menu Demo
          </h1>
          <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>
            Interactive React component converted from SVG design
          </p>
        </header>

        <div style={{
          padding: '24px',
          backgroundColor: 'rgba(19, 26, 54, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(90, 200, 250, 0.2)'
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px' }}>Controls</h2>
          <button
            onClick={toggleCollapsed}
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(90, 200, 250, 0.1)',
              border: '1px solid rgba(90, 200, 250, 0.3)',
              borderRadius: '8px',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(90, 200, 250, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(90, 200, 250, 0.1)';
            }}
          >
            {collapsed ? 'Expand Menu' : 'Collapse Menu'}
          </button>
        </div>

        <div style={{
          padding: '24px',
          backgroundColor: 'rgba(51, 31, 74, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(191, 64, 128, 0.2)'
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px' }}>Active Item</h2>
          <div style={{
            fontFamily: 'SF Mono, monospace',
            fontSize: '14px',
            padding: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <strong>ID:</strong> {activeItem}
          </div>
        </div>

        <div style={{
          padding: '24px',
          backgroundColor: 'rgba(19, 26, 54, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(90, 200, 250, 0.2)'
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px' }}>Features</h2>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
            <li>Quantum-spatial design system integration</li>
            <li>Smooth animations with Framer Motion</li>
            <li>Accessibility support (ARIA, keyboard navigation)</li>
            <li>M4 Neural Engine optimized performance</li>
            <li>Responsive collapse/expand functionality</li>
            <li>Brand icon support (Figma, Sketch, etc.)</li>
            <li>Active state management</li>
            <li>Custom badge system</li>
            <li>TypeScript type safety</li>
            <li>Memoized components for performance</li>
          </ul>
        </div>

        <div style={{
          padding: '24px',
          backgroundColor: 'rgba(51, 31, 74, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(191, 64, 128, 0.2)'
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px' }}>Implementation</h2>
          <pre style={{
            margin: 0,
            fontFamily: 'SF Mono, monospace',
            fontSize: '12px',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'auto',
            lineHeight: 1.4
          }}>
{`import SideMenu, { defaultMenuSections } from './SideMenu';

const App = () => {
  const [activeItem, setActiveItem] = useState('figma');
  
  return (
    <SideMenu
      sections={defaultMenuSections}
      activeItem={activeItem}
      onItemClick={(item) => setActiveItem(item.id)}
      collapsed={false}
    />
  );
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SideMenuExample;