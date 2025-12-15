# 📝 Todo App Full Stack

Sistema completo de gerenciamento de tarefas com React + Node.js

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/todo-app-full.git
cd todo-app-full

# 2. Backend
cd back
npm install
docker-compose up -d
npx prisma migrate dev
npm run dev

# 3. Frontend (novo terminal)
cd ../front
npm install
npm run dev
```

Acesse: http://localhost:5173

## ✨ Features

- ✅ **Autenticação JWT** - Login/Registro seguro
- ✅ **CRUD de Tarefas** - Criar, listar, atualizar, deletar
- ✅ **Interface Moderna** - React + Tailwind + shadcn/ui
- ✅ **API REST** - Endpoints completos
- ✅ **Banco PostgreSQL** - Persistência de dados
- ✅ **Testes** - Cobertura completa do backend

## 🏗️ Arquitetura

```
├── back/          # API REST (Node.js + Express + Prisma)
├── front/         # SPA (React + Vite + Tailwind)
└── README.md      # Documentação principal
```

**Stack Tecnológico:**
- **Frontend:** React 19, Vite, Tailwind CSS, shadcn/ui, React Router, Axios
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL, JWT, Jest
- **Database:** PostgreSQL com Docker

## 📚 Documentação

- [📡 Backend API](./back/README.md)
- [🎨 Frontend](./front/README.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'feat: add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

MIT License