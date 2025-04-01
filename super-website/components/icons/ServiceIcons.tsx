// components/icons/ServiceIcons.tsx
import React from 'react';

interface IconProps {
  name: string;
  color: string;
  size?: number;
}

export default function ServiceIcon({ name, color, size = 48 }: IconProps) {
  const renderIcon = () => {
    switch (name) {
      case 'code':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 18L22 12L16 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6L2 12L8 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'cube':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V15.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 8.5L12 15.5L2 8.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'layout':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 9H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21V9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'database':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8C16.4183 8 20 6.65685 20 5C20 3.34315 16.4183 2 12 2C7.58172 2 4 3.34315 4 5C4 6.65685 7.58172 8 12 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 5V19C4 20.6569 7.58172 22 12 22C16.4183 22 20 20.6569 20 19V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="service-icon">
      {renderIcon()}
    </div>
  );
}