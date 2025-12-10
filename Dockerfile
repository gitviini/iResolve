# Imagem base com Java 17 (recomendado para Spring Boot 3)
FROM eclipse-temurin:17-jdk-alpine

# Diretório dentro do container
WORKDIR /app

# Copia o arquivo JAR para o container
COPY app-0.0.1-SNAPSHOT.jar app.jar

# Exponha a porta padrão do Spring Boot
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
