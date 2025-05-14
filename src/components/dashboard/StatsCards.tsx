
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  ChartBar, 
  Gauge, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";
import { AspectData } from "@/lib/types";

interface StatsCardsProps {
  tag: string | undefined;
  data: AspectData[];
}

const StatsCards = ({ tag, data }: StatsCardsProps) => {
  // Calcular estatísticas
  const totalReviews = data.reduce((acc, item) => acc + item.volumeData.reduce((sum, vol) => sum + vol.value, 0), 0);
  
  // Encontrar último registro (data da última avaliação)
  const allDates = data.flatMap(item => item.timelineData.map(point => new Date(point.date)));
  const lastReviewDate = new Date(Math.max(...allDates.map(date => date.getTime())));
  
  // Encontrar aspecto com melhor e pior nota
  const aspectAverages = data.map(aspect => {
    const sum = aspect.timelineData.reduce((acc, point) => acc + point.value, 0);
    return {
      name: aspect.name,
      average: sum / aspect.timelineData.length
    };
  });
  
  const bestAspect = aspectAverages.reduce((best, current) => 
    current.average > best.average ? current : best, aspectAverages[0]);

  const worstAspect = aspectAverages.reduce((worst, current) => 
    current.average < worst.average ? current : worst, aspectAverages[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-4">
            <ChartBar className="h-5 w-5 text-primary-600" />
          </div>
          <h3 className="text-lg md:text-xl font-medium">Total de Avaliações</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">
            {totalReviews}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">avaliações registradas</p>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-4">
            <Calendar className="h-5 w-5 text-primary-600" />
          </div>
          <h3 className="text-lg md:text-xl font-medium">Última Avaliação</h3>
          <p className="text-lg md:text-xl font-bold mt-2 text-gray-800">
            {lastReviewDate.toLocaleDateString('pt-BR')}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {lastReviewDate.toLocaleTimeString('pt-BR')}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-green-100 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg md:text-xl font-medium">Melhor Aspecto</h3>
          <p className="text-lg md:text-xl font-bold mt-2 text-gray-800">
            {bestAspect.name}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Nota média: <span className="text-green-600 font-semibold">{bestAspect.average.toFixed(1)}</span>
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-red-100 mb-4">
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-lg md:text-xl font-medium">Pior Aspecto</h3>
          <p className="text-lg md:text-xl font-bold mt-2 text-gray-800">
            {worstAspect.name}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Nota média: <span className="text-red-600 font-semibold">{worstAspect.average.toFixed(1)}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
