# node-express-mysql

## Descrição

Este é um exemplo de aplicação web **Node.js** que utiliza **Express.js** como framework e **MySQL** como base de dados. O objetivo do projecto é demonstrar como integrar sessões, autenticação, variáveis de ambiente, monitorização de erros e boas práticas de segurança.

## Tecnologias

- **Node.js** (v20 ou superior)
- **Express.js** – framework web
- **express-session** – gestão de sessões
- **dotenv** – carregamento de variáveis de ambiente a partir de `.env`
- **mysql2** – cliente MySQL
- **bcrypt** – hashing de passwords
- **string-sanitizer** – validação e limpeza de dados de entrada
- **@sentry/node** – monitorização de erros em produção
- **helmet** – cabeçalhos de segurança HTTP
- **ejs** – motor de templates para as views

## Estrutura de Pastas

```
├─ app.js                # ponto de entrada da aplicação
├─ package.json          # dependências e scripts npm
├─ .env.example          # exemplo de variáveis de ambiente
├─ controllers/          # lógica dos controladores
│   └─ myController.js
├─ helpers/              # utilitários (ex.: conexão DB, sessão)
│   ├─ connection.js
│   └─ sessionDB.js
├─ middlewares/          # middlewares personalizados
│   └─ limit.js          # rate‑limiter
├─ public/               # assets estáticos (css, imagens)
├─ routes/               # definições de rotas
│   └─ myRoute.js
├─ views/                # templates EJS
│   ├─ index.ejs
│   ├─ login.ejs
│   └─ base/            # cabeçalho, rodapé, navegação
└─ README.md             # este ficheiro
```

## Pré‑requisitos

- **MySQL** instalado e em execução
- **Node.js** e **npm** instalados
- Conta no **Sentry** (opcional, para monitorização)

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/marioalexandreantunes/node-express-mysql.git
   cd node-express-mysql
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um ficheiro `.env` baseado no exemplo:
   ```bash
   cp .env.example .env
   ```
   Preencha as variáveis:
   - `PORT` – porta onde a aplicação será executada (ex.: 3000)
   - `SECRET_KEY` – chave secreta para as sessões
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE` – credenciais da base de dados MySQL
   - `SENTRY` – DSN do Sentry (opcional)
4. Crie a base de dados MySQL e a tabela de utilizadores (exemplo simplificado):
   ```sql
   CREATE DATABASE node_express_mysql;
   USE node_express_mysql;
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Execução

```bash
npm start   # ou: node app.js
```
A aplicação ficará disponível em `http://localhost:<PORT>`.

## Scripts npm úteis

- `npm start` – inicia a aplicação em modo produção
- `npm run dev` – (se configurado) inicia com **nodemon** para desenvolvimento
- `npm run lint` – verifica o código com **ESLint** (se configurado)

## Endpoints principais

| Método | Rota          | Descrição                     |
|--------|---------------|------------------------------|
| GET    | `/`           | Página inicial (requer sessão) |
| GET    | `/login`      | Formulário de login          |
| POST   | `/auth`       | Processa autenticação         |
| GET    | `/logout`     | Termina a sessão do utilizador |

## Segurança

- **Helmet** adiciona cabeçalhos de segurança HTTP.
- **bcrypt** é usado para armazenar passwords encriptadas.
- **string-sanitizer** valida e limpa os dados de entrada.
- **express-session** armazena a sessão no MySQL via `sessionDB.js`.

## Monitorização de Erros

O projecto está configurado para enviar exceções ao **Sentry**. Defina a variável `SENTRY` no `.env` com o DSN da sua conta.

## Contribuição

Contribuições são bem‑vindas! Por favor, abra um *pull request* ou reporte um *issue*.

---

© 2025 Mario Alexandre Antunes. Todos os direitos reservados.
