import React from 'react';

interface GalleryIconProps {
  className?: string;
  size?: number;
}

const GalleryIcon: React.FC<GalleryIconProps> = ({ 
  className = '', 
  size = 64 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 외부 프레임 */}
      <rect 
        x="4" 
        y="12" 
        width="56" 
        height="44" 
        rx="4" 
        fill="#E5E7EB" 
        stroke="#9CA3AF" 
        strokeWidth="2"
      />
      
      {/* 내부 이미지 프레임 */}
      <rect 
        x="8" 
        y="16" 
        width="48" 
        height="36" 
        rx="2" 
        fill="white"
      />
      
      {/* 산 모양 */}
      <path 
        d="M8 44L18 32L28 40L38 28L56 44V50C56 51.1046 55.1046 52 54 52H10C8.89543 52 8 51.1046 8 50V44Z" 
        fill="#60A5FA"
      />
      
      {/* 태양/원 */}
      <circle 
        cx="20" 
        cy="26" 
        r="4" 
        fill="#FDE047"
      />
      
      {/* 하단 작은 이미지들 */}
      <rect 
        x="12" 
        y="8" 
        width="16" 
        height="12" 
        rx="2" 
        fill="#F3F4F6" 
        stroke="#D1D5DB"
      />
      <rect 
        x="32" 
        y="8" 
        width="16" 
        height="12" 
        rx="2" 
        fill="#F3F4F6" 
        stroke="#D1D5DB"
      />
    </svg>
  );
};

export default GalleryIcon;
