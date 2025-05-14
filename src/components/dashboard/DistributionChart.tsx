
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

const DistributionChart = ({ data }: DistributionChartProps) => {
  // Calcular a distribuição de notas por categoria para cada aspecto
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
    <div className="h-[300px]">
      <ChartContainer 
        config={{
          Negativas: { color: "#ef4444" },
          Neutras: { color: "#f59e0b" },
          Positivas: { color: "#1D5AA7" },
        }}
      >
        <BarChart
          data={distributionData}
          layout="vertical"
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} 
            tick={{fontSize: 12}} 
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={80} 
            tick={{fontSize: 12}} 
          />
          <Tooltip 
            formatter={(value, name) => [`${value} avaliações`, name]} 
            content={<ChartTooltipContent />}
          />
          <Legend />
          <Bar dataKey="Negativas" stackId="a" />
          <Bar dataKey="Neutras" stackId="a" />
          <Bar dataKey="Positivas" stackId="a" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DistributionChart;
