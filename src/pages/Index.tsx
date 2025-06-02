import { Feature } from "@/lib/types";
import FeatureCard from "@/components/FeatureCard";
import TagSearch from "@/components/TagSearch";
import PulsoDigitalLogo from "@/components/PulsoDigitalLogo";
import SearchHistory from "@/components/SearchHistory";
import SettingsPanel from "@/components/SettingsPanel";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row">
        {/* Painel lateral esquerdo */}
        <aside className="hidden lg:block lg:w-96 pt-8 pr-6">
          <div className="sticky top-8">
            <SearchHistory />
          </div>
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1 max-w-4xl mx-auto w-full py-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-14 transition-all duration-300 hover:shadow-2xl">
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
            
            {/* Histórico de pesquisas e configurações para mobile (aparecem abaixo do conteúdo principal) */}
            <div className="mt-12 lg:hidden space-y-6">
              <SearchHistory />
              <SettingsPanel />
            </div>

            {/* Seção de Contribuidores Discreta */}
            <div className="mt-12 pt-6 text-center border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">
                Com a colaboração de:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 max-w-md mx-auto">
                {[ 
                  "Caio Rocha", 
                  "Gabriel Coelho", 
                  "João Vitor Melo", 
                  "José Lucas Vasconcelos", 
                  "Sarah Ocy", 
                  "Samuel Martins"
                ].map((name) => (
                  <p key={name} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        {/* Painel lateral direito */}
        <aside className="hidden lg:block lg:w-72 pt-8 pl-6">
          <div className="sticky top-8">
            <SettingsPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
