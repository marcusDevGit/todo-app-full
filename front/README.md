# 🎨 Todo App - Frontend

Interface moderna para gerenciamento de tarefas

## 🛠️ Tecnologias

- **React 19** + Vite
- **Tailwind CSS** + shadcn/ui
- **React Router** (navegação)
- **Axios** (HTTP client)
- **Context API** (estado global)

## 🚀 Setup

```bash
# 1. Instalar dependências
npm install

# 2. Executar desenvolvimento
npm run dev

# 3. Build produção
npm run build
```

Aplicação: http://localhost:5173

## 🎨 Componentes UI

### shadcn/ui Components
- `Button` - Botões estilizados com variantes
- `Input` - Campos de entrada com validação
- `Card` - Containers de conteúdo
- `Form` - Formulários com validação
- `Label` - Labels acessíveis

### Páginas
- `Login` - Autenticação de usuário
- `Register` - Cadastro de novo usuário
- `Dashboard` - Lista e gerenciamento de tarefas

### Componentes Customizados
- `Layout` - Estrutura base com header
- `ProtectedRoute` - Proteção de rotas autenticadas

## 🔐 Autenticação

```jsx
import { useAuth } from '../hooks/useAuth';

const { user, login, register, logout, isAuthenticated } = useAuth();

// Fazer login
const result = await login(email, password);

// Verificar autenticação
if (isAuthenticated) {
  // Usuário logado
}
```

## 🛣️ Roteamento

```
/ → /dashboard (redirect automático)
/login → Página de login
/register → Página de registro  
/dashboard → Lista de tarefas (rota protegida)
```

## 📱 Responsividade

- ✅ **Mobile First** - Design otimizado para mobile
- ✅ **Tablet** - Layout adaptado para tablets
- ✅ **Desktop** - Interface completa para desktop
- ✅ **Tailwind Breakpoints** - sm, md, lg, xl

## 🎯 Funcionalidades

- ✅ **Login/Registro** - Autenticação completa
- ✅ **Lista de Tarefas** - Visualização organizada
- ✅ **Criar Tarefas** - Formulário simples
- ✅ **Marcar Concluída** - Checkbox interativo
- ✅ **Logout** - Encerrar sessão
- ✅ **Proteção de Rotas** - Segurança de acesso

## 📁 Estrutura

```
src/
├── components/     # Componentes reutilizáveis
│   ├── ui/         # shadcn/ui components
│   ├── Layout.jsx  # Layout principal
│   └── ProtectedRoute.jsx
├── pages/          # Páginas da aplicação
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── context/        # Context API
│   └── AuthContext.jsx
├── hooks/          # Custom hooks
│   └── useAuth.js
├── services/       # API services
│   ├── api.js
│   └── taskService.js
└── utils/          # Utilitários
    └── constants.js
```

## 🔧 Configuração

### Tailwind CSS
- Configurado com shadcn/ui
- Variáveis CSS customizadas
- Tema claro/escuro preparado

### Vite
- Hot reload configurado
- Build otimizado
- Alias `@/` para `src/`