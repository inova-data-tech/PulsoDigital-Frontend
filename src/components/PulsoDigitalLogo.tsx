import React from "react";

interface PulsoDigitalLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const PulsoDigitalLogo = ({ className = "", width = 150, height = 50 }: PulsoDigitalLogoProps) => {
  return (
    <div className={`flex items-center ${className}`} style={{ width, height }}>
      <div className="w-full h-full">
        {/* Implementação direta da logo como SVG inline */}
        <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Linha de pulso */}
          <path 
            d="M150 100 L100 70 L80 120 L50 40 L20 100" 
            stroke="#002851" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          
          {/* Texto "Pulso" */}
          <text x="170" y="90" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="60" fill="#002851">Pulso</text>
          
          {/* Texto "Digital" */}
          <text x="170" y="160" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="70" fill="#1D5AA7">Digital</text>
        </svg>
      </div>
    </div>
  );
};

export default PulsoDigitalLogo;
