import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { Progress } from "@/components/ui/progress";

interface SentimentGaugeProps {
  value: number; // 0-10
}

const SentimentGauge = ({ value }: SentimentGaugeProps) => {
  // Normalizar o valor para o range esperado pelo gráfico
  const normalizedValue = Math.max(0, Math.min(10, value)); // Limitar entre 0 e 10
  
  // Determinar categoria e cor
  let category = "";
  let color = "";
  
  if (normalizedValue < 4) {
    category = "Negativa";
    color = "#ef4444"; // vermelho
  } else if (normalizedValue < 7) {
    category = "Neutra";
    color = "#f59e0b"; // amarelo
  } else {
    category = "Positiva";
    color = "#1D5AA7"; // cor da logo
  }

  // Dados para o gauge semi-circular
  const data = [
    { name: 'Value', value: normalizedValue },
    { name: 'Remaining', value: 10 - normalizedValue },
  ];
  
  return (
    <div className="flex flex-col items-center">
      {/* Valor e categoria completamente separados do gráfico */}
      <div className="text-center mb-6 mt-2">
        <p className="text-5xl font-bold" style={{ color }}>
          {normalizedValue.toFixed(1)}
        </p>
        <p className="text-xl font-medium mt-1" style={{ color }}>
          {category}
        </p>
      </div>
      
      {/* Gauge semicircular sem texto */}
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background gauge */}
            <Pie
              data={[{ value: 10 }]}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill="#e5e7eb" /> {/* Background color */}
            </Pie>
            
            {/* Value gauge */}
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="value"
              label={false}
            >
              <Cell fill={color} />
              <Cell fill="transparent" /> {/* Make remaining part transparent */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Colorized progress bar representation */}
      <div className="w-full px-2 mt-4">
        <div className="flex justify-between mb-1 text-xs">
          <span>0</span>
          <span className="text-red-500">Negativa</span>
          <span className="text-yellow-500">Neutra</span>
          <span className="text-primary-500">Positiva</span>
          <span>10</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${(normalizedValue / 10) * 100}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SentimentGauge;
