import React, { useState, useEffect } from 'react';
import EnhancedPetersenGamesDashboard from './EnhancedPetersenGamesDashboard';

// Demo wrapper component to showcase the enhanced dashboard
const EnhancedPetersenGamesDashboardDemo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {/* Demo Controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '12px',
        padding: '12px',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        gap: '8px',
      }}>
        <button
          onClick={() => setIsMobile(false)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            background: !isMobile ? '#4FC3F7' : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Desktop
        </button>
        <button
          onClick={() => setIsMobile(true)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            background: isMobile ? '#4FC3F7' : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Mobile
        </button>
      </div>

      {/* Dashboard */}
      <EnhancedPetersenGamesDashboard isMobile={isMobile} />

      {/* Demo Information Panel */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 10000,
        background: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '12px',
        padding: '16px',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '300px',
        color: 'white',
        fontSize: '12px',
        lineHeight: 1.4,
      }}>
        <h4 style={{ margin: '0 0 8px', color: '#4FC3F7', fontSize: '14px', fontWeight: 700 }}>
          Enhanced Petersen Games Dashboard
        </h4>
        <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>
          <li>Strategic gaming-focused navigation</li>
          <li>Sophisticated glassmorphism effects</li>
          <li>Refined color blending & gradients</li>
          <li>Fully responsive mobile compatibility</li>
          <li>Enhanced glossy buttons & surfaces</li>
          <li>Real-time activity feed</li>
          <li>Advanced performance metrics</li>
        </ul>
        <div style={{ 
          marginTop: '12px', 
          padding: '8px', 
          background: 'rgba(79, 195, 247, 0.1)', 
          borderRadius: '6px',
          border: '1px solid rgba(79, 195, 247, 0.3)',
        }}>
          <strong style={{ color: '#4FC3F7' }}>Mode:</strong> {isMobile ? 'Mobile' : 'Desktop'}
        </div>
      </div>
    </div>
  );
};

export default EnhancedPetersenGamesDashboardDemo;