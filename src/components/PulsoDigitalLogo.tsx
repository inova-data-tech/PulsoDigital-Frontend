import React from "react";

interface PulsoDigitalLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const PulsoDigitalLogo = ({ className = "", width = 150, height = 50 }: PulsoDigitalLogoProps) => {
  // O caminho para a imagem na pasta public é relativo à raiz do servidor.
  const logoPath = "/images/Design sem nome (53).png";

  return (
    <div className={`flex items-center ${className}`} style={{ width, height }}>
      <img 
        src={logoPath} 
        alt="Pulso Digital Logo" 
        className="w-full h-full object-contain" // object-contain para manter a proporção
      />
    </div>
  );
};

export default PulsoDigitalLogo;
