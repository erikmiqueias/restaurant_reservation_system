# 🍽️ Restaurant Reservation System API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

> API RESTful para gerenciamento de mesas e reservas de um restaurante, desenvolvida como solução para o desafio de backend proposto por [racoelho.com.br](https://racoelho.com.br).

---

## 🏛️ Arquitetura

Este projeto foi desenhado focando em escalabilidade e manutenibilidade, aplicando rigorosamente os conceitos de **Domain-Driven Design (DDD)** e **Arquitetura Hexagonal (Ports and Adapters)**. As responsabilidades estão divididas para isolar o domínio e as regras de negócio das ferramentas de infraestrutura (como banco de dados e frameworks web).

### 📂 Estrutura de Pastas

A aplicação segue uma separação estrita de camadas:

```text
src/
├── @types/        # Tipos de dados do TypeScript.
├── app/   # Casos de uso (Use Cases) da aplicação e orquestração.
├── domain/        # Coração do software com entidades de domínio.
├── infra/         # Adaptadores externos: Banco de dados, Repositórios, Prisma, Zod, etc.
│   └── database/
│       └── prisma/
└── main/          # Entrypoint da aplicação: Configuração do Fastify, Factories e Injeção de Dependências.
```

---

## ⚙️ Funcionalidades

A API atende aos seguintes casos de uso, divididos por domínios:

**👤 Usuários (Users)**

- Criação de nova conta de usuário.
- Autenticação e Login.
- Atualização de token de acesso (Refresh Token).

**🪑 Mesas (Tables)**

- Cadastro de novas mesas (Acesso Admin).
- Listagem de todas as mesas disponíveis.
- Atualização de dados da mesa (Acesso Admin).
- Exclusão de mesas (Acesso Admin).

**📅 Reservas (Reservations)**

- Criação de uma nova reserva.
- Listagem do histórico de reservas do usuário autenticado.
- Cancelamento de reserva ativa.

---

## 🛠️ Como executar o projeto

Certifique-se de ter o **Docker** e o **Node.js** instalados na sua máquina.

### 1. Configurando Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3333
DATABASE_URL=postgresql://admin:adminpassword@localhost:5432/reservations_db?schema=public
JWT_SECRET=adicione_uma_secret_muito_forte_aqui
COOKIE_SECRET=adicione_uma_secret_muito_forte_aqui

```

### 2. Executando com Docker (Recomendado)

O projeto possui um ambiente containerizado completo. Para subir a aplicação e o banco de dados, execute na raiz do projeto:

```bash
docker compose up -d --build

```

A API estará disponível em `http://localhost:3333`.

### 3. Executando localmente (Modo Dev)

Se preferir rodar o projeto fora do Docker durante o desenvolvimento:

```bash
# Ativando o pnpm com o corepack
corepack enable

# Instalando as dependências
pnpm install

# Rodando as migrações no banco local
pnpm dlx prisma migrate dev

# Criando tipos do Prisma
pnpm dlx prisma generate

# Rodando o projeto
pnpm dev

# Para verificar tabelas e dados criados no banco de dados execute:
pnpm dlx prisma studio

```

---

## 📚 Documentação da API

A documentação interativa das rotas pode ser acessada no navegador. Ela foi construída utilizando a especificação OpenAPI integrada ao **Scalar** e **Swagger**.

👉 **Acesse:** `http://localhost:3333/docs` para realizar requisições e visualizar os schemas.

---

## 📜 Scripts Úteis (package.json)

| Comando            | Descrição                                                                |
| ------------------ | ------------------------------------------------------------------------ |
| `pnpm dev`         | Inicia o servidor em modo watch (`tsx`) com leitura de env nativa.       |
| `pnpm build`       | Compila o código TypeScript para JavaScript ESM usando `tsup`.           |
| `pnpm start:local` | Executa o build compilado na máquina local.                              |
| `pnpm start`       | Executa o build compilado (utilizado pelo container Docker em produção). |
