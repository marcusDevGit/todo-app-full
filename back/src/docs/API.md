# API Documentation - To-Do App

## Visão Geral

API RESTful para gerenciamento de tarefas, listas e tags. Desenvolvida com Node.js, Express e Prisma.

**Base URL:** `http://localhost:5000/api`

**Documentação Interativa (Swagger):** `http://localhost:5001/api-docs`

## Autenticação

A API usa autenticação JWT (JSON Web Token). Para acessar endpoints protegidos, você precisa incluir o token no header da requisição:

```
Authorization: Bearer {seu-token-jwt}
```

### Endpoints Públicos

Apenas os endpoints de autenticação são públicos (não requerem token):

- `POST /auth/register`
- `POST /auth/login`

## Índice

1. [Autenticação](#autenticação-1)
2. [Usuários](#usuários)
3. [Tarefas](#tarefas)
4. [Listas](#listas)
5. [Tags](#tags)
6. [Arquivos](#arquivos)
7. [Modelos de Dados](#modelos-de-dados)
8. [Códigos de Erro](#códigos-de-erro)

---

## Autenticação

### Registrar Novo Usuário

```http
POST /auth/register
```

**Request Body:**

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "createdAt": "2026-01-25T22:00:00.000Z",
      "updatedAt": "2026-01-25T22:00:00.000Z"
    }
  }
}
```

### Fazer Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com"
    }
  }
}
```

---

## Usuários

### Obter Perfil

```http
GET /users/profile
```

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2026-01-25T22:00:00.000Z",
    "updatedAt": "2026-01-25T22:00:00.000Z"
  }
}
```

### Atualizar Perfil

```http
PUT /users/profile
```

**Request Body:**

```json
{
  "name": "João Silva Santos",
  "email": "joao.silva@example.com",
  "password": "novaSenha123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Perfil atualizado com sucesso",
  "data": {
    "id": 1,
    "name": "João Silva Santos",
    "email": "joao.silva@example.com"
  }
}
```

---

## Tarefas

### Listar Tarefas

```http
GET /tasks
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Completar relatório",
      "description": "Finalizar o relatório mensal de vendas",
      "status": "pending",
      "priority": 2,
      "important": false,
      "dueDate": "2026-02-01T10:00:00.000Z",
      "userId": 1,
      "listId": 1,
      "parentId": null,
      "createdAt": "2026-01-25T22:00:00.000Z",
      "updatedAt": "2026-01-25T22:00:00.000Z",
      "tags": [
        {
          "id": 1,
          "name": "Trabalho",
          "color": "#3b82f6"
        }
      ],
      "subtasks": []
    }
  ]
}
```

### Buscar Tarefas com Filtros

```http
GET /tasks/search?title=relatório&status=pending&priority=2
```

**Query Parameters:**

- `title` (string): Buscar por título
- `status` (string): `pending`, `in_progress`, `completed`
- `priority` (integer): 0-3 (0=Baixa, 1=Média, 2=Alta, 3=Urgente)
- `dueDateFrom` (date): Data inicial (YYYY-MM-DD)
- `dueDateTo` (date): Data final (YYYY-MM-DD)
- `tagIds` (string): Array JSON de IDs de tags (ex: "[1,2,3]")

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Completar relatório",
      "status": "pending",
      "priority": 2,
      "tags": [...]
    }
  ]
}
```

### Criar Tarefa

```http
POST /tasks
```

**Request Body:**

```json
{
  "title": "Completar relatório",
  "description": "Finalizar o relatório mensal de vendas",
  "status": "pending",
  "priority": 2,
  "important": false,
  "dueDate": "2026-02-01T10:00:00Z",
  "listId": 1,
  "tags": [1, 2]
}
```

**Campos:**

- `title` (obrigatório): Título da tarefa
- `description`: Descrição detalhada
- `status`: `pending` (padrão), `in_progress`, `completed`
- `priority`: 0-3 (padrão: 0)
- `important`: true/false (padrão: false)
- `dueDate`: Data de vencimento (ISO 8601)
- `listId`: ID da lista
- `tags`: Array de IDs de tags

**Response (201):**

```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "data": {
    "id": 1,
    "title": "Completar relatório",
    ...
  }
}
```

### Buscar Tarefa por ID

```http
GET /tasks/{id}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Completar relatório",
    "tags": [...],
    "subtasks": [...]
  }
}
```

### Atualizar Tarefa

```http
PUT /tasks/{id}
```

**Request Body:**

```json
{
  "title": "Novo título",
  "status": "in_progress",
  "priority": 3,
  "important": true
}
```

### Excluir Tarefa

```http
DELETE /tasks/{id}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Tarefa excluída com sucesso"
}
```

### Listar Subtarefas

```http
GET /tasks/{id}/subtasks
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "title": "Revisar seção 1",
      "parentId": 1,
      ...
    }
  ]
}
```

### Criar Subtarefa

```http
POST /tasks/{id}/subtasks
```

**Request Body:**

```json
{
  "title": "Revisar seção 1",
  "description": "Revisar e corrigir a primeira seção",
  "status": "pending"
}
```

---

## Listas

### Listar Listas

```http
GET /lists
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Projetos Pessoais",
      "userId": 1,
      "createdAt": "2026-01-25T22:00:00.000Z",
      "updatedAt": "2026-01-25T22:00:00.000Z"
    }
  ]
}
```

### Criar Lista

```http
POST /lists
```

**Request Body:**

