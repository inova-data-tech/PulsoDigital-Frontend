import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TimelineChart from "@/components/dashboard/TimelineChart";
import SentimentGauge from "@/components/dashboard/SentimentGauge";
import DistributionChart from "@/components/dashboard/DistributionChart";
import RadarComparisonChart from "@/components/dashboard/RadarComparisonChart";
import VolumeChart from "@/components/dashboard/VolumeChart";
import StatsCards from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getAspectData } from "@/lib/data-utils";
import PulsoDigitalLogo from "@/components/PulsoDigitalLogo";
import { isDashboardReady } from "@/lib/search-service";
import { toast } from "sonner";
import { getTopicById, getDefaultTopic } from "@/lib/topics";

const Dashboard = () => {
  const { tag } = useParams<{ tag: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAspects, setSelectedAspects] = useState<string[]>(['Bateria', 'Sistema', 'Câmera', 'Tela', 'Design']);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  
  // Obter o tópico da query string
  const queryParams = new URLSearchParams(location.search);
  const topicId = queryParams.get('topic') || getDefaultTopic().id;
  const topic = getTopicById(topicId) || getDefaultTopic();
  
  // Para fins de demonstração, vamos criar dados simulados
  const aspectData = getAspectData();

  // Cria uma cópia completa dos dados que não será afetada pela seleção de aspectos
  // Isso garante que apenas o TimelineChart será afetado pela seleção de checkboxes
  const allAspectsData = [...aspectData];

  useEffect(() => {
    // Verificar se a análise está pronta
    if (tag) {
      // Verificar inicialmente
      checkStatus();
      
      // Verificar periodicamente
      const interval = setInterval(checkStatus, 1000);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [tag, topicId]);
  
  const checkStatus = () => {
    if (!tag) return;
    
    const ready = isDashboardReady(tag, topicId);
    setIsReady(ready);
    setIsLoading(false);
    
    // Se não estiver pronto, redirecionar para a página inicial
    if (!ready) {
      setTimeout(() => {
        // Se após 3 segundos ainda estiver na página e a análise não estiver pronta
        if (!isDashboardReady(tag, topicId) && window.location.pathname.includes('/resultados/')) {
          toast.error("A análise ainda não está pronta. Você está sendo redirecionado para a página inicial.");
          navigate('/');
        }
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <RotateCw className="animate-spin h-12 w-12 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Carregando...</h2>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Análise em andamento</h2>
            <p className="text-gray-600 mb-6">
              A análise para <span className="font-semibold">"{tag}"</span> ainda está sendo processada. 
              Por favor, aguarde até que ela esteja concluída.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Voltar para a página inicial
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link to="/">
              <Button variant="outline" size="sm" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <PulsoDigitalLogo className="hidden md:block" width={180} height={70} />
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-700">
                  Análise da Tag: <span className="text-primary-500 font-extrabold">{tag}</span>
                </h1>
                <div className="flex items-center mt-1">
                  <span className="material-symbols-outlined text-gray-500 mr-1">{topic.icon}</span>
                  <span className="text-gray-700">{topic.name}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Resultados atualizados em tempo real baseados em dados coletados de <strong>{topic.sources.join(", ")}</strong>.
            </p>
          </div>
        </div>

        {/* Indicadores rápidos */}
        <StatsCards tag={tag} data={aspectData} />

        {/* Gráfico de sentimento médio e distribuição de notas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="pb-2 bg-gray-50">
              <CardTitle className="text-lg">Sentimento Médio</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <SentimentGauge value={6.8} />
            </CardContent>
          </Card>
          
          {/* Gráfico de distribuição de notas */}
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="pb-2 bg-gray-50">
              <CardTitle className="text-lg">Distribuição de Notas</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <DistributionChart data={allAspectsData} />
            </CardContent>
          </Card>
        </div>

        {/* Linha do tempo de notas */}
        <Card className="mb-8 shadow-md overflow-hidden">
          <CardHeader className="pb-2 bg-gray-50">
            <CardTitle className="text-lg">Evolução das Notas ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-10 pb-16 pl-10 pr-10">
            <div className="h-[550px]">
              <TimelineChart 
                data={aspectData} 
                selectedAspects={selectedAspects} 
                setSelectedAspects={setSelectedAspects} 
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico radar */}
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="pb-2 bg-gray-50">
              <CardTitle className="text-lg">Comparativo por Aspecto</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <RadarComparisonChart data={allAspectsData} />
            </CardContent>
          </Card>

          {/* Gráfico de volume de avaliações */}
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="pb-2 bg-gray-50">
              <CardTitle className="text-lg">Volume de Avaliações</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <VolumeChart data={allAspectsData} />
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10 pb-6">
          <div className="flex justify-center items-center gap-3">
            <PulsoDigitalLogo width={120} height={40} />
            <Separator orientation="vertical" className="h-6" />
            <span>Dados atualizados em: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
