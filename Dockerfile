# Imagem base Node
FROM node:20-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Imagem para produção
FROM nginx:alpine

# Copiar os arquivos de build para o servidor nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração personalizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]