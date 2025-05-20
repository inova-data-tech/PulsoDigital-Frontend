import { SearchHistoryItem, SearchStatus } from "./types";
import { getDefaultTopic } from "./topics";

// Tempos simulados para cada estado (em ms)
const FETCH_TIME = 3000; // 3 segundos
const ANALYZE_TIME = 5000; // 5 segundos

// Chave do localStorage
const SEARCH_HISTORY_KEY = "searchHistory";
const SEARCH_STATUS_KEY = "searchStatus";

// Função para obter o histórico de pesquisas
export const getSearchHistory = (): SearchHistoryItem[] => {
  try {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      return JSON.parse(savedHistory);
    }
  } catch (error) {
    console.error("Erro ao obter histórico de pesquisas:", error);
  }
  return [];
};

// Função para salvar o histórico de pesquisas
const saveSearchHistory = (history: SearchHistoryItem[]) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Erro ao salvar histórico de pesquisas:", error);
  }
};

// Função para adicionar uma nova pesquisa
export const addSearch = (tag: string, topicId: string = "electronics"): void => {
  const history = getSearchHistory();
  
  // Verificar se a tag já existe
  const existingIndex = history.findIndex(item => item.tag === tag && item.topic === topicId);
  
  // Se existir, remover
  if (existingIndex > -1) {
    history.splice(existingIndex, 1);
  }
  
  // Adicionar nova pesquisa no início com status inicial
  const newSearch: SearchHistoryItem = {
    tag,
    topic: topicId,
    status: 'fetching',
    createdAt: Date.now()
  };
  
  history.unshift(newSearch);
  
  // Limitar a 10 itens
  if (history.length > 10) {
    history.length = 10;
  }
  
  // Salvar
  saveSearchHistory(history);
  
  // Iniciar simulação de processamento
  simulateProcessing(tag, topicId);
};

// Função para atualizar o status de uma pesquisa
export const updateSearchStatus = (tag: string, status: SearchStatus, topicId?: string): void => {
  const history = getSearchHistory();
  
  const search = topicId 
    ? history.find(item => item.tag === tag && item.topic === topicId)
    : history.find(item => item.tag === tag);
  
  if (search) {
    search.status = status;
    saveSearchHistory(history);
  }
};

// Função para verificar se um dashboard está pronto para acesso
export const isDashboardReady = (tag: string, topicId?: string): boolean => {
  const history = getSearchHistory();
  
  const search = topicId 
    ? history.find(item => item.tag === tag && item.topic === topicId)
    : history.find(item => item.tag === tag);
  
  return search?.status === 'completed';
};

// Função que simula o processo de busca e análise
const simulateProcessing = (tag: string, topicId: string) => {
  // Simular o tempo para buscar dados
  setTimeout(() => {
    updateSearchStatus(tag, 'analyzing', topicId);
    
    // Simular o tempo para analisar dados
    setTimeout(() => {
      updateSearchStatus(tag, 'completed', topicId);
    }, ANALYZE_TIME);
  }, FETCH_TIME);
};

// Função para resetar o histórico de pesquisas
export const resetSearchHistory = () => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};

// Função para inicializar as pesquisas de demonstração
export const initDemoSearches = () => {
  // Resetar o histórico existente (apenas durante o desenvolvimento)
  // Remova esta linha quando o projeto estiver em produção
  resetSearchHistory();
  
  const demoSearches = [
    { tag: "iPhone 15 Pro", topicId: "electronics" },
    { tag: "ChatGPT", topicId: "software" },
    { tag: "Galaxy S24 Ultra", topicId: "electronics" },
    { tag: "PlayStation 5", topicId: "games" },
    { tag: "Airfryer Philips", topicId: "home_appliances" },
    { tag: "Tesla Model 3", topicId: "automotive" },
    { tag: "MacBook Pro M3", topicId: "electronics" },
    { tag: "Netflix", topicId: "entertainment" },
    { tag: "Spotify", topicId: "software" },
    { tag: "Amazon Echo", topicId: "electronics" }
  ];
  
  // Verificar se já existe histórico
  if (getSearchHistory().length === 0) {
    const currentTime = Date.now();
    
    const history: SearchHistoryItem[] = demoSearches.map((item, index) => {
      // Criar timestamp (10 minutos entre cada item)
      const timestamp = currentTime - (index * 600000);
      
      return {
        tag: item.tag,
        topic: item.topicId,
        // Distribuir status diferentes para demonstração
        status: index < 3 ? 'completed' : 
                index < 5 ? 'analyzing' : 
                index < 7 ? 'fetching' : 'completed',
        createdAt: timestamp
      };
    });
    
    saveSearchHistory(history);
  }
}; 