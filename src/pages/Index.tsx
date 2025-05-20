import { Feature } from "@/lib/types";
import FeatureCard from "@/components/FeatureCard";
import TagSearch from "@/components/TagSearch";
import PulsoDigitalLogo from "@/components/PulsoDigitalLogo";
import SearchHistory from "@/components/SearchHistory";

const Index = () => {
  const features: Feature[] = [
    {
      id: "1",
      title: "Análise Profunda",
      description: "Métricas detalhadas da sua tag em múltiplas plataformas",
      icon: "analytics",
    },
    {
      id: "2",
      title: "Tempo Real",
      description: "Dados atualizados continuamente de várias fontes online",
      icon: "speed",
    },
    {
      id: "3",
      title: "Histórico Comparativo",
      description: "Compare o desempenho ao longo do tempo e com tags similares",
      icon: "history",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">        
        {/* Painel de histórico de pesquisas à esquerda */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <SearchHistory />
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1">
          <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-16 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex justify-center mb-8">
              <PulsoDigitalLogo width={250} height={100} />
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
                Monitoramento Inteligente de Tags
              </h1>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Descubra o que o mundo está dizendo sobre qualquer marca, produto ou tema em tempo real.
              </p>
            </div>
            
            <TagSearch />
            
            <div className="text-center text-gray-600 text-sm md:text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>
                Utilizamos inteligência artificial e dados em tempo real para avaliar a percepção pública
                sobre o termo pesquisado.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
            
            {/* Histórico de pesquisas para mobile (aparece abaixo do conteúdo principal) */}
            <div className="mt-12 lg:hidden">
              <SearchHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
