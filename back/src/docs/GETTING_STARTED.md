# Guia de Início Rápido - To-Do App API

## Requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## Instalação

### 1. Clonar e Instalar Dependências

```bash
cd back
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `back`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/todo_db"
JWT_SECRET="seu-secret-super-seguro-aqui"
PORT=5001
```

### 3. Configurar Banco de Dados

```bash
# Gerar client do Prisma
npm run generate

# Executar migrations
npm run migrate
```

### 4. Iniciar Servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:5001`

## Acessar Documentação

Após iniciar o servidor, acesse:

```
http://localhost:5001/api-docs
```

## Primeiro Teste

### 1. Registrar Usuário

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "password": "senha123"
  }'
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123"
  }'
```

Copie o `token` retornado.

### 3. Criar Tarefa

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {seu-token}" \
  -d '{
    "title": "Minha primeira tarefa"
  }'
```

## Próximos Passos

- Explore a [documentação completa da API](./API.md)
- Use o [Swagger UI](http://localhost:5001/api-docs) para testar endpoints interativamente
- Leia sobre os [modelos de dados](./API.md#modelos-de-dados)

## Estrutura do Projeto

```
back/
├── src/
│   ├── config/          # Configurações (DB, Swagger, CORS, etc)
│   ├── core/            # Utilitários centrais (respostas, erros)
│   ├── middleware/      # Middlewares (auth, validação, erros)
│   ├── modules/         # Módulos da aplicação
│   │   ├── auth/        # Autenticação
│   │   ├── tasks/       # Tarefas
│   │   ├── lists/       # Listas
│   │   ├── tags/        # Tags
│   │   ├── users/       # Usuários
│   │   └── files/       # Arquivos
│   ├── routes/          # Roteamento principal
│   ├── utils/           # Utilitários (JWT, password)
│   ├── docs/            # Documentação
│   ├── app.js           # Configuração do Express
│   └── index.js         # Entry point
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
└── package.json
```

## Scripts Disponíveis

```bash
# Desenvolvimento (hot reload)
npm run dev

# Produção
npm start

# Executar testes
npm test

# Executar testes em watch mode
npm run test:watch

# Gerar Prisma Client
npm run generate

# Executar migrations
npm run migrate
```

## Dicas

1. **Swagger UI**: Use para testar endpoints sem precisar de ferramentas externas
2. **Autenticação**: Clique em "Authorize" no Swagger para salvar seu token
3. **Validação**: A API valida automaticamente os dados de entrada
4. **Erros**: Todas as respostas de erro seguem um formato padronizado

## Solução de Problemas

### Erro de Conexão com Banco

```bash
# Verifique se o PostgreSQL está rodando
sudo systemctl status postgresql

# Teste a conexão
psql -U usuario -d todo_db
```

### Erro de Porta em Uso

```bash
# Matar processo na porta 5001
lsof -ti:5001 | xargs kill -9
```

### Prisma Client não encontrado

```bash
npm run generate
```

## Segurança

- **JWT**: Tokens expiram em 24 horas
- **Senhas**: Hasheadas com bcrypt
- **CORS**: Configurado para permitir apenas origens específicas
- **Validação**: Todos os inputs são validados com express-validator

## Recursos Adicionais

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Swagger/OpenAPI](https://swagger.io/specification/)
