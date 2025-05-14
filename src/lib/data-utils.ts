
import { AspectData } from "./types";

export function getAspectData(): AspectData[] {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 14); // Duas semanas atrás
  
  const aspectNames = ["Bateria", "Sistema", "Câmera", "Tela", "Design"];
  
  return aspectNames.map(name => {
    const baseRating = getBaseRating(name);
    
    return {
      name,
      timelineData: generateTimelineData(startDate, endDate, baseRating),
      volumeData: generateVolumeData(startDate, endDate)
    };
  });
}

// Gerar uma classificação base para cada aspecto (para dados mais realistas)
function getBaseRating(aspect: string): number {
  switch (aspect) {
    case "Bateria": return 7.5;
    case "Sistema": return 5.2;
    case "Câmera": return 8.3;
    case "Tela": return 8.8;
    case "Design": return 7.0;
    default: return 5.0;
  }
}

// Gerar pontos de linha do tempo aleatórios com base em um valor base
function generateTimelineData(startDate: Date, endDate: Date, baseRating: number) {
  const data = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Adicionar um valor aleatório entre -1.5 e +1.5 ao valor base
    const randomOffset = (Math.random() * 3) - 1.5;
    let value = baseRating + randomOffset;
    
    // Garantir que o valor esteja entre 0 e 10
    value = Math.min(10, Math.max(0, value));
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(1))
    });
    
    // Avançar para o próximo dia
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
}

// Gerar dados de volume aleatórios
function generateVolumeData(startDate: Date, endDate: Date) {
  const data = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    data.push({
      date: currentDate.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 20) + 5 // Entre 5 e 25 avaliações por dia
    });
    
    // Avançar para o próximo dia
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
}
