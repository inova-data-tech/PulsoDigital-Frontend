
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
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
    <div className="h-[300px]">
      <ChartContainer 
        config={{ 
          average: { color: "#1D5AA7" } 
        }}
      >
        <RadarChart outerRadius={90} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{fontSize: 12}} />
          <PolarRadiusAxis domain={[0, 10]} tick={{fontSize: 12}} />
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