```json
{
  "name": "Projetos Pessoais"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Lista criada com sucesso",
  "data": {
    "id": 1,
    "name": "Projetos Pessoais",
    "userId": 1
  }
}
```

### Buscar Lista por ID

```http
GET /lists/{id}
```

### Atualizar Lista

```http
PUT /lists/{id}
```

**Request Body:**

```json
{
  "name": "Novo Nome da Lista"
}
```

### Excluir Lista

```http
DELETE /lists/{id}
```

---

## Tags

### Listar Tags

```http
GET /tags
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Trabalho",
      "color": "#3b82f6",
      "createdAt": "2026-01-25T22:00:00.000Z",
      "updatedAt": "2026-01-25T22:00:00.000Z"
    }
  ]
}
```

### Criar Tag

```http
POST /tags
```

**Request Body:**

```json
{
  "name": "Trabalho",
  "color": "#3b82f6"
}
```

**Nota:** O campo `color` é opcional. Se não fornecido, uma cor será gerada automaticamente.

**Response (201):**

```json
{
  "success": true,
  "message": "Tag criada com sucesso",
  "data": {
    "id": 1,
    "name": "Trabalho",
    "color": "#3b82f6"
  }
}
```

### Excluir Tag

```http
DELETE /tags/{id}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Tag excluída com sucesso"
}
```

---

## Arquivos

### Upload de Arquivo

```http
POST /files/{taskId}
```

**Content-Type:** `multipart/form-data`

**Form Data:**

- `file`: Arquivo binário

**Exemplo com cURL:**

```bash
curl -X POST http://localhost:5000/api/files/1 \
  -H "Authorization: Bearer {token}" \
  -F "file=@/path/to/file.pdf"
```

**Response (201):**

```json
{
  "success": true,
  "message": "Arquivo enviado com sucesso",
  "data": {
    "id": 1,
    "filename": "file.pdf",
    "path": "/uploads/file-123456789.pdf",
    "taskId": 1
  }
}
```

### Listar Arquivos da Tarefa

```http
GET /files/{taskId}
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "filename": "file.pdf",
      "path": "/uploads/file-123456789.pdf",
      "taskId": 1
    }
  ]
}
```

### Excluir Arquivo

```http
DELETE /files/{id}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Arquivo excluído com sucesso"
}
```

---

## Modelos de Dados

### User

```typescript
{
  id: number;
  name: string;
  email: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Task

```typescript
{
  id: number
  title: string
  description: string | null
  status: "pending" | "in_progress" | "completed"
  priority: 0 | 1 | 2 | 3  // 0=Baixa, 1=Média, 2=Alta, 3=Urgente
  important: boolean
  dueDate: DateTime | null
  userId: number
  listId: number | null
  parentId: number | null
  createdAt: DateTime
  updatedAt: DateTime
  tags: Tag[]
  subtasks: Task[]
}
```

### Tag

```typescript
{
  id: number;
  name: string;
  color: string; // Hexadecimal (ex: "#3b82f6")
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### List

```typescript
{
  id: number;
  name: string;
  userId: number;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## Códigos de Erro

### 400 - Bad Request

Dados inválidos ou malformados.

**Exemplo:**

```json
{
  "error": "O campo 'title' é obrigatório"
}
```

### 401 - Unauthorized

Token ausente ou inválido.

**Exemplo:**

```json
{
  "error": "Token inválido ou expirado"
}
```

### 404 - Not Found

Recurso não encontrado.

**Exemplo:**

```json
{
  "error": "Tarefa não encontrada"
}
```

### 500 - Internal Server Error

Erro interno do servidor.

**Exemplo:**

```json
{
  "error": "Erro interno do servidor"
}
```

---

## Exemplos de Uso

### Exemplo Completo: Criar e Gerenciar Tarefa

#### 1. Fazer Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

#### 2. Criar Tag

```bash
curl -X POST http://localhost:5000/api/tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Urgente",
    "color": "#ef4444"
  }'
```

#### 3. Criar Lista

```bash
curl -X POST http://localhost:5000/api/lists \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Trabalho"
  }'
```

#### 4. Criar Tarefa

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "title": "Finalizar Projeto",
    "description": "Concluir projeto até sexta-feira",
    "status": "in_progress",
    "priority": 3,
    "important": true,
    "dueDate": "2026-01-30T17:00:00Z",
    "listId": 1,
    "tags": [1]
  }'
```

#### 5. Atualizar Status

```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "status": "completed"
  }'
```

---

## Notas Importantes

1. **Formato de Data**: Todas as datas devem usar o formato ISO 8601 (ex: `2026-01-30T17:00:00Z`)
2. **Autenticação**: Sempre inclua o token JWT no header `Authorization`
3. **IDs de Tags**: Ao criar/atualizar tarefas, passe um array de IDs de tags existentes
4. **Prioridades**: Use números de 0 a 3 para definir a prioridade
5. **Status**: Valores aceitos são: `pending`, `in_progress`, `completed`
6. **Subtarefas**: São tarefas normais com o campo `parentId` definido

---

## Ambiente de Desenvolvimento

- **Backend URL**: `http://localhost:5000/api`
- **Swagger UI**: `http://localhost:5001/api-docs`
- **Database**: PostgreSQL com Prisma ORM

## Suporte

Para dúvidas ou problemas, consulte:

- Documentação Swagger interativa: `http://localhost:5001/api-docs`
- Código fonte: `/back/src/modules/`
