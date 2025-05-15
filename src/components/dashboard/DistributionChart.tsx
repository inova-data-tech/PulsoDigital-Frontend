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

interface DistributionChartProps {
  data: AspectData[];
}

// Cores fortes e distintas para cada categoria
const COLORS = {
  negative: "#ef4444", // Vermelho vibrante
  neutral: "#f59e0b",  // Amarelo/Laranja vibrante
  positive: "#1D5AA7"  // Azul vibrante
};

const DistributionChart = ({ data }: DistributionChartProps) => {
  // Calcular a distribuição de notas por categoria para cada aspecto
  // Usando clonedData para garantir que as modificações feitas no TimelineChart
  // não afetem este componente
  const distributionData = data.map(aspect => {
    const allValues = aspect.timelineData.map(point => point.value);
    
    const negative = allValues.filter(val => val <= 4).length;
    const neutral = allValues.filter(val => val > 4 && val < 7).length;
    const positive = allValues.filter(val => val >= 7).length;
    
    return {
      name: aspect.name,
      Negativas: negative,
      Neutras: neutral,
      Positivas: positive
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          Negativas: { color: COLORS.negative },
          Neutras: { color: COLORS.neutral },
          Positivas: { color: COLORS.positive },
        }}
      >
        <BarChart
          data={distributionData}
          layout="vertical"
          stackOffset="expand"
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          barCategoryGap={1}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis 
            type="number" 
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} 
            tick={{fontSize: 12}} 
            domain={[0, 1]}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={70} 
            tick={{fontSize: 12}}
            tickMargin={5}
          />
          <Tooltip 
            formatter={(value, name) => [`${value} avaliações`, name]} 
            content={<ChartTooltipContent />}
            cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value, entry) => (
              <span style={{ color: 
                value === "Negativas" ? COLORS.negative : 
                value === "Neutras" ? COLORS.neutral : 
                COLORS.positive 
              }}>
                {value}
              </span>
            )}
          />
          <Bar 
            dataKey="Negativas" 
            stackId="a" 
            fill={COLORS.negative} 
            stroke={COLORS.negative} 
            radius={[0, 0, 0, 0]} 
          />
          <Bar 
            dataKey="Neutras" 
            stackId="a" 
            fill={COLORS.neutral} 
            stroke={COLORS.neutral} 
            radius={[0, 0, 0, 0]} 
          />
          <Bar 
            dataKey="Positivas" 
            stackId="a" 
            fill={COLORS.positive} 
            stroke={COLORS.positive} 
            radius={[0, 0, 0, 0]} 
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DistributionChart;
