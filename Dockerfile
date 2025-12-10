# --------------------------------------------------------
# STAGE 1: Build (Criação dos Arquivos de Produção do Angular)
# --------------------------------------------------------
# Usa a imagem oficial do Node para compilar o Angular
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package.json package-lock.json ./
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.spec.json ./

# Instala as dependências (incluindo as de desenvolvimento, necessárias para o Angular CLI)
RUN npm ci

# Copia o código-fonte da aplicação
# Os arquivos estão dentro de 'src/' e 'public/'
COPY src ./src
COPY public ./public

# Constrói a aplicação Angular em modo de produção
# O output padrão deve ser para 'dist/iResolve/browser' (ou similar)
# Verificado em angular.json que o nome do projeto é 'iResolve'
RUN npm run build -- --output-path=dist/browser --configuration=production

# --------------------------------------------------------
# STAGE 2: Production (Servidor de Arquivos Estáticos Leve)
# --------------------------------------------------------
# Usa uma imagem Node.js menor e mais leve para o runtime
FROM node:20-alpine AS production

# Instala o Express (ou outro servidor) para servir os arquivos estáticos
# Adiciona o diretório de trabalho
WORKDIR /usr/src/app

# Copia os artefatos de build da STAGE 1
COPY --from=build /app/dist/browser ./dist/

# Cria um arquivo simples de servidor Node.js (server.js)
# Este arquivo irá servir o index.html e os arquivos estáticos
RUN apk update && apk add --no-cache bash

# Cria um script simples de servidor Express
RUN echo "const express = require('express'); \n\
const path = require('path'); \n\
const app = express(); \n\
const port = process.env.PORT || 8080; \n\
const distPath = path.join(__dirname, 'dist'); \n\
\n\
// Serve arquivos estáticos do diretório Angular dist \n\
app.use(express.static(distPath)); \n\
\n\
// Envia o index.html para todas as rotas (necessário para roteamento Angular) \n\
app.get('*', (req, res) => { \n\
  res.sendFile(path.join(distPath, 'index.html')); \n\
}); \n\
\n\
app.listen(port, () => { \n\
  console.log(\`Servidor iResolve Frontend rodando na porta: \${port}\`); \n\
});" > server.js

# Instala o Express (e apenas ele) para o runtime
RUN npm install express

# Expõe a porta que o servidor irá utilizar
EXPOSE 8080

# Comando para iniciar o servidor
# Render injeta a variável PORT, que é usada no server.js
CMD ["node", "server.js"]
