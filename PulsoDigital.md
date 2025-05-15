# Documentação do Pulso Digital

## Visão Geral

O **Pulso Digital** é uma ferramenta open source projetada para analisar a percepção pública de termos específicos (tags) na internet, como nomes de produtos, marcas ou tópicos em alta. A aplicação monitora e analisa menções, comentários e reviews relacionados à tag pesquisada, processando os dados para gerar visualizações e insights valiosos.

## Tecnologias Utilizadas

- **Frontend**: React com TypeScript
- **Estilização**: TailwindCSS
- **Build**: Vite
- **Roteamento**: React Router
- **Gerenciamento de Estado**: React Query
- **Visualização de Dados**: Recharts
- **UI Components**: Shadcn/UI

## Estrutura do Projeto

```
tag-sense-insights/
├── public/
│   ├── images/
│   │   ├── pulso-digital-logo.svg
│   │   ├── pulso-digital-logo.png
│   │   └── pulso-digital-icon.svg
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DistributionChart.tsx
│   │   │   ├── RadarComparisonChart.tsx
│   │   │   ├── SentimentGauge.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── TimelineChart.tsx
│   │   │   └── VolumeChart.tsx
│   │   ├── ui/
│   │   ├── FeatureCard.tsx
│   │   ├── PulsoDigitalLogo.tsx
│   │   └── TagSearch.tsx
│   ├── hooks/
│   ├── lib/
│   │   ├── data-utils.ts
│   │   └── types.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .git/
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── PulsoDigital.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Páginas

### Página Inicial (`Index.tsx`)

A página inicial apresenta uma interface limpa e intuitiva com:
- Campo de busca para inserção da tag a ser analisada
- Cards de recursos destacando os principais benefícios da ferramenta
- Uma UI moderna com gradientes e transições suaves
- Logo oficial do Pulso Digital no topo da página

### Dashboard (`Dashboard.tsx`)

O dashboard é o coração da aplicação, exibindo as análises da tag pesquisada:
- Cabeçalho com o nome da tag e informações de atualização
- Conjunto de gráficos e visualizações organizados em cards
- Navegação para retorno à página inicial
- Logo oficial do Pulso Digital na barra superior e no rodapé

### Página de Erro (`NotFound.tsx`)

Página exibida quando o usuário tenta acessar uma rota inexistente.

## Componentes Principais

### Componentes de Dashboard

#### `TimelineChart.tsx`
Gráfico de linha que mostra a evolução das notas por aspecto ao longo do tempo. Permite seleção e filtragem dos aspectos visualizados através de checkboxes interativos. Recentemente aprimorado para:
- Maior espaço para visualização (550px de altura)
- Checkboxes ampliados e estilizados para melhor usabilidade
- Espaçamento adequado para exibição completa dos eixos X e Y
- Margens ajustadas para acomodar as datas no eixo X

#### `SentimentGauge.tsx`
Indicador de medidor (gauge) que exibe o sentimento médio geral em uma escala de 0 a 10. Modificado para:
- Exibir o valor numérico (6.8) sem sobreposição ao gráfico
- Usar a cor da identidade visual do Pulso Digital (#1D5AA7)

#### `DistributionChart.tsx`
Histograma/gráfico de barras que mostra a distribuição de notas por faixa. Melhorias implementadas:
- Cores mais vibrantes para melhor diferenciação entre categorias
- Independência da seleção de aspectos do TimelineChart
- Sempre exibe todos os aspectos disponíveis

#### `RadarComparisonChart.tsx`
Gráfico radar comparando as notas médias por diferentes aspectos.

#### `VolumeChart.tsx`
Gráfico de barras verticais mostrando o volume de avaliações por período. Aprimorado para:
- Usar a cor da logo (#1D5AA7) nas colunas do gráfico

#### `StatsCards.tsx`
Conjunto de cards com indicadores rápidos:
- Total de avaliações
- Data da última avaliação
- Aspecto com melhor nota
- Aspecto com pior nota

### Outros Componentes

#### `TagSearch.tsx`
Formulário de busca que permite ao usuário inserir uma tag para análise. Inclui:
- Campo de entrada com ícone e texto de exemplo
- Botão de submissão com efeito de carregamento
- Navegação para o dashboard após a submissão

#### `FeatureCard.tsx`
Card que exibe um recurso destacado da plataforma, com ícone, título e descrição.

#### `PulsoDigitalLogo.tsx`
Componente da logo do Pulso Digital atualizado para usar a imagem oficial da marca. Pode ser redimensionado e estilizado conforme necessário.

## Utilitários e Tipos de Dados

### Tipos de Dados (`types.ts`)

```typescript
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type TagSearchState = {
  isLoading: boolean;
  tag: string;
};

export type TimelinePoint = {
  date: string;
  value: number;
};

export type VolumePoint = {
  date: string;
  value: number;
};

export type AspectData = {
  name: string;
  timelineData: TimelinePoint[];
  volumeData: VolumePoint[];
};
```

### Utilitários de Dados (`data-utils.ts`)

Contém funções para geração de dados simulados para os gráficos:
- `getAspectData()`: Gera dados de aspectos para visualização
- `getBaseRating()`: Atribui classificações base para cada aspecto
- `generateTimelineData()`: Cria pontos de dados para gráficos de linha do tempo
- `generateVolumeData()`: Gera dados de volume de avaliações

## Fluxo de Funcionamento

1. O usuário acessa a página inicial e insere uma tag no campo de busca
2. Ao submeter, a aplicação simula um tempo de carregamento e navega para o dashboard
3. O dashboard exibe visualizações baseadas em dados simulados relacionados à tag pesquisada
4. O usuário pode interagir com os gráficos, filtrar aspectos e analisar os dados

## Recursos e Melhorias Implementadas

### Identidade Visual
- Logo oficial do Pulso Digital implementada em todo o aplicativo
- Favicon personalizado com ícone do Pulso Digital
- Título do site atualizado para "Pulso Digital"
- Padronização das cores em todos os componentes

### Correções no Dashboard
- Espaço ampliado para o gráfico de linha do tempo
- Filtros (checkboxes) maiores e mais intuitivos
- Isolamento dos filtros para afetar apenas o gráfico de linha
- Correção de margens e espaçamentos em todos os gráficos
- Ajuste nas cores para melhor visualização e consistência

### Documentação
- README profissional com descrição clara do projeto
- Adição das instruções de execução simplificadas
- Atualização da documentação técnica com as alterações implementadas

## Estado Atual e Próximos Passos

Atualmente, a aplicação está em fase de desenvolvimento com dados simulados. A estrutura para integração com APIs ou serviços de web scraping está preparada, mas ainda não implementada completamente.

Próximos passos para desenvolvimento:
- Implementar coleta real de dados via API ou web scraping
- Adicionar autenticação e perfis de usuário
- Incorporar mais fontes de dados e plataformas
- Melhorar os modelos de análise de sentimento e categorização de aspectos
- Adicionar recursos de exportação e compartilhamento de relatórios 

---

© 2024 Pulso Digital | Documentação atualizada em 14/05/2024 