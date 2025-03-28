# Frontend

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 17.3.14.

## Pré-requisitos

- Node.js 20.x
- npm (vem com o Node.js)
- Angular CLI 17.x
- Docker e Docker Compose (opcional, apenas para rodar com Docker)

## Configuração do Ambiente

1. Clone o repositório
2. Navegue até a pasta do projeto:
   ```bash
   cd projects/frontend
   ```
3. Copie o arquivo de ambiente de exemplo:
   ```bash
   cp .env.example .env
   ```

## Executando o Projeto

### Sem Docker

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

3. Acesse a aplicação em `http://localhost:4200`

### Com Docker

1. Construa e inicie os containers:

   ```bash
   docker-compose up --build
   ```

2. Acesse a aplicação em `http://localhost:4200`

## Scripts Disponíveis

- `npm run start`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run watch`: Compila o projeto em modo de desenvolvimento com watch mode
- `npm run serve:ssr:frontend`: Executa a versão SSR (Server-Side Rendering) da aplicação

## Estrutura do Projeto

- `/src`: Código fonte da aplicação
- `/src/app`: Componentes, serviços e módulos da aplicação
- `/src/assets`: Arquivos estáticos (imagens, fontes, etc.)
- `/src/environments`: Configurações de ambiente

## Tecnologias Utilizadas

- Angular 17
- Angular Material
- TypeScript
- RxJS
- Express (para SSR)

## Desenvolvimento

### Gerando Novos Componentes

Para gerar novos componentes, use o Angular CLI:

```bash
ng generate component nome-do-componente
```

Você também pode gerar outros artefatos como:

- Diretivas: `ng generate directive`
- Pipes: `ng generate pipe`
- Serviços: `ng generate service`
- Classes: `ng generate class`
- Guards: `ng generate guard`
- Interfaces: `ng generate interface`
- Enums: `ng generate enum`
- Módulos: `ng generate module`

## Ajuda Adicional

Para mais informações sobre o Angular CLI, use `ng help` ou visite a [Documentação do Angular CLI](https://angular.io/cli).
