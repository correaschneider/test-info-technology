# Backend - Tracking Vehicle

Este é o backend do projeto Tracking Vehicle, desenvolvido com Node.js, Express e Prisma.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose (opcional, apenas se desejar rodar com Docker)
- PostgreSQL (se rodar sem Docker)

## Configuração do Ambiente

1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
3. Configure as variáveis de ambiente no arquivo `.env` com suas credenciais

## Executando o Projeto

### Com Docker (Recomendado)

1. Certifique-se de que o Docker e o Docker Compose estão instalados
2. Execute o comando:
   ```bash
   docker-compose up
   ```
   Para rodar em modo detached (background):
   ```bash
   docker-compose up -d
   ```
3. Execute as migrações do Prisma:
   ```bash
   docker compose exec backend npx prisma migrate dev
   ```

O backend estará disponível em `http://localhost:8000`

### Sem Docker

1. Instalação das Dependências

   ```bash
   npm install
   ```

2. Certifique-se de que o PostgreSQL está instalado e rodando

3. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
4. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```

O backend estará disponível em `http://localhost:8000`

## Scripts Disponíveis

- `npm run start`: Inicia o servidor em modo produção
- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run test`: Executa os testes
- `npm run test:watch`: Executa os testes em modo watch
- `npm run lint`: Verifica problemas de linting
- `npm run lint:fix`: Corrige problemas de linting automaticamente
- `npm run format`: Formata o código usando Prettier
- `npm run format:check`: Verifica se o código está formatado corretamente

> Caso queira rodar algum desses scripts, no docker basta executar da seguinte forma: `docker compose exec backend npm run test`

## Estrutura do Projeto

```
backend/
├── prisma/             # Configurações e migrações do Prisma
   └── migrations/      # Migrations
├── .env                # Variáveis de ambiente
├── .env.example        # Exemplo de variáveis de ambiente
├── docker-compose.yml  # Configuração do Docker Compose
├── package.json        # Dependências e scripts
└── src/                # Código fonte
   ├── controllers/     # Controllers
   ...
   └── tests/           # Testes
```

## Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. As migrações são gerenciadas pelo Prisma.

Para executar as migrações:

```bash
npx prisma migrate dev
```

Para visualizar o banco de dados com Prisma Studio:

```bash
npx prisma studio
```
