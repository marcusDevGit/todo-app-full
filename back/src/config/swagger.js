import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do App API",
      version: "1.0.0",
      description: "API completa para gerenciamento de tarefas, listas e tags",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT de autenticação. Formato: Bearer {token}",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
            },
            data: {
              type: "object",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do usuário",
            },
            name: {
              type: "string",
              description: "Nome do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da tarefa",
            },
            title: {
              type: "string",
              description: "Título da tarefa",
            },
            description: {
              type: "string",
              description: "Descrição da tarefa",
              nullable: true,
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              description: "Status da tarefa",
            },
            priority: {
              type: "integer",
              minimum: 0,
              maximum: 3,
              description: "Prioridade: 0=Baixa, 1=Média, 2=Alta, 3=Urgente",
            },
            important: {
              type: "boolean",
              description: "Se a tarefa é importante",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              nullable: true,
              description: "Data de vencimento",
            },
            userId: {
              type: "integer",
              description: "ID do usuário responsável",
            },
            listId: {
              type: "integer",
              nullable: true,
              description: "ID da lista à qual a tarefa pertence",
            },
            parentId: {
              type: "integer",
              nullable: true,
              description: "ID da tarefa pai (para subtarefas)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            tags: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Tag",
              },
            },
            subtasks: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        Tag: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da tag",
            },
            name: {
              type: "string",
              description: "Nome da tag",
            },
            color: {
              type: "string",
              description: "Cor da tag em hexadecimal",
              example: "#3b82f6",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        List: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da lista",
            },
            name: {
              type: "string",
              description: "Nome da lista",
            },
            userId: {
              type: "integer",
              description: "ID do usuário dono da lista",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/*/*.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
