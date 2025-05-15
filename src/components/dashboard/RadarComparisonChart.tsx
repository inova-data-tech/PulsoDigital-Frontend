import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { AspectData } from "@/lib/types";
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface RadarComparisonChartProps {
  data: AspectData[];
}

const RadarComparisonChart = ({ data }: RadarComparisonChartProps) => {
  // Calcular valores médios por aspecto
  const radarData = data.map(aspect => {
    const sum = aspect.timelineData.reduce((acc, point) => acc + point.value, 0);
    const avg = sum / aspect.timelineData.length;
    
    return {
      subject: aspect.name,
      average: avg,
      fullMark: 10
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{ 
          average: { color: "#1D5AA7" } 
        }}
      >
        <RadarChart 
          outerRadius="70%" 
          data={radarData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{fontSize: 11}}
            tickLine={false}
          />
          <PolarRadiusAxis 
            domain={[0, 10]} 
            tick={{fontSize: 10}} 
            angle={45}
            axisLine={false}
            tickCount={6}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Radar
            name="Média"
            dataKey="average"
            stroke="#1D5AA7"
            fill="#1D5AA7"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default RadarComparisonChart;
