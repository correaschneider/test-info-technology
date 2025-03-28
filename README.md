# Test Info Technology

Este projeto é uma aplicação web composta por frontend e backend, utilizando Docker para containerização.

## Pré-requisitos

- Docker
- Docker Compose

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `projects/frontend`: Aplicação frontend
- `projects/backend`: Aplicação backend

## Como Executar

1. Clone o repositório:

   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd test-info-technology
   ```

2. Antes de executar o projeto, é necessário configurar as variáveis de ambiente para o backend e frontend.

   ```bash
   cp projects/backend/.env.example projects/backend/.env
   ```

   ```bash
   cp projects/frontend/.env.example projects/frontend/.env
   ```

   > Veja a necessidade de alterar os valores das envs

3. Inicie os containers usando Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Acesse as aplicações:

   - Frontend: http://info.localhost
   - Backend: http://backend.info.localhost

## Scripts Úteis

O projeto inclui um script `curls.sh` que contém exemplos de requisições para testar a API.

## Configuração do Ambiente

O projeto utiliza:

- Nginx Proxy para roteamento
- Configurações específicas de ambiente no arquivo `docker-compose.override.yml`

## Desenvolvimento

Para desenvolvimento local, você pode:

1. Modificar os arquivos no diretório `projects/`
2. As alterações serão refletidas automaticamente nos containers
3. Use o comando `docker-compose logs -f` para acompanhar os logs em tempo real

## Parando o Projeto

Para parar todos os containers:

```bash
docker-compose down
```

## Solução de Problemas

Se encontrar problemas:

1. Verifique se a porta 80 está disponível
2. Certifique-se de que os domínios `info.localhost` e `backend.info.localhost` estão configurados no seu arquivo hosts

   #### No linux ou Mac /etc/hosts

   ```bash
   127.0.0.1 info.localhost backend.info.localhost
   ```

   #### No Windows

   Siga as instruções do Technoblog [Como editar o arquivo hosts no Windows
   ](https://tecnoblog.net/responde/editar-arquivo-hosts-windows/)

3. Verifique os logs dos containers para mais detalhes

## Sobre Backend e Frontend

Para saber mais sobre cada um dos projetos, acesses seus respectivos README.md

- [Backend](./projects/backend/README.md)
- [Frontend](./projects/frontend/README.md)
