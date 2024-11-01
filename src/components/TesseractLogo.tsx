import React from 'react';

export const TesseractLogo: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-6 h-6 text-white"
    style={{
      animation: 'rotate 20s linear infinite',
    }}
  >
    {/* Outer cube */}
    <path
      d="M20 20L50 10L80 20L50 30L20 20Z
         M20 20L20 60L50 70L50 30L20 20Z
         M80 20L80 60L50 70L50 30L80 20Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Inner cube */}
    <path
      d="M35 35L50 30L65 35L50 40L35 35Z
         M35 35L35 55L50 60L50 40L35 35Z
         M65 35L65 55L50 60L50 40L65 35Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      style={{
        opacity: 0.5,
      }}
    />
    
    {/* Connecting lines */}
    <path
      d="M20 20L35 35M80 20L65 35M20 60L35 55M80 60L65 55"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeDasharray="2 2"
    />

    <style>
      {`
        @keyframes rotate {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
      `}
    </style>
  </svg>
);