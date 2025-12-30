# 1️⃣ Imagem base
FROM node:24

# 2️⃣ Criar diretório da aplicação
WORKDIR /app

# 3️⃣ Copiar package.json e package-lock.json
COPY package*.json ./

# 4️⃣ Instalar dependências
RUN npm install

# 5️⃣ Copiar todo o código fonte
COPY . .

# 6️⃣ Rodar build do TypeScript
RUN npm run build

# 7️⃣ Expor porta
EXPOSE 3000

# 8️⃣ Comando para iniciar o app
CMD ["npm", "start"]
