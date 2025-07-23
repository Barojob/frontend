import React from 'react';

/**
 * 이미지와 동일한 모양의 카메라 아이콘 SVG를 렌더링하는 React 컴포넌트입니다.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - 표준 SVG 속성을 전달할 수 있습니다.
 * @example
 * <CameraIcon width="100" height="100" />
 */
const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // width, height 등 외부에서 전달된 props를 적용합니다.
  >
    {/* 카메라 몸체 (하단부) */}
    <rect
      x="5"
      y="28"
      width="80"
      height="56"
      rx="9"
      fill="#DDE3EA"
    />
    {/* 카메라 몸체 (상단부) */}
    <rect
      x="25"
      y="17"
      width="40"
      height="17"
      rx="9"
      fill="#DDE3EA"
    />
    {/* 카메라 렌즈 */}
    <circle
      cx="45"
      cy="51"
      r="16"
      fill="#4285F4"
    />
    {/* 우측 상단 표시등 */}
    <rect
      x="65"
      y="34"
      width="13"
      height="7"
      rx="3"
      fill="#1A73E8"
    />
  </svg>
);

export default CameraIcon;