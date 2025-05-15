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

// Cor principal da logo Pulso Digital
const LOGO_COLOR = "#1D5AA7";

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

  // Selecionar apenas os últimos 7 dias para evitar lotação do gráfico
  const recentData = combinedData.slice(-7);

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{ 
          volume: { color: LOGO_COLOR } 
        }}
      >
        <BarChart 
          data={recentData}
          margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getDate()}/${d.getMonth() + 1}`;
            }}
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={50}
          />
          <YAxis 
            width={35}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(0)}
          />
          <Tooltip 
            formatter={(value) => [`${value} avaliações`, "Volume"]} 
            labelFormatter={(date) => new Date(date).toLocaleDateString('pt-BR')} 
            content={<ChartTooltipContent />}
          />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }} 
            formatter={(value) => (
              <span style={{ color: LOGO_COLOR, fontWeight: 'bold' }}>
                {value}
              </span>
            )}
          />
          <Bar 
            dataKey="volume" 
            name="Volume" 
            fill={LOGO_COLOR} 
            stroke={LOGO_COLOR}
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default VolumeChart;
