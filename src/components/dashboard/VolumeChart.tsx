
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AspectData } from "@/lib/types";
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface VolumeChartProps {
  data: AspectData[];
}

const VolumeChart = ({ data }: VolumeChartProps) => {
  // Unir todos os dados de volume em uma única série
  const combinedData = [];
  
  // Obter lista única de datas ordenadas
  const allDates = Array.from(new Set(
    data.flatMap(aspect => aspect.volumeData.map(vol => vol.date))
  )).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  // Para cada data, somar os volumes de todos os aspectos
  for (const date of allDates) {
    let totalVolume = 0;
    
    data.forEach(aspect => {
      const volumePoint = aspect.volumeData.find(vol => vol.date === date);
      if (volumePoint) {
        totalVolume += volumePoint.value;
      }
    });
    
    combinedData.push({
      date,
      volume: totalVolume
    });
  }

  return (
    <div className="h-[300px]">
      <ChartContainer 
        config={{ 
          volume: { color: "#3b82f6" } 
        }}
      >
        <BarChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('pt-BR')}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} avaliações`, "Volume"]} 
            labelFormatter={(date) => new Date(date).toLocaleDateString('pt-BR')} 
            content={<ChartTooltipContent />}
          />
          <Legend />
          <Bar dataKey="volume" name="Volume" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default VolumeChart;
