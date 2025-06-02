import { Topic } from "./types";

export const TOPICS: Topic[] = [
  {
    id: "electronics",
    name: "Eletrônicos",
    icon: "smartphone",
    description: "Dispositivos eletrônicos como smartphones, laptops, TVs e gadgets",
    sources: ["Amazon", "Magazine Luiza", "Reclame Aqui", "Twitter"],
    suggestions: ["iPhone 15 Pro", "Galaxy S24 Ultra", "PS5 Slim", "AirPods Max"]
  },
  {
    id: "software",
    name: "Software e Apps",
    icon: "apps",
    description: "Aplicativos, serviços de streaming, programas e ferramentas digitais",
    sources: ["App Store", "Google Play", "Product Hunt", "Reddit"],
    suggestions: ["ChatGPT", "Microsoft Copilot", "Trello", "Spotify HiFi"]
  },
  {
    id: "home_appliances",
    name: "Eletrodomésticos",
    icon: "kitchen",
    description: "Produtos para casa como geladeiras, fogões, máquinas de lavar e ar-condicionado",
    sources: ["Casas Bahia", "Reclame Aqui", "Mercado Livre", "Facebook"],
    suggestions: ["Airfryer Philips", "Geladeira Brastemp", "Robô Aspirador Xiaomi", "Máquina de Lavar Electrolux"]
  },
  {
    id: "automotive",
    name: "Automotivo",
    icon: "directions_car",
    description: "Carros, motos e veículos em geral",
    sources: ["WebMotors", "Fipe", "YouTube", "Blogs especializados"],
    suggestions: ["Tesla Model 3", "Fiat Toro", "Honda Civic", "BMW G 310 R"]
  },
  {
    id: "fashion",
    name: "Moda",
    icon: "shopping_bag",
    description: "Roupas, calçados, acessórios e lojas",
    sources: ["Instagram", "Pinterest", "Blogs de moda", "Shein"],
    suggestions: ["Nike Air Force 1", "Bolsa Chanel", "Vestido Farm", "Óculos Ray-Ban"]
  },
  {
    id: "games",
    name: "Games",
    icon: "sports_esports",
    description: "Consoles, jogos, streaming e comunidades",
    sources: ["Twitch", "Steam", "IGN", "Metacritic"],
    suggestions: ["PlayStation 5", "Xbox Series X", "Nintendo Switch OLED", "Baldur's Gate 3"]
  },
  {
    id: "food",
    name: "Alimentação",
    icon: "restaurant",
    description: "Restaurantes, delivery, produtos alimentícios",
    sources: ["iFood", "TripAdvisor", "Instagram", "YouTube"],
    suggestions: ["McDonald's", "Outback Steakhouse", "Starbucks Frappuccino", "Pizza Hut"]
  },
  {
    id: "health",
    name: "Saúde e Bem-estar",
    icon: "favorite",
    description: "Medicamentos, planos de saúde, suplementos e serviços de saúde",
    sources: ["Reclame Aqui", "Twitter", "Google Reviews", "Fóruns"],
    suggestions: ["Ozempic", "Smart Fit", "Plano de Saúde Unimed", "Whey Protein Gold Standard"]
  },
  {
    id: "travel",
    name: "Viagem e Turismo",
    icon: "flight",
    description: "Hotéis, companhias aéreas, pacotes, destinos",
    sources: ["TripAdvisor", "Booking", "Instagram", "Blogs de viagem"],
    suggestions: ["Pacote Cancún", "Hotel Fasano Rio", "Passagem Aérea GOL", "Disney Paris"]
  },
  {
    id: "entertainment",
    name: "Entretenimento",
    icon: "movie",
    description: "Filmes, séries, shows, eventos e streaming",
    sources: ["IMDB", "Letterboxd", "Twitter", "Instagram"],
    suggestions: ["Filme Duna 2", "Série Bebê Rena", "Show Taylor Swift", "Netflix"]
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