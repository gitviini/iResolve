# --------------------------------------------------------
# STAGE 1: BUILDER
# Propósito: Compilar a aplicação Java e gerar o arquivo JAR
# --------------------------------------------------------
# Usamos o JDK 21 oficial do Eclipse Temurin (leve e rápido)
FROM eclipse-temurin:21-jdk-alpine AS builder

# Define o diretório de trabalho: /app será o diretório raiz do projeto Maven
WORKDIR /app

# Copia os arquivos de build e wrapper do Maven
# A cópia é feita a partir da pasta 'app/' do repositório para o WORKDIR /app
COPY app/pom.xml .
COPY app/mvnw .
COPY app/mvnw.cmd .
COPY app/.mvn .mvn

# Passo 1 (Otimização de Cache): Baixa as dependências.
# Esta camada só será reconstruída se o pom.xml for alterado.
RUN ./mvnw dependency:go-offline

# Copia o código-fonte
COPY app/src src

# Executa o build e cria o JAR
# O -DskipTests acelera a compilação no container.
RUN ./mvnw package -DskipTests

# Define o nome final do arquivo JAR para facilitar a referência
RUN mv target/*.jar app.jar

# --------------------------------------------------------
# STAGE 2: RUNTIME
# Propósito: Executar o JAR em um ambiente leve (apenas JRE)
# --------------------------------------------------------
# Usamos o JRE 21 (menor que o JDK)
FROM eclipse-temurin:21-jre-alpine AS final

# Define o diretório de trabalho para execução
WORKDIR /usr/app

# Copia o JAR compilado da etapa 'builder'
COPY --from=builder /app/app.jar .

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando de inicialização para o Render (e outros serviços PaaS)
# O -Dserver.port=${PORT} garante que o Spring Boot use a porta injetada pelo Render (variável de ambiente PORT).
CMD ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
