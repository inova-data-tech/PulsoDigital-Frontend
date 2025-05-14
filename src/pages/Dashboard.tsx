
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TimelineChart from "@/components/dashboard/TimelineChart";
import SentimentGauge from "@/components/dashboard/SentimentGauge";
import DistributionChart from "@/components/dashboard/DistributionChart";
import RadarComparisonChart from "@/components/dashboard/RadarComparisonChart";
import VolumeChart from "@/components/dashboard/VolumeChart";
import StatsCards from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getAspectData } from "@/lib/data-utils";

const Dashboard = () => {
  const { tag } = useParams<{ tag: string }>();
  const [selectedAspects, setSelectedAspects] = useState<string[]>(['Bateria', 'Sistema', 'Câmera', 'Tela', 'Design']);
  
  // Para fins de demonstração, vamos criar dados simulados
  const aspectData = getAspectData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/">
              <Button variant="outline" size="sm" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Análise da Tag: <span className="text-primary">{tag}</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Resultados atualizados em tempo real baseados em dados coletados de múltiplas fontes.
            </p>
          </div>
        </div>

        {/* Indicadores rápidos */}
        <StatsCards tag={tag} data={aspectData} />

        {/* Gráfico de sentimento médio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Sentimento Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentGauge value={6.8} />
            </CardContent>
          </Card>
          
          {/* Gráfico de distribuição de notas */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Distribuição de Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <DistributionChart data={aspectData} />
            </CardContent>
          </Card>
        </div>

        {/* Linha do tempo de notas */}
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle>Evolução das Notas ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <TimelineChart 
              data={aspectData} 
              selectedAspects={selectedAspects} 
              setSelectedAspects={setSelectedAspects} 
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico radar */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Comparativo por Aspecto</CardTitle>
            </CardHeader>
            <CardContent>
              <RadarComparisonChart data={aspectData} />
            </CardContent>
          </Card>

          {/* Gráfico de volume de avaliações */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Volume de Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <VolumeChart data={aspectData} />
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Dados atualizados em: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
