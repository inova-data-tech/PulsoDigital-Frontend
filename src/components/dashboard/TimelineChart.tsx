
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Checkbox } from "@/components/ui/checkbox";
import { AspectData, TimelinePoint } from "@/lib/types";
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface TimelineChartProps {
  data: AspectData[];
  selectedAspects: string[];
  setSelectedAspects: React.Dispatch<React.SetStateAction<string[]>>;
}

const colors = [
  "#7341ff", // Primary
  "#22c55e", // Green
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#f59e0b", // Yellow
  "#8b5cf6", // Purple
  "#ec4899", // Pink
];

const TimelineChart = ({ data, selectedAspects, setSelectedAspects }: TimelineChartProps) => {
  const allAspects = data.map(aspect => aspect.name);
  
  // Unir todos os pontos de dados em uma lista com a mesma data base
  const combinedData: (TimelinePoint & { [key: string]: number })[] = [];
  const allDates = Array.from(new Set(data.flatMap(aspect => aspect.timelineData.map(point => point.date))));
  
  allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).forEach(date => {
    const point: any = { date };
    
    data.forEach(aspect => {
      const matchingPoint = aspect.timelineData.find(p => p.date === date);
      point[aspect.name] = matchingPoint ? matchingPoint.value : null;
    });
    
    combinedData.push(point);
  });
  
  const toggleAspect = (aspect: string) => {
    if (selectedAspects.includes(aspect)) {
      setSelectedAspects(selectedAspects.filter(a => a !== aspect));
    } else {
      setSelectedAspects([...selectedAspects, aspect]);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        {allAspects.map((aspect, index) => (
          <div key={aspect} className="flex items-center space-x-2">
            <Checkbox 
              id={`aspect-${index}`} 
              checked={selectedAspects.includes(aspect)}
              onCheckedChange={() => toggleAspect(aspect)}
            />
            <label 
              htmlFor={`aspect-${index}`} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {aspect}
            </label>
          </div>
        ))}
      </div>
      
      <div className="h-[400px] w-full">
        <ChartContainer 
          config={
            data.reduce((config, aspect, i) => {
              config[aspect.name] = { 
                color: colors[i % colors.length] 
              };
              return config;
            }, {} as Record<string, { color: string }>)
          }
        >
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString('pt-BR')}
            />
            <YAxis domain={[0, 10]} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            {data.map((aspect, index) => (
              selectedAspects.includes(aspect.name) && (
                <Line
                  key={aspect.name}
                  type="monotone"
                  dataKey={aspect.name}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              )
            ))}
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TimelineChart;
