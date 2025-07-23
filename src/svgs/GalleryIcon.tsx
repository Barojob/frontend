import React from 'react';

/**
 * 이미지와 동일한 모양의 갤러리 아이콘 SVG를 렌더링하는 React 컴포넌트입니다.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - 표준 SVG 속성을 전달할 수 있습니다.
 * @example
 * <GalleryIcon width="100" height="100" />
 */
const GalleryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // width, height 등 외부에서 전달된 props를 적용합니다.
  >
    {/* 배경이 되는 둥근 사각형 */}
    <rect
      width="56"
      height="56"
      rx="10"
      fill="#4285F4"
    />
    {/* 산 모양 */}
    <path
      d="M10 49 Q 24 26, 35 38 T 49 49 H 10 Z"
      fill="#A8C7FA"
    />
    {/* 해 또는 달 모양 */}
    <circle
      cx="40"
      cy="18"
      r="5"
      fill="white"
    />
  </svg>
);

export default GalleryIcon;