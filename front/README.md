# 🎨 Frontend - To-Do App

> Interface moderna e intuitiva para gerenciamento de tarefas

![React](https://img.shields.io/badge/react-19.2-blue.svg)
![Vite](https://img.shields.io/badge/vite-7.2-purple.svg)
![TailwindCSS](https://img.shields.io/badge/tailwind-4.1-cyan.svg)

## ✨ Recursos

- 🎯 **Interface Intuitiva** - Design limpo e fácil de usar
- 🌓 **Tema Claro/Escuro** - Alterne entre temas
- 📱 **Responsivo** - Funciona em desktop, tablet e mobile
- ⚡ **Performance** - Build otimizado com Vite
- 🎨 **Componentes Reutilizáveis** - Arquitetura modular
- 🔍 **Busca Avançada** - Filtros por status, prioridade, tags e data
- 🏷️ **Tags Coloridas** - Organização visual com cores personalizadas
- ✅ **Subtarefas** - Divida tarefas em etapas menores
- 📎 **Upload de Arquivos** - Anexe documentos às tarefas
- 🔔 **Notificações** - Feedback visual de ações

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Backend rodando em `http://localhost:5000`

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (se necessário)
cp .env.example .env
# Edite VITE_API_URL se a URL do backend for diferente

# Iniciar aplicação em modo desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
front/
├── public/                    # Arquivos estáticos
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes base (shadcn/ui)
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── form.jsx
│   │   │   ├── input.jsx
│   │   │   └── label.jsx
│   │   ├── NotificationCenter.jsx
│   │   ├── PlannedView.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ReminderBadge.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SubtaskForm.jsx
│   │   ├── SubtaskList.jsx
│   │   ├── TagSelector.jsx
│   │   ├── TaskDetails.jsx
│   │   ├── TaskEditForm.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/              # Context API
│   │   ├── AuthContext.jsx  # Contexto de autenticação
│   │   └── ThemeContext.jsx # Contexto de tema
│   ├── hooks/                # Custom Hooks
│   │   ├── useAuth.jsx      # Hook de autenticação
│   │   └── useToast.js      # Hook de notificações
│   ├── lib/                  # Bibliotecas e utils
│   │   └── utils.js         # Funções utilitárias (cn, etc)
│   ├── pages/                # Páginas da aplicação
│   │   ├── Dashboard.jsx    # Página principal
│   │   ├── Login.jsx        # Página de login
│   │   └── Register.jsx     # Página de registro
│   ├── services/             # Serviços de API
│   │   ├── api.js           # Cliente Axios configurado
│   │   ├── listService.js   # Serviço de listas
│   │   └── taskService.js   # Serviço de tarefas
│   ├── utils/                # Utilitários
│   │   ├── constants.js     # Constantes da aplicação
│   │   └── groupTasksByDate.js
│   ├── App.jsx               # Componente principal
│   ├── index.css             # Estilos globais
│   └── main.jsx              # Entry point
├── .eslintrc.js              # Configuração ESLint
├── tailwind.config.js        # Configuração TailwindCSS
├── vite.config.js            # Configuração Vite
└── package.json
```

## 🎯 Stack Tecnológica

### Core

- **React 19** - Biblioteca UI moderna
- **Vite 7** - Build tool ultra-rápido
- **React Router DOM 7** - Navegação entre páginas

### Estilização

- **TailwindCSS 4** - Framework CSS utility-first
- **tailwindcss-animate** - Animações pré-construídas
- **class-variance-authority** - Variantes de componentes
- **clsx** - Utilitário para classes condicionais
- **tailwind-merge** - Merge de classes Tailwind

### UI Components

- **Radix UI** - Componentes acessíveis e não-estilizados
  - checkbox
  - label
  - select
  - slot
- **Lucide React** - Ícones modernos e customizáveis

### Formulários & Validação

- **React Hook Form** - Gerenciamento de formulários performático
- **@hookform/resolvers** - Resolvers para validação
- **Zod** - Validação de schema TypeScript-first

### HTTP & Estado

- **Axios** - Cliente HTTP com interceptors
- **React Context API** - Gerenciamento de estado global

### Notificações

- **React Toastify** - Sistema de notificações toast

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Build de produção
npm run preview          # Preview do build de produção

# Qualidade de Código
npm run lint             # Executa ESLint
```

## 🎨 Componentes Principais

### Páginas

#### Dashboard

Página principal da aplicação com:

- Lista de tarefas
- Sidebar com navegação
- Filtros e busca
- Criação rápida de tarefas
- Visualizações: Tarefas, Hoje, Importantes, Planejado

#### Login

- Formulário de autenticação
- Validação com React Hook Form + Zod
- Redirect automático após login

#### Register

- Formulário de registro
- Validação de dados
- Criação de conta

### Componentes de UI

#### TaskList

Lista de tarefas com:

- Cards de tarefa
- Toggle de status (completar/reabrir)
- Marcar como importante
- Edição inline
- Exclusão com confirmação

#### TaskForm

Formulário de criação rápida de tarefas

#### TaskEditForm

Formulário completo de edição com:

- Título e descrição
- Status e prioridade
- Data de vencimento
- Tags coloridas
- Associação a listas
- Criação de subtarefas

#### TaskDetails

Painel lateral com detalhes da tarefa:

- Informações completas
- Subtarefas
- Upload/visualização de arquivos
- Edição e exclusão

#### SearchFilter

Sistema de busca e filtros:

- Busca por título
- Filtro por status
- Filtro por prioridade
- Filtro por data de vencimento
- Filtro por tags (com cores)

#### TagSelector

Seletor de tags com:

- Tags existentes coloridas
- Criação de novas tags
- Exclusão de tags
- Cores aleatórias automáticas

#### Sidebar

Navegação lateral com:

- Visualizações padrão (Tarefas, Hoje, Importantes, Planejado)
- Listas personalizadas
- Criação de novas listas
- Perfil do usuário
- Toggle de tema
- Logout

#### ThemeToggle

Alternador de tema claro/escuro

### Contexts

#### AuthContext

Gerencia autenticação:

- Login/Logout
- Persistência de token
- Proteção de rotas
- Estado do usuário

#### ThemeContext

Gerencia tema da aplicação:

- Tema claro/escuro
- Persistência de preferência
- Toggle automático

### Services

#### api.js

Cliente Axios configurado com:

- Base URL do backend
- Interceptor de autenticação (JWT)
- Tratamento de erros

#### taskService.js

Serviços de tarefas:

- CRUD de tarefas
- Busca e filtros
- Gerenciamento de subtarefas
- CRUD de tags
- Upload de arquivos

#### listService.js

Serviços de listas:

- CRUD de listas personalizadas

## 🎨 Estilização

### TailwindCSS

A aplicação usa TailwindCSS 4 com configuração personalizada:

```javascript
// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cores personalizadas definidas em CSS variables
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
```

### Temas

Variáveis CSS em `index.css`:

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  /* etc */
}

.dark {
  --background: ...;
  --foreground: ...;
  /* etc */
}
```

### Classes Utilitárias Personalizadas

```css
.glass-card {
  @apply backdrop-blur-sm bg-card/80 border border-border;
}

.gradient-text {
  @apply bg-gradient-to-r from-primary to-primary/60 
         bg-clip-text text-transparent;
}

.scrollbar-thin {
  /* Custom scrollbar styles */
}
```

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Login/Register** - Usuário faz login ou se registra
2. **Token JWT** - Backend retorna token JWT
3. **Armazenamento** - Token salvo no localStorage
4. **Auto-login** - Token verificado ao recarregar a página
5. **Interceptor** - Token incluído em todas as requisições
6. **Proteção** - Rotas protegidas com `ProtectedRoute`

### Implementação

```javascript
// Uso do contexto de autenticação
const { user, loading, login, logout } = useAuth();

// Login
await login(email, password);

// Logout
logout();

// Proteção de rota
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>;
```

## 🔔 Notificações

Sistema de toast com react-toastify:

```javascript
import { useToast } from "@/hooks/useToast";

const { addToast } = useToast();

// Sucesso
addToast("Tarefa criada com sucesso!", "success");

// Erro
addToast("Erro ao criar tarefa", "error");

// Info
addToast("Informação importante", "info");

// Aviso
addToast("Atenção!", "warning");
```

## 🎨 Componentes Shadcn/ui

Os componentes base são do shadcn/ui, customizados com:

- TailwindCSS
- Radix UI primitives
- Class Variance Authority

### Uso

```javascript
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

<Button variant="outline" size="sm">
  Clique aqui
</Button>

<Card>
  <CardContent>
    Conteúdo do card
  </CardContent>
</Card>

<Input placeholder="Digite algo..." />
```

## 📱 Responsividade

A aplicação é totalmente responsiva usando breakpoints do Tailwind:

```javascript
// Mobile-first approach
<div className="p-4 md:p-6 lg:p-8">
  {/* Padding aumenta em telas maiores */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 coluna no mobile, 2 no tablet, 3 no desktop */}
</div>
```

## 🚀 Build & Deploy

### Build de Produção

```bash
npm run build
```

Gera pasta `dist/` com arquivos otimizados.

### Preview Local

```bash
npm run preview
```

Testa o build de produção localmente.

### Deploy

#### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm run build
# Arraste a pasta dist/ para Netlify
```

#### Servidor Próprio

```bash
npm run build
# Sirva a pasta dist/ com nginx ou similar
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie `.env` na raiz:

```env
VITE_API_URL=http://localhost:5000/api
```

### Vite Config

```javascript
// vite.config.js
export default {
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
};
```

## 🎯 Boas Práticas

### Componentes

- Um componente por arquivo
- Nomes em PascalCase
- Props com PropTypes ou TypeScript
- Componentes pequenos e focados

### Estilização

- Classes TailwindCSS primeiro
- CSS personalizado apenas quando necessário
- Mobile-first approach
- Uso de variáveis CSS para temas

### Estado

- Context API para estado global
- useState para estado local
- Custom hooks para lógica reutilizável

## 🐛 Debug

### React DevTools

Instale a extensão React DevTools para debug de componentes e contexto.

### Vite DevTools

Console do navegador mostra hot-reload updates.

### Network Tab

Use para debugar chamadas à API.

## 📚 Recursos Úteis

- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contribuindo

1. Siga os padrões de código existentes
2. Use ESLint para verificar código
3. Componentes devem ser reutilizáveis
4. Mantenha acessibilidade em mente

## 📞 Suporte

Para problemas ou dúvidas:

1. Verifique o console do navegador
2. Verifique chamadas de API na aba Network
3. Confirme que o backend está rodando
4. Verifique as variáveis de ambiente

---

**Desenvolvido com ❤️ usando React e TailwindCSS**
