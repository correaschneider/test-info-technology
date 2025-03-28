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

2. Inicie os containers usando Docker Compose:

```bash
docker-compose up -d
```

3. Acesse as aplicações:

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
3. Verifique os logs dos containers para mais detalhes

## Sobre Backend e Frontend

Para saber mais sobre cada um dos projetos, acesses seus respectivos README.md

- [Backend](./projects/backend/README.md)
- [Frontend](./projects/frontend/README.md)
