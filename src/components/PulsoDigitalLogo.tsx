import React from "react";

interface PulsoDigitalLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const PulsoDigitalLogo = ({ className = "", width = 150, height = 50 }: PulsoDigitalLogoProps) => {
  return (
    <div className={`flex items-center ${className}`} style={{ width, height }}>
      <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        {/* Linha de pulso simplificada */}
        <path 
          d="M10 50 L20 50 L30 30 L40 70 L50 20 L60 50 L70 50" 
          stroke="#002851" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Texto "Pulso" */}
        <text x="80" y="40" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#002851">Pulso</text>
        
        {/* Texto "Digital" */}
        <text x="80" y="70" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#1D5AA7">Digital</text>
      </svg>
    </div>
  );
};

export default PulsoDigitalLogo;
