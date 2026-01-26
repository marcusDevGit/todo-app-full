# Documentação To-Do App Backend

Bem-vindo à documentação do backend da aplicação To-Do App!

## 📚 Documentos Disponíveis

### [API.md](./API.md)

Documentação completa da API REST com todos os endpoints, exemplos de requisição e resposta, modelos de dados e códigos de erro.

**Conteúdo:**

- Autenticação (Register, Login)
- Usuários (Perfil)
- Tarefas (CRUD, Busca, Subtarefas)
- Listas (CRUD)
- Tags (CRUD)
- Arquivos (Upload, Listagem, Exclusão)
- Modelos de dados completos
- Exemplos de uso com cURL

### [GETTING_STARTED.md](./GETTING_STARTED.md)

Guia de início rápido para configurar e executar o projeto.

**Conteúdo:**

- Requisitos do sistema
- Instalação e configuração
- Configuração do banco de dados
- Primeiro teste da API
- Estrutura do projeto
- Scripts disponíveis
- Solução de problemas

## 🌐 Documentação Interativa

**Swagger UI**: Acesse `http://localhost:5001/api-docs` quando o servidor estiver rodando.

A documentação interativa permite:

- Testar endpoints diretamente pelo navegador
- Ver exemplos de request/response em tempo real
- Autenticar e salvar o token para testes
- Visualizar todos os schemas de dados

## 🚀 Início Rápido

### 1. Instalar e Configurar

```bash
cd back
npm install
cp .env.example .env  # Edite as variáveis de ambiente
npm run generate
npm run migrate
```

### 2. Iniciar Servidor

```bash
npm run dev
```

### 3. Acessar Documentação

```
http://localhost:5001/api-docs
```

## 📖 Leitura Recomendada

**Para Iniciantes:**

1. Leia [GETTING_STARTED.md](./GETTING_STARTED.md)
2. Teste os endpoints básicos de autenticação
3. Explore o Swagger UI

**Para Desenvolvedores:**

1. Estude [API.md](./API.md) para entender todos os endpoints
2. Revise os modelos de dados
3. Use a documentação do Swagger para testes interativos

**Para Integração:**

1. Consulte os exemplos completos em [API.md](./API.md#exemplos-de-uso)
2. Implemente autenticação JWT no frontend
3. Use os modelos TypeScript fornecidos

## 🔑 Autenticação

Todos os endpoints (exceto `/auth/register` e `/auth/login`) requerem autenticação JWT:

```http
Authorization: Bearer {seu-token-jwt}
```

## 📊 Tecnologias

- **Framework**: Express.js
- **Database**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT (jsonwebtoken)
- **Validação**: express-validator
- **Documentação**: Swagger/OpenAPI 3.0
- **Upload**: Multer
- **Segurança**: bcrypt, CORS

## 🗂️ Estrutura do Código

```
back/src/
├── config/          # Configurações (Swagger, DB, Multer, CORS)
├── core/            # Respostas e erros padronizados
├── middleware/      # Auth, validação, error handler
├── modules/         # Módulos da aplicação
│   ├── auth/
│   ├── tasks/
│   ├── lists/
│   ├── tags/
│   ├── users/
│   └── files/
├── routes/          # Roteamento principal
├── utils/           # JWT, password hashing
├── docs/            # Esta documentação
└── app.js           # Setup do Express
```

## 📝 Convenções

### Respostas da API

**Sucesso:**

```json
{
  "success": true,
  "message": "Mensagem de sucesso",
  "data": { ... }
}
```

**Erro:**

```json
{
  "error": "Mensagem de erro"
}
```

### Códigos HTTP

- `200` - OK (GET, PUT, DELETE bem-sucedidos)
- `201` - Created (POST bem-sucedido)
- `400` - Bad Request (dados inválidos)
- `401` - Unauthorized (não autenticado)
- `404` - Not Found (recurso não encontrado)
- `500` - Internal Server Error

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch
```

Testes estão localizados em `src/__tests__/`

## 🔒 Segurança

- Senhas hasheadas com bcrypt (salt rounds: 10)
- Tokens JWT com expiração de 24h
- CORS configurado
- Validação de entrada em todos os endpoints
- Headers de segurança HTTP

## 📞 Suporte

**Problemas Comuns:**

- Consulte a seção de [Solução de Problemas](./GETTING_STARTED.md#solução-de-problemas)
- Verifique os logs do servidor
- Use o Swagger UI para debugar requisições

## 📌 Atualizações

Esta documentação é mantida em sincronia com o código. Última atualização: Janeiro 2026

---

**Happy Coding! 🚀**
