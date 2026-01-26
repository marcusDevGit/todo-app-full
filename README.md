# 📝 To-Do App

> Aplicação completa de gerenciamento de tarefas com interface moderna e API robusta

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 Sobre o Projeto

To-Do App é uma aplicação full-stack para gerenciamento de tarefas, listas e tags. Desenvolvida com as tecnologias mais modernas do mercado, oferece uma experiência de usuário fluida e intuitiva com recursos avançados de organização.

### ✨ Principais Recursos

- 🔐 **Autenticação Completa** - Sistema de login e registro com JWT
- ✅ **Gerenciamento de Tarefas** - Criação, edição, exclusão e busca avançada
- 📋 **Listas Personalizadas** - Organize suas tarefas em listas customizadas
- 🏷️ **Tags Coloridas** - Categorize tarefas com tags personalizadas
- 📎 **Anexos** - Upload e gerenciamento de arquivos
- 🔄 **Subtarefas** - Divida tarefas complexas em etapas menores
- 🎨 **Interface Moderna** - Design clean e responsivo
- 🌓 **Tema Claro/Escuro** - Alterne entre temas conforme sua preferência
- 🔍 **Busca e Filtros** - Encontre tarefas rapidamente com filtros avançados
- ⚡ **Real-time Updates** - Interface reativa e performática

## 🏗️ Arquitetura

```
todo-app-full/
├── back/          # Backend API (Node.js + Express + Prisma)
├── front/         # Frontend (React + Vite + TailwindCSS)
└── docs/          # Documentação
```

### Stack Tecnológica

#### Backend

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **Prisma** - ORM moderno para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **Swagger** - Documentação interativa da API
- **Jest** - Framework de testes

#### Frontend

- **React 19** - Biblioteca UI
- **Vite** - Build tool ultra-rápido
- **TailwindCSS 4** - Framework CSS utility-first
- **React Router** - Navegação entre páginas
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones modernos

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Instalação

#### 1. Clonar o repositório

```bash
git clone <repository-url>
cd todo-app-full
```

#### 2. Configurar Backend

```bash
cd back
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Configurar banco de dados
npm run generate
npm run migrate

# Iniciar servidor
npm run dev
```

O backend estará disponível em `http://localhost:5001`

#### 3. Configurar Frontend

```bash
cd front
npm install

# Configurar variáveis de ambiente (se necessário)
cp .env.example .env

# Iniciar aplicação
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📚 Documentação

### Backend API

- **Swagger UI**: http://localhost:5001/api-docs
- **Documentação Completa**: [/back/src/docs/README.md](./back/src/docs/README.md)
- **Guia de Início**: [/back/src/docs/GETTING_STARTED.md](./back/src/docs/GETTING_STARTED.md)
- **Referência da API**: [/back/src/docs/API.md](./back/src/docs/API.md)

### Frontend

- **README**: [/front/README.md](./front/README.md)
- **Componentes**: Ver estrutura em `/front/src/components`
- **Páginas**: Ver estrutura em `/front/src/pages`

## 🎮 Como Usar

### 1. Criar Conta

Acesse a aplicação e registre-se com nome, email e senha.

### 2. Fazer Login

Entre com suas credenciais para acessar o dashboard.

### 3. Criar Listas

Organize suas tarefas criando listas personalizadas (Trabalho, Pessoal, etc.).

### 4. Adicionar Tarefas

Crie tarefas com:

- Título e descrição
- Prioridade (Baixa, Média, Alta, Urgente)
- Data de vencimento
- Tags coloridas
- Subtarefas
- Anexos

### 5. Filtrar e Buscar

Use os filtros para encontrar tarefas por:

- Título
- Status (Pendente, Em Progresso, Completada)
- Prioridade
- Data de vencimento
- Tags

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run dev        # Inicia servidor em modo desenvolvimento
npm start          # Inicia servidor em modo produção
npm test           # Executa testes
npm run migrate    # Executa migrations do Prisma
npm run generate   # Gera Prisma Client
```

### Frontend

```bash
npm run dev        # Inicia aplicação em modo desenvolvimento
npm run build      # Gera build de produção
npm run preview    # Preview do build de produção
npm run lint       # Executa linter
```

## 🗄️ Banco de Dados

### Schema Principal

```sql
User (Usuários)
├── id
├── name
├── email
├── password (hash)
└── timestamps

Task (Tarefas)
├── id
├── title
├── description
├── status (pending, in_progress, completed)
├── priority (0-3)
├── important (boolean)
├── dueDate
├── userId (FK)
├── listId (FK)
├── parentId (FK - para subtarefas)
└── timestamps

List (Listas)
├── id
├── name
├── userId (FK)
└── timestamps

Tag (Tags)
├── id
├── name
├── color (hex)
└── timestamps

TaskTag (Relação N:N)
├── taskId (FK)
└── tagId (FK)

File (Arquivos)
├── id
├── filename
├── path
├── taskId (FK)
└── timestamps
```

## 🧪 Testes

### Backend

```bash
cd back
npm test              # Executar todos os testes
npm run test:watch    # Modo watch
```

Testes cobrem:

- Autenticação (registro, login)
- CRUD de tarefas
- CRUD de listas
- CRUD de tags
- Upload de arquivos

## 🔒 Segurança

- **Autenticação JWT** com tokens expiráveis
- **Senhas hasheadas** com bcrypt
- **Validação de entrada** em todos os endpoints
- **CORS configurado** para origens permitidas
- **SQL Injection protection** via Prisma ORM
- **XSS protection** via sanitização de inputs

## 🌐 API Endpoints

### Autenticação

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

### Tarefas

- `GET /api/tasks` - Listar tarefas
- `POST /api/tasks` - Criar tarefa
- `GET /api/tasks/:id` - Buscar tarefa
- `PUT /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Excluir tarefa
- `GET /api/tasks/search` - Buscar com filtros

### Listas

- `GET /api/lists` - Listar listas
- `POST /api/lists` - Criar lista
- `PUT /api/lists/:id` - Atualizar lista
- `DELETE /api/lists/:id` - Excluir lista

### Tags

- `GET /api/tags` - Listar tags
- `POST /api/tags` - Criar tag
- `DELETE /api/tags/:id` - Excluir tag

Ver documentação completa em [/back/src/docs/API.md](./back/src/docs/API.md)

## 🎨 Screenshots

<!-- Adicione screenshots aqui -->

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob a licença MIT. Ver arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Marcus** - _Desenvolvimento inicial_

## 🙏 Agradecimentos

- React Team pela biblioteca incrível
- Prisma Team pelo ORM moderno
- TailwindCSS pelos utilities CSS
- Comunidade open source

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato.

---

**Happy Coding! 🚀**
