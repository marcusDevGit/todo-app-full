# 📡 Todo App - Backend

API REST para gerenciamento de tarefas

## 🛠️ Tecnologias

- **Node.js** + Express
- **Prisma ORM** + PostgreSQL
- **JWT** Authentication
- **Jest** + Supertest (Testes)
- **Docker** (PostgreSQL)

## 🚀 Setup

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco
docker-compose up -d
npx prisma migrate dev
npx prisma generate

# 3. Executar
npm run dev
```

Servidor: http://localhost:5001

## 🌐 Variáveis de Ambiente (.env)

```env
PORT=5001
JWT_SECRET=Marcus_2025@
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp?schema=public
```

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

### Tarefas
- `GET /api/tasks` - Listar tarefas do usuário
- `POST /api/tasks` - Criar tarefa
- `GET /api/tasks/:id` - Buscar tarefa específica
- `PUT /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Deletar tarefa

### Subtarefas
- `GET /api/tasks/:id/subtasks` - Listar subtarefas
- `POST /api/tasks/:id/subtasks` - Criar subtarefa

### Tags
- `GET /api/tags` - Listar todas as tags
- `POST /api/tags` - Criar nova tag

### Arquivos
- `POST /api/files/:taskId` - Upload de arquivo
- `GET /api/files/:taskId` - Listar arquivos da tarefa
- `DELETE /api/files/:id` - Deletar arquivo

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar teste específico
npm test auth.test.js

# Watch mode
npm run test:watch
```

## 📊 Cobertura de Testes

- ✅ Autenticação (registro/login)
- ✅ CRUD de tarefas
- ✅ Subtarefas
- ✅ Tags
- ✅ Upload de arquivos
- ✅ Validações de entrada

## 🗄️ Banco de Dados

```bash
# Visualizar banco (Prisma Studio)
npx prisma studio

# Reset completo do banco
npx prisma migrate reset

# Gerar cliente Prisma
npx prisma generate
```

## 📁 Estrutura

```
src/
├── config/         # Configurações (Prisma, Multer)
├── middleware/     # Auth, Validação, Erro
├── modules/        # Módulos da aplicação
│   ├── auth/       # Autenticação
│   ├── tasks/      # Tarefas
│   ├── users/      # Usuários
│   ├── files/      # Arquivos
│   └── tags/       # Tags
├── utils/          # Utilitários (JWT, Password)
└── __tests__/      # Testes automatizados
```