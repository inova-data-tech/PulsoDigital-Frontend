
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
import PulsoDigitalLogo from "@/components/PulsoDigitalLogo";

const Dashboard = () => {
  const { tag } = useParams<{ tag: string }>();
  const [selectedAspects, setSelectedAspects] = useState<string[]>(['Bateria', 'Sistema', 'Câmera', 'Tela', 'Design']);
  
  // Para fins de demonstração, vamos criar dados simulados
  const aspectData = getAspectData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <Link to="/">
              <Button variant="outline" size="sm" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <PulsoDigitalLogo className="hidden md:block" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                Análise da Tag: <span className="text-primary-500">{tag}</span>
              </h1>
            </div>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Resultados atualizados em tempo real baseados em dados coletados de múltiplas fontes.
            </p>
          </div>
        </div>

        {/* Indicadores rápidos */}
        <StatsCards tag={tag} data={aspectData} />

        {/* Gráfico de sentimento médio e distribuição de notas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle>Sentimento Médio</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <SentimentGauge value={6.8} />
            </CardContent>
          </Card>
          
          {/* Gráfico de distribuição de notas */}
          <Card className="shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle>Distribuição de Notas</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <DistributionChart data={aspectData} />
            </CardContent>
          </Card>
        </div>

        {/* Linha do tempo de notas */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Evolução das Notas ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
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
            <CardHeader className="pb-2">
              <CardTitle>Comparativo por Aspecto</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <RadarComparisonChart data={aspectData} />
            </CardContent>
          </Card>

          {/* Gráfico de volume de avaliações */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Volume de Avaliações</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <VolumeChart data={aspectData} />
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <div className="flex justify-center items-center gap-2">
            <PulsoDigitalLogo width={100} height={30} />
            <span>Dados atualizados em: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
