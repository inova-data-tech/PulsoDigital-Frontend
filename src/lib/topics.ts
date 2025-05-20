import { Topic } from "./types";

export const TOPICS: Topic[] = [
  {
    id: "electronics",
    name: "Eletrônicos",
    icon: "smartphone",
    description: "Dispositivos eletrônicos como smartphones, laptops, TVs e gadgets",
    sources: ["Amazon", "Magazine Luiza", "Reclame Aqui", "Twitter"]
  },
  {
    id: "software",
    name: "Software e Apps",
    icon: "apps",
    description: "Aplicativos, serviços de streaming, programas e ferramentas digitais",
    sources: ["App Store", "Google Play", "Product Hunt", "Reddit"]
  },
  {
    id: "home_appliances",
    name: "Eletrodomésticos",
    icon: "kitchen",
    description: "Produtos para casa como geladeiras, fogões, máquinas de lavar e ar-condicionado",
    sources: ["Casas Bahia", "Reclame Aqui", "Mercado Livre", "Facebook"]
  },
  {
    id: "automotive",
    name: "Automotivo",
    icon: "directions_car",
    description: "Carros, motos e veículos em geral",
    sources: ["WebMotors", "Fipe", "YouTube", "Blogs especializados"]
  },
  {
    id: "fashion",
    name: "Moda",
    icon: "shopping_bag",
    description: "Roupas, calçados, acessórios e lojas",
    sources: ["Instagram", "Pinterest", "Blogs de moda", "Shein"]
  },
  {
    id: "games",
    name: "Games",
    icon: "sports_esports",
    description: "Consoles, jogos, streaming e comunidades",
    sources: ["Twitch", "Steam", "IGN", "Metacritic"]
  },
  {
    id: "food",
    name: "Alimentação",
    icon: "restaurant",
    description: "Restaurantes, delivery, produtos alimentícios",
    sources: ["iFood", "TripAdvisor", "Instagram", "YouTube"]
  },
  {
    id: "health",
    name: "Saúde e Bem-estar",
    icon: "favorite",
    description: "Medicamentos, planos de saúde, suplementos e serviços de saúde",
    sources: ["Reclame Aqui", "Twitter", "Google Reviews", "Fóruns"]
  },
  {
    id: "travel",
    name: "Viagem e Turismo",
    icon: "flight",
    description: "Hotéis, companhias aéreas, pacotes, destinos",
    sources: ["TripAdvisor", "Booking", "Instagram", "Blogs de viagem"]
  },
  {
    id: "entertainment",
    name: "Entretenimento",
    icon: "movie",
    description: "Filmes, séries, shows, eventos e streaming",
    sources: ["IMDB", "Letterboxd", "Twitter", "Instagram"]
  }
];

// Função para obter um tópico pelo ID
export const getTopicById = (id: string): Topic | undefined => {
  return TOPICS.find(topic => topic.id === id);
};

// Obtenha o tópico padrão (primeiro da lista)
export const getDefaultTopic = (): Topic => {
  return TOPICS[0];
}; 