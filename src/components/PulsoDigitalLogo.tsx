
import React from "react";

interface PulsoDigitalLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const PulsoDigitalLogo = ({ className = "", width = 150, height = 50 }: PulsoDigitalLogoProps) => {
  return (
    <div className={`flex items-center ${className}`} style={{ width, height }}>
      <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 100 L100 70 L80 120 L50 40 L20 100" stroke="#1D5AA7" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
        <text x="180" y="90" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="60" fill="#0B2344">Pulso</text>
        <text x="180" y="160" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="70" fill="#1D5AA7">Digital</text>
      </svg>
    </div>
  );
};

export default PulsoDigitalLogo;
