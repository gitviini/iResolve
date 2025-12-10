# Guia de Contribuição - iResolve

Seja bem-vindo ao repositório do **iResolve**! Ficamos felizes com seu interesse em
contribuir para fomentar a economia local através da nossa plataforma de
micro-trabalhos.
Este documento visa orientar novos desenvolvedores a configurar o ambiente,
entender nossa arquitetura e enviar suas contribuições de forma padronizada.

## 🚀 1. Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua
máquina:
● **Git** : Para versionamento de código.
● **Node.js** (v16+): Para executar o Front-end Angular.
● **Java JDK** (v17+): Para executar o Back-end Spring Boot.
● **Maven** : Para gerenciamento de dependências do Java (opcional se usar o mvnw
incluso).

## 🛠 2. Configurando o Ambiente

O projeto é dividido em dois diretórios principais: iResolve-frontend e
iResolve-backend. Você precisará de dois terminais para rodar a aplicação
completa.

### Passo 1: Clonar o Repositório

Bash
git clone https://github.com/gitviini/iResolve.git
cd iResolve

### Passo 2: Inicializar o Front-end (Angular)


No primeiro terminal:
Bash
cd iResolve-frontend
# Instalar dependências
npm install
# Rodar o servidor de desenvolvimento
npm start
● O Front-end estará acessível em: [http://localhost:4200/](http://localhost:4200/)

### Passo 3: Inicializar o Back-end (Spring Boot)

No segundo terminal:
Bash
cd iResolve-backend/app
# Instalar dependências e rodar
# Windows:
mvnw.cmd spring-boot:run
# Linux/Mac:
./mvnw spring-boot:run
● A API estará acessível em: [http://localhost:8080/](http://localhost:8080/)
● **Banco de Dados:** Utilizamos o banco em memória **H**.
○ Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
○ JDBC URL: jdbc:h2:file:./data/db
○ User: admin
○ Password: (Vazio ou verificar application.properties)

## 🏗 3. Padrões de Arquitetura


Para manter o código organizado, seguimos arquiteturas específicas em cada ponta.
Por favor, respeite essa estrutura ao criar novas funcionalidades.
[cite_start]Front-end (Feature-Based)
Organizamos o código por funcionalidades ("Features"), não por tipo de arquivo.
● [cite_start]
src/app/core: Singletons, serviços globais, guardas e interceptors.
● [cite_start]
src/app/shared: Componentes genéricos reutilizáveis (ex: Botões, Modais).
● src/app/features: Onde vivem as regras de negócio visuais.
○ Ex: features/chat, features/needs, features/auth.
○ [cite_start]Cada feature deve ter seus próprios componentes e modelos
específicos.
[cite_start]Back-end (Layered-Clean)
Seguimos uma separação clara de responsabilidades:

1. **Controller (/controller)** : Recebe a requisição HTTP. [cite_start] **Não deve**
    **conter regras de negócio**.
2. [cite_start]
    **UseCase/Service (/usecase ou /service)** : Contém a lógica de negócio real.
3. [cite_start]
    **Repository (/repository)** : Interage com o banco de dados.
4. [cite_start]
    **Entity (/entity)** : Representa as tabelas do banco.
5. [cite_start]
    **DTO (/dto)** : Objetos para transferência de dados entre camadas (Front <->
    Back).

## 🤝 4. Fluxo de Trabalho (Workflow)

### Branches


Utilizamos um padrão de branches para organizar o desenvolvimento:
● **main / master** : Código estável em produção.
● **front** e **back** : Branches principais de desenvolvimento de cada stack.
● **Features** : Para cada nova funcionalidade (UH - User History), crie uma branch a
partir da base correta:
○ Padrão: feature/uh<NUMERO>-<nome-da-feature>
○ Exemplo: feature/uh15-negotiation-front ou
feature/uh01-register-back.

### Commits Semânticos

Adotamos o padrão **Conventional Commits** para manter o histórico legível:
● feat: adiciona tela de login (Nova funcionalidade)
● fix: corrige erro no upload de imagem (Correção de bug)
● docs: atualiza readme (Documentação)
● style: formatação de código (Sem mudança de lógica)
● refactor: reestrutura service de usuário (Refatoração)

### Pull Requests (PR)

1. Faça o Push da sua branch: git push origin feature/minha-feature.
2. Abra um Pull Request no GitHub apontando para front ou back (dependendo
    de onde mexeu).
3. Descreva o que foi feito e anexe prints se for algo visual.
4. Aguarde a revisão de pelo menos um colega (Code Review).

## 🧪 5. Testes

```
● API: Utilize o Thunder Client (VS Code) ou Postman para testar os endpoints.
● Autenticação: A maioria das rotas é protegida. [cite_start]Lembre-se de enviar o
header Authorization: Bearer <seu-token>.
```

## 🐛 6. Encontrou um Bug?

Utilize a aba **Issues** do GitHub para reportar problemas. Tente incluir:
● Passos para reproduzir o erro.
● Comportamento esperado vs. Comportamento real.
● Screenshots ou logs de erro.
Agradecemos sua contribuição para tornar o **iResolve** uma plataforma incrível! 🚀


