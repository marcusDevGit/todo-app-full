# � Backend - To-Do App API

> API RESTful robusta para gerenciamento de tarefas, listas e tags

![Node](https://img.shields.io/badge/node-18+-green.svg)
![Express](https://img.shields.io/badge/express-5.2-blue.svg)
![Prisma](https://img.shields.io/badge/prisma-5.22-brightgreen.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-14+-blue.svg)

## � Documentação

- **Swagger UI (Interativo)**: http://localhost:5001/api-docs
- **Documentação Completa**: [/src/docs/README.md](./src/docs/README.md)
- **Guia de Início Rápido**: [/src/docs/GETTING_STARTED.md](./src/docs/GETTING_STARTED.md)
- **Referência da API**: [/src/docs/API.md](./src/docs/API.md)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL 14 ou superior
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações:
# - DATABASE_URL (conexão PostgreSQL)
# - JWT_SECRET (chave secreta para JWT)
# - PORT (porta do servidor, padrão: 5001)

# Gerar Prisma Client
npm run generate

# Executar migrations
npm run migrate

# Iniciar servidor em modo desenvolvimento
npm run dev
```

O servidor estará rodando em `http://localhost:5001`

**Documentação Swagger**: `http://localhost:5001/api-docs`

## 🏗️ Arquitetura

```
back/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── config/                # Configurações
│   │   ├── cors.js           # Configuração CORS
│   │   ├── db.js             # Conexão com banco
│   │   ├── multer.js         # Upload de arquivos
│   │   ├── prisma.js         # Prisma Client
│   │   └── swagger.js        # Configuração Swagger
│   ├── core/                  # Núcleo da aplicação
│   │   ├── error.js          # Tipos de erro personalizados
│   │   └── responses.js      # Respostas padronizadas
│   ├── middleware/            # Middlewares
│   │   ├── authMiddleware.js # Autenticação JWT
│   │   ├── errorHandler.js   # Tratamento de erros
│   │   └── validate.js       # Validação de inputs
│   ├── modules/               # Módulos da aplicação
│   │   ├── auth/             # Autenticação
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.service.js
│   │   ├── tasks/            # Tarefas
│   │   │   ├── task.controller.js
│   │   │   ├── task.repository.js
│   │   │   ├── task.routes.js
│   │   │   ├── task.service.js
│   │   │   └── task.validation.js
│   │   ├── lists/            # Listas
│   │   ├── tags/             # Tags
│   │   ├── users/            # Usuários
│   │   └── files/            # Arquivos
│   ├── routes/                # Roteamento principal
│   │   └── index.js
│   ├── utils/                 # Utilitários
│   │   ├── jwt.js            # Funções JWT
│   │   └── password.js       # Hashing de senhas
│   ├── docs/                  # Documentação
│   │   ├── README.md
│   │   ├── API.md
│   │   └── GETTING_STARTED.md
│   ├── __tests__/             # Testes
│   ├── app.js                 # Configuração Express
│   └── index.js               # Entry point
└── package.json
```

## 🎯 Stack Tecnológica

### Core

- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web rápido e minimalista
- **Prisma 5** - ORM moderno e type-safe
- **PostgreSQL** - Banco de dados relacional

### Autenticação & Segurança

- **jsonwebtoken** - Geração e validação de JWT
- **bcrypt** - Hashing de senhas
- **express-validator** - Validação de entrada
- **cors** - Cross-Origin Resource Sharing

### Documentação

- **swagger-jsdoc** - Geração de spec OpenAPI
- **swagger-ui-express** - Interface Swagger interativa

### Upload

- **multer** - Upload de arquivos multipart/form-data

### Testes

- **jest** - Framework de testes
- **supertest** - Testes de API HTTP

### Desenvolvimento

- **dotenv** - Gerenciamento de variáveis de ambiente
- **node --watch** - Hot reload nativo

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload
npm start                # Inicia servidor em produção

# Banco de Dados
npm run generate         # Gera Prisma Client
npm run migrate          # Executa migrations

# Testes
npm test                 # Executa todos os testes
npm run test:watch       # Testes em modo watch
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `back`:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/todo_db"

# JWT
JWT_SECRET="sua-chave-secreta-super-segura-aqui"

# Server
PORT=5001
NODE_ENV=development
```

## 🌐 Endpoints da API

### Autenticação (Público)

```
POST   /api/auth/register    # Registrar novo usuário
POST   /api/auth/login        # Fazer login
```

### Usuários (Autenticado)

```
GET    /api/users/profile     # Obter perfil
PUT    /api/users/profile     # Atualizar perfil
```

### Tarefas (Autenticado)

```
GET    /api/tasks             # Listar tarefas
POST   /api/tasks             # Criar tarefa
GET    /api/tasks/search      # Buscar com filtros
GET    /api/tasks/:id         # Buscar tarefa por ID
PUT    /api/tasks/:id         # Atualizar tarefa
DELETE /api/tasks/:id         # Excluir tarefa
GET    /api/tasks/:id/subtasks    # Listar subtarefas
POST   /api/tasks/:id/subtasks    # Criar subtarefa
```

### Listas (Autenticado)

```
GET    /api/lists             # Listar listas
POST   /api/lists             # Criar lista
GET    /api/lists/:id         # Buscar lista
PUT    /api/lists/:id         # Atualizar lista
DELETE /api/lists/:id         # Excluir lista
```

### Tags (Autenticado)

```
GET    /api/tags              # Listar tags
POST   /api/tags              # Criar tag
DELETE /api/tags/:id          # Excluir tag
```

### Arquivos (Autenticado)

```
POST   /api/files/:taskId    # Upload de arquivo
GET    /api/files/:taskId    # Listar arquivos da tarefa
DELETE /api/files/:id        # Excluir arquivo
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm test -- --coverage

# Executar em modo watch
npm run test:watch

# Executar arquivo específico
npm test auth.test.js
```

### Estrutura de Testes

```
src/__tests__/
├── auth.test.js          # Testes de autenticação
├── tasks.test.js         # Testes de tarefas
├── tags.test.js          # Testes de tags
├── users.test.js         # Testes de usuários
└── files.test.js         # Testes de arquivos
```

## 🗄️ Banco de Dados

### Schema Prisma

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  tasks     Task[]
  lists     List[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  status      String    @default("pending")
  priority    Int       @default(0)
  important   Boolean   @default(false)
  dueDate     DateTime?
  userId      Int
  listId      Int?
  parentId    Int?
  user        User      @relation(fields: [userId], references: [id])
  list        List?     @relation(fields: [listId], references: [id])
  parent      Task?     @relation("Subtasks", fields: [parentId], references: [id])
  subtasks    Task[]    @relation("Subtasks")
  tags        TaskTag[]
  files       File[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model List {
  id        Int      @id @default(autoincrement())
  name      String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Tag {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  color     String
  tasks     TaskTag[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model TaskTag {
  taskId Int
  tagId  Int
  task   Task @relation(fields: [taskId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])
  @@id([taskId, tagId])
}
```

## � Segurança

### Autenticação

- JWT com expiração de 24 horas
- Tokens incluem: `userId`, `email`
- Header: `Authorization: Bearer {token}`

### Senhas

- Hash com bcrypt (10 salt rounds)
- Nunca retornadas nas respostas
- Validação de força (mínimo 6 caracteres)

### Validação

- Todos os inputs validados com express-validator
- Sanitização automática de dados
- Mensagens de erro descritivas

### CORS

- Configurado para permitir origens específicas
- Métodos HTTP permitidos: GET, POST, PUT, DELETE
- Headers personalizados permitidos

## 📊 Convenções

### Respostas de Sucesso

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### Respostas de Erro

```json
{
  "error": "Mensagem de erro descritiva"
}
```

### Códigos HTTP

- `200` - OK (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🐛 Debug

### Logs

```javascript
// Os logs são exibidos no console
console.log("Servidor rodando na porta:", PORT);
```

### Prisma Studio

```bash
npx prisma studio
# Abre interface visual do banco em http://localhost:5555
```

## 📈 Performance

- **Prisma** otimiza queries automaticamente
- **Indexação** em campos frequentemente buscados (email, status, userId)
- **Relações** carregadas sob demanda (lazy loading)
- **Connection pooling** gerenciado pelo Prisma

## 🚀 Deploy

### Produção

1. Configurar variáveis de ambiente de produção
2. Executar migrations no banco de produção:
   ```bash
   npm run migrate
   ```
3. Gerar build:
   ```bash
   npm run generate
   ```
4. Iniciar aplicação:
   ```bash
   npm start
   ```

### Docker (Opcional)

```dockerfile
# Dockerfile exemplo
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 5001
CMD ["npm", "start"]
```

## 🤝 Contribuindo

1. Siga as convenções de código existentes
2. Adicione testes para novas features
3. Mantenha a documentação atualizada
4. Use commits semânticos

## 📚 Recursos Úteis

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Swagger/OpenAPI Spec](https://swagger.io/specification/)
- [JWT.io](https://jwt.io/)

## 📞 Suporte

Para problemas ou dúvidas:

1. Consulte a [documentação completa](./src/docs/README.md)
2. Verifique a [documentação da API](./src/docs/API.md)
3. Use o Swagger UI para testar endpoints
4. Verifique os logs do servidor

---

**Desenvolvido com ❤️ usando Node.js e Express**
