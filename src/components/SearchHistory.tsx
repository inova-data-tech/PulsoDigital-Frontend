import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, X, Search, AlertCircle, BarChart2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchHistoryItem, SearchStatus } from "@/lib/types";
import { getSearchHistory, initDemoSearches, isDashboardReady } from "@/lib/search-service";
import { toast } from "sonner";
import { TOPICS, getTopicById } from "@/lib/topics";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchHistoryProps {
  className?: string;
}

const StatusIndicator = ({ status }: { status: SearchStatus }) => {
  // Definir cor baseada no status
  const getColor = () => {
    switch (status) {
      case 'fetching':
        return 'bg-red-500';
      case 'analyzing':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Definir texto do tooltip baseado no status
  const getTooltip = () => {
    switch (status) {
      case 'fetching':
        return 'Buscando dados...';
      case 'analyzing':
        return 'Analisando...';
      case 'completed':
        return 'Análise completa';
      default:
        return 'Não iniciado';
    }
  };
  
  // Definir animação baseada no status
  const getAnimation = () => {
    if (status === 'fetching' || status === 'analyzing') {
      return 'animate-pulse';
    }
    return '';
  };

  return (
    <div className="relative group">
      <div className={`w-3 h-3 rounded-full ${getColor()} ${getAnimation()} ring-2 ring-opacity-30 ${status === 'fetching' ? 'ring-red-300' : status === 'analyzing' ? 'ring-yellow-300' : status === 'completed' ? 'ring-green-300' : 'ring-gray-200'}`}></div>
      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
        {getTooltip()}
      </div>
    </div>
  );
};

const TopicBadge = ({ topicId }: { topicId: string }) => {
  const topic = getTopicById(topicId);
  
  if (!topic) return null;
  
  return (
    <div className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full max-w-[100px] whitespace-nowrap">
      <span className="material-symbols-outlined text-xs mr-1">{topic.icon}</span>
      <span className="truncate">{topic.name}</span>
    </div>
  );
};

const SearchHistory = ({ className }: SearchHistoryProps) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar pesquisas demo
    initDemoSearches();
    
    // Carregar histórico do localStorage quando o componente montar
    setSearchHistory(getSearchHistory());
    
    // Adicionar um ouvinte para atualizar o componente quando o localStorage mudar
    const handleStorageChange = () => {
      setSearchHistory(getSearchHistory());
    };
    
    // Criar um intervalo para atualizar o componente regularmente
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSearchItemClick = (item: SearchHistoryItem) => {
    if (!isDashboardReady(item.tag, item.topic)) {
      toast.error("A análise ainda não está pronta. Por favor, aguarde.");
      return;
    }
    navigate(`/resultados/${item.tag}?topic=${item.topic}`);
  };

  const navigateToDashboard = (e: React.MouseEvent, item: SearchHistoryItem) => {
    e.stopPropagation();
    if (!isDashboardReady(item.tag, item.topic)) {
      toast.error("A análise ainda não está pronta. Por favor, aguarde.");
      return;
    }
    navigate(`/resultados/${item.tag}?topic=${item.topic}`);
  };

  const removeFromHistory = (e: React.MouseEvent, tag: string, topicId: string) => {
    e.stopPropagation();
    const updatedHistory = searchHistory.filter(
      item => !(item.tag === tag && item.topic === topicId)
    );
    // Atualizar estado
    setSearchHistory(updatedHistory);
    // Atualizar localStorage
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const formatTimestamp = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      // Verificar se a data é válida
      if (isNaN(date.getTime())) {
        return 'Agora';
      }
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Agora';
    }
  };

  if (searchHistory.length === 0) {
    return (
      <Card className={`shadow-md ${className} bg-white border-gray-200`}>
        <CardHeader className="pb-2 border-b border-gray-100">
          <CardTitle className="text-lg flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-600" />
            Histórico de Pesquisas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-gray-500">
          <p>Nenhuma pesquisa realizada ainda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`shadow-md ${className} bg-white border-gray-200`}>
      <CardHeader className="pb-2 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-600" />
            Histórico de Pesquisas
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={clearHistory}
          >
            Limpar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
          {searchHistory.map((item, index) => {
            // Determinar classes de estilo baseadas no status
            const itemClasses = item.status === 'completed' 
              ? 'hover:bg-gray-50 cursor-pointer' 
              : 'cursor-default';
            
            // Background mais suave para itens não completados
            const bgClass = item.status !== 'completed' 
              ? 'bg-gray-50/50' 
              : '';
            
            return (
              <li 
                key={index} 
                className={`p-4 ${itemClasses} ${bgClass} flex justify-between items-center transition-colors duration-200`}
                onClick={() => handleSearchItemClick(item)}
              >
                <div className="flex items-center gap-2">
                  <StatusIndicator status={item.status} />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-800 font-medium">{item.tag}</span>
                    </div>
                    <div className="flex items-center justify-start space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(item.createdAt) !== 'Agora' 
                          ? formatTimestamp(item.createdAt) 
                          : 'Agora'}
                      </span>
                      <TopicBadge topicId={item.topic} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {item.status === 'completed' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-1.5 text-xs bg-blue-500 text-white hover:bg-blue-600 rounded-md flex items-center flex-shrink-0"
                            onClick={(e) => navigateToDashboard(e, item)}
                          >
                            <BarChart2 className="h-3.5 w-3.5 mr-1" />
                            Dashboard
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver dashboard da tag "{item.tag}"</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex-shrink-0"
                    onClick={(e) => removeFromHistory(e, item.tag, item.topic)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SearchHistory; 