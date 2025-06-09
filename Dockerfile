# Usa Node com suporte a TypeScript
FROM node:18

# Variáveis de ambiente PostgreSQL
ENV POSTGRES_USER=boamassauser
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=boamassa

# Instala PostgreSQL e ferramentas úteis
RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib && \
    rm -rf /var/lib/apt/lists/*

# Cria pasta da aplicação
WORKDIR /app

# Copia pacotes e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Compila TypeScript
RUN npm run build

# Inicializa banco PostgreSQL
RUN service postgresql start && \
    su - postgres -c "psql -c \"CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';\"" && \
    su - postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;\""

# Expõe a porta do app e do banco
EXPOSE 8080 5432

# Comando de inicialização
CMD ["sh", "-c", "service postgresql start && npx prisma generate && npx prisma migrate deploy && npm run start"]
